import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { after, afterEach, before, describe, it } from 'node:test';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, writeBatch } from 'firebase/firestore';

let env;

before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-pintatonica',
    firestore: {
      host: '127.0.0.1',
      port: 8080,
      rules: readFileSync(new URL('../../firebase/firestore.rules', import.meta.url), 'utf8'),
    },
  });
});

afterEach(() => env.clearFirestore());
after(() => env.cleanup());

const seedMembers = () =>
  env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, 'members/alice'), { name: 'Alice', email: 'a@x.test', active: true, role: 'member' });
    await setDoc(doc(db, 'members/bob'), { name: 'Bob', email: 'b@x.test', active: true, role: 'member' });
    await setDoc(doc(db, 'members/former'), { name: 'Former', email: 'f@x.test', active: false, role: 'member' });
    await setDoc(doc(db, 'rehearsals/r1'), { start: '2026-11-02T18:00' });
  });

describe('firestore rules', () => {
  it('public song selection is atomic and exposes no private material', async()=>{
    await seedMembers();
    const member=env.authenticatedContext('alice',{firebase:{sign_in_provider:'google.com'}}).firestore();
    const anonymous=env.unauthenticatedContext().firestore();
    const song={title:'Tema',artist:'Artista',public:false,publicMediaUrl:'',notes:'Privado',resources:[{url:'https://drive.google.com/private'}],revision:1};
    await assertSucceeds(setDoc(doc(member,'songs/s1'),song));
    await assertFails(setDoc(doc(member,'publicSongs/s1'),{title:'Tema',artist:'Artista',mediaUrl:''}));
    let batch=writeBatch(member);batch.set(doc(member,'songs/s1'),{...song,public:true});batch.set(doc(member,'publicSongs/s1'),{title:'Tema',artist:'Artista',mediaUrl:''});await assertSucceeds(batch.commit());
    const publicRows=await assertSucceeds(getDocs(collection(anonymous,'publicSongs')));assert.equal(publicRows.size,1);assert.deepEqual(publicRows.docs[0].data(),{title:'Tema',artist:'Artista',mediaUrl:''});
    await assertFails(getDoc(doc(anonymous,'songs/s1')));
    batch=writeBatch(member);batch.set(doc(member,'songs/s1'),{...song,public:true});batch.set(doc(member,'publicSongs/s1'),{title:'Tema',artist:'Artista',mediaUrl:'',notes:'Privado'});await assertFails(batch.commit());
    await assertFails(setDoc(doc(member,'songs/s1'),song));
    await assertFails(deleteDoc(doc(member,'publicSongs/s1')));
    batch=writeBatch(member);batch.set(doc(member,'songs/s1'),song);batch.delete(doc(member,'publicSongs/s1'));await assertSucceeds(batch.commit());
    assert.equal((await getDoc(doc(anonymous,'publicSongs/s1'))).exists(),false);
    assert.equal((await getDoc(doc(member,'songs/s1'))).data().notes,'Privado');
  });
  it('all active members edit shared songs; other identities cannot read or publish them',async()=>{
    await seedMembers();
    const alice=env.authenticatedContext('alice',{firebase:{sign_in_provider:'google.com'}}).firestore();
    const bob=env.authenticatedContext('bob',{firebase:{sign_in_provider:'google.com'}}).firestore();
    const song={title:'Tema',artist:'Artista',public:false,publicMediaUrl:'',revision:1};
    await assertSucceeds(setDoc(doc(alice,'songs/shared'),song));await assertSucceeds(setDoc(doc(bob,'songs/shared'),{...song,title:'Cambio compartido',revision:2}));
    for(const id of ['stranger','former']){
      const db=env.authenticatedContext(id,{firebase:{sign_in_provider:'google.com'}}).firestore();
      await assertFails(getDoc(doc(db,'songs/shared')));await assertFails(setDoc(doc(db,'songs/shared'),song));await assertFails(setDoc(doc(db,'publicSongs/shared'),{title:'Tema',artist:'Artista',mediaUrl:''}));
    }
  });
  it('denies a non-Google identity even when its member record is active', async () => {
    await seedMembers();
    const db = env.authenticatedContext('alice', { firebase: { sign_in_provider: 'password' } }).firestore();
    await assertFails(getDoc(doc(db, 'rehearsals/r1')));
    await assertFails(getDoc(doc(db, 'members/alice')));
    await assertFails(setDoc(doc(db, 'availability/alice'), { weekly: [] }));
  });
  it('denies unauthenticated access to private data', async () => {
    await seedMembers();
    const db = env.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(db, 'rehearsals/r1')));
    await assertFails(getDoc(doc(db, 'members/alice')));
    await assertFails(setDoc(doc(db, 'availability/alice'), { weekly: [] }));
  });

  it('denies an authenticated non-member', async () => {
    await seedMembers();
    const db = env.authenticatedContext('stranger', { firebase: { sign_in_provider: 'google.com' } }).firestore();
    await assertFails(getDoc(doc(db, 'rehearsals/r1')));
    await assertFails(getDoc(doc(db, 'members/alice')));
    await assertFails(setDoc(doc(db, 'availability/stranger'), { weekly: [] }));
    await assertFails(setDoc(doc(db, 'members/stranger'), { active: true }));
    await assertFails(setDoc(doc(db, 'rehearsals/not-allowed'), {date:'2026-11-02',expected:['stranger']}));
  });

  it('denies a deactivated member', async () => {
    await seedMembers();
    const db = env.authenticatedContext('former', { firebase: { sign_in_provider: 'google.com' } }).firestore();
    await assertFails(getDoc(doc(db, 'rehearsals/r1')));
    await assertFails(setDoc(doc(db, 'rehearsals/former-attempt'), {date:'2026-11-02',expected:['former']}));
  });

  it('lets a user read only their own member record to learn their status', async () => {
    await seedMembers();
    const db = env.authenticatedContext('stranger', { firebase: { sign_in_provider: 'google.com' } }).firestore();
    await assertSucceeds(getDoc(doc(db, 'members/stranger')));
  });

  it('lets an active member read private data and the roster', async () => {
    await seedMembers();
    const db = env.authenticatedContext('alice', { firebase: { sign_in_provider: 'google.com' } }).firestore();
    await assertSucceeds(getDoc(doc(db, 'rehearsals/r1')));
    await assertSucceeds(getDoc(doc(db, 'members/bob')));
  });

  it('lets a member write own availability and overrides, with multiple intervals', async () => {
    await seedMembers();
    const db = env.authenticatedContext('alice', { firebase: { sign_in_provider: 'google.com' } }).firestore();
    await assertSucceeds(
      setDoc(doc(db, 'availability/alice'), {
        weekly: [
          { day: 1, start: '18:00', end: '20:00' },
          { day: 1, start: '21:00', end: '22:00' },
        ],
      }),
    );
    await assertSucceeds(setDoc(doc(db, 'availability/alice/overrides/2026-11-02'), { intervals: [] }));
    await assertSucceeds(getDoc(doc(db, 'availability/bob')));
  });

  it("denies a member mutating another member's availability or identity", async () => {
    await seedMembers();
    const db = env.authenticatedContext('alice', { firebase: { sign_in_provider: 'google.com' } }).firestore();
    await assertFails(setDoc(doc(db, 'availability/bob'), { weekly: [] }));
    await assertFails(setDoc(doc(db, 'availability/bob/overrides/2026-11-02'), { intervals: [] }));
    await assertFails(setDoc(doc(db, 'members/bob'), { name: 'Hacked', active: true }));
    await assertFails(deleteDoc(doc(db, 'members/bob')));
  });

  it('lets a member manage rehearsals and setlists; denies unknown collections', async () => {
    await seedMembers();
    const db = env.authenticatedContext('alice', { firebase: { sign_in_provider: 'google.com' } }).firestore();
    await assertSucceeds(setDoc(doc(db, 'setlists/s1'), { songs: [] }));
    await assertSucceeds(setDoc(doc(db, 'rehearsals/r2'), { start: '2026-11-09T18:00' }));
    await assertFails(setDoc(doc(db, 'whatever/x'), { a: 1 }));
  });
});

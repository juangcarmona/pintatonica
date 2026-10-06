import assert from 'node:assert/strict';
import {test} from 'node:test';
import {memberHome} from '../../band/home.ts';

test('member home derives the next confirmed rehearsal and only its existing musical preparation',()=>{
  const next={id:'next',date:'2026-10-07',start:'18:00',end:'20:00',songIds:['s1'],focus:'Trabajar el puente'};
  const rows=[{id:'old',date:'2026-10-05',start:'18:00',end:'20:00'},next,{id:'later',date:'2026-10-10',start:'18:00',end:'20:00'}];
  const home=memberHome(rows,[{id:'s1',title:'Tema real'},{id:'s2',title:'Otro tema'}],[],[],new Date('2026-10-06T12:00:00Z'));
  assert.equal(home.rehearsal.id,'next');
  assert.deepEqual(home.songs.map(song=>song.id),['s1']);
  assert.equal(home.rehearsal.focus,'Trabajar el puente');
});
test('member home derives upcoming gig context and associated setlists without publication inference',()=>{
  const gigs=[{id:'past',date:'2026-10-01',time:''},{id:'next',date:'2026-10-08',time:'19:00',public:false}];
  const lists=[{id:'match',targetType:'gigs',targetId:'next'},{id:'other',targetType:'rehearsals',targetId:'next'}];
  const home=memberHome([],[],gigs,lists,new Date('2026-10-06T12:00:00Z'));
  assert.equal(home.rehearsal,null);assert.equal(home.gig.id,'next');
  assert.deepEqual(home.setlists.map(item=>item.id),['match']);
  assert.equal(home.gig.public,false);
});
test('member home keeps missing rehearsal, songs and gigs honestly empty',()=>{
  const home=memberHome([],[],[],[]);
  assert.deepEqual(home,{rehearsal:null,songs:[],gig:null,setlists:[]});
});

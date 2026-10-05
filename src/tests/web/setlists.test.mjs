import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateSetlist,validateGig,publicGig} from '../../band/setlists.ts';
test('musical running order preserves songs and repeats, duration/notes and a valid rehearsal or gig association',()=>{
  const draft={title:'Plan musical',songIds:['b','a','b'],minutes:'45',notes:'Puente en Am',targetType:'rehearsals',targetId:'r1'};
  assert.deepEqual(validateSetlist(draft,['a','b'],['rehearsals/r1']),draft);
  for(const bad of [{...draft,songIds:[]},{...draft,songIds:['unknown']},{...draft,minutes:'-1'},{...draft,targetId:'unknown'}])assert.throws(()=>validateSetlist(bad,['a','b'],['rehearsals/r1']));
});
test('basic gig dates are real Madrid civil dates and publication whitelists exclude preparation',()=>{
  const gig={title:'Actuación',date:'2026-11-02',time:'19:00',venue:'Lugar',info:'Entrada libre',notes:'Trabajo privado',public:true};
  assert.deepEqual(publicGig(validateGig(gig)),{title:'Actuación',date:'2026-11-02',time:'19:00',venue:'Lugar',info:'Entrada libre'});
  assert.equal(publicGig({...gig,public:false}),null);
  for(const bad of [{...gig,date:'2026-02-30'},{...gig,time:'25:00'},{...gig,title:' '}])assert.throws(()=>validateGig(bad));
});

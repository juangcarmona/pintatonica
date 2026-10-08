import assert from 'node:assert/strict';
import {test} from 'node:test';
import {bandAreas,bandDestination} from '../../band/areas.ts';
import {planningSummary} from '../../band/planning-summary.ts';
test('private onward destinations address distinct documents and a safe preparation fragment',()=>{
  assert.equal(new Set(bandAreas.map(area=>area.path)).size,5);
  assert.equal(bandDestination('ensayos','preparation-record with space'),'/band/ensayos/#preparation-record%20with%20space');
  assert.equal(bandDestination('inicio'),'/band/');
});
test('home planning never exposes calculated windows before all server readers are ready or after failure',()=>{
  const member={uid:'a',name:'A',weekly:[{day:1,start:'18:00',end:'21:00'}],overrides:{}};
  assert.deepEqual(planningSummary(['2099-11-02'],[member],false).full,[]);
  assert.deepEqual(planningSummary(['2099-11-02'],[member],true,true),{ready:false,failed:true,full:[],partial:[]});
});
test('home and rehearsal planning share date exceptions and full/partial qualification',()=>{
  const members=[{uid:'a',name:'A',weekly:[],overrides:{'2099-11-02':[{start:'17:00',end:'21:00'}]}},{uid:'b',name:'B',weekly:[],overrides:{'2099-11-02':[{start:'17:00',end:'21:00'}]}},{uid:'c',name:'C',weekly:[],overrides:{'2099-11-02':[{start:'19:00',end:'21:00'}]}}];
  const result=planningSummary(['2099-11-02'],members,true);
  assert.equal(result.ready,true);assert.equal(result.full.length,1);assert.equal(result.full[0].slot.start,'19:00');assert.equal(result.full[0].slot.duration,120);
  assert.equal(result.partial[0].slot.start,'17:00');assert.deepEqual(result.partial[0].slot.members,['a','b']);
});

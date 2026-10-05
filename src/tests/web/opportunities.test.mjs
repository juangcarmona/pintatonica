import assert from 'node:assert/strict';
import {test} from 'node:test';
import {findWindows} from '../../band/opportunities.ts';
const slots=(...pairs)=>pairs.map(([start,end])=>({start,end}));
const member=(uid,...pairs)=>({uid,intervals:slots(...pairs)});
test('full opportunities use all active members and a continuous fixed two hours',()=>{
  assert.deepEqual(findWindows([member('a',['18:00','20:00']),member('b',['17:00','21:00'])]).full,[{start:'18:00',end:'20:00',members:['a','b'],duration:120}]);
  assert.equal(findWindows([member('a',['18:00','19:59']),member('b',['18:00','22:00'])]).full.length,0);
  assert.equal(findWindows([member('a',['18:00','19:00'],['20:00','21:00']),member('b',['18:00','22:00'])]).full.length,0);
  assert.equal(findWindows([member('a',['18:00','22:00']),member('b',['18:00','22:00']),member('c')]).full.length,0);
});
test('partial windows remain secondary, include short overlaps, and rank participation then duration',()=>{
  const result=findWindows([member('a',['18:00','22:00']),member('b',['18:00','22:00']),member('c',['19:00','19:30']),member('d')]);
  assert.equal(result.full.length,0);
  assert.deepEqual(result.partial,[
    {start:'19:00',end:'19:30',members:['a','b','c'],duration:30},
    {start:'19:30',end:'22:00',members:['a','b'],duration:150},
    {start:'18:00',end:'19:00',members:['a','b'],duration:60},
  ]);
  assert.deepEqual(findWindows([member('a',['18:00','19:00']),member('b',['18:00','19:00'])]),{full:[],partial:[]});
  assert.deepEqual(findWindows([]),{full:[],partial:[]});
});
test('membership is dynamic; touching intervals stay continuous without duplicate participants',()=>{
  for(const count of [2,3,5]) {
    const roster=Array.from({length:count},(_,i)=>member(String(i),['18:00','19:00'],['19:00','20:00']));
    assert.equal(findWindows(roster).full[0].members.length,count);
    assert.equal(findWindows(roster).full[0].duration,120);
    assert.equal(findWindows(roster).partial.length,0);
  }
});

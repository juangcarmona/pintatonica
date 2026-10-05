import assert from 'node:assert/strict';
import {test} from 'node:test';
import {attendance,upcoming} from '../../band/rehearsals.ts';
test('expected attendance, not candidate classification, distinguishes full from partial rehearsals',()=>{
  assert.deepEqual(attendance(['a','b','c'],['a','b']),{expected:['a','b'],kind:'partial'});
  assert.equal(attendance(['a','b','c'],['c','b','a']).kind,'full');
  for(const expected of [[],['a','a'],['stranger']])assert.throws(()=>attendance(['a','b'],expected));
});
test('upcoming includes ongoing/future rehearsals and filters finished Madrid times across DST',()=>{
  const rows=[{id:'tomorrow',date:'2026-10-26',start:'18:00',end:'20:00'},{id:'finished',date:'2026-10-25',start:'01:00',end:'02:00'},{id:'ongoing',date:'2026-10-25',start:'02:00',end:'04:00'}];
  assert.deepEqual(upcoming(rows,new Date('2026-10-25T02:00:00Z')).map(row=>row.id),['ongoing','tomorrow']);
});

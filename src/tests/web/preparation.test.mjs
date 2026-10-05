import assert from 'node:assert/strict';
import {test} from 'node:test';
import {validatePreparation} from '../../band/preparation.ts';
test('preparation selects existing unique songs and preserves lightweight musical focus',()=>{
  assert.deepEqual(validatePreparation(['s1'],'Trabajar el puente',['s1','s2']),{songIds:['s1'],focus:'Trabajar el puente'});
  assert.deepEqual(validatePreparation([],'',[]),{songIds:[],focus:''});
  for(const ids of [['s1','s1'],['missing']])assert.throws(()=>validatePreparation(ids,'',['s1']));
});

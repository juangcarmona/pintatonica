import {test} from 'node:test';
import assert from 'node:assert/strict';
import {currentSection} from '../../public-site/current-section.ts';

test('current public section changes at the visible reading boundary',()=>{
  const sections=[{id:'inicio',top:-500},{id:'banda',top:100},{id:'musica',top:600}];
  assert.equal(currentSection(sections,98,false).id,'inicio');
  assert.equal(currentSection(sections,100,false).id,'banda');
  assert.equal(currentSection(sections,600,false).id,'musica');
});
test('top and short final public areas remain identifiable',()=>{
  const sections=[{id:'inicio',top:120},{id:'contacto',top:760}];
  assert.equal(currentSection(sections,80,false).id,'inicio');
  assert.equal(currentSection(sections,80,true).id,'contacto');
  assert.equal(currentSection([],80,false),undefined);
});

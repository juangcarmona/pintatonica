import assert from 'node:assert/strict';
import {test} from 'node:test';
import {assertShellPrivacy} from '../../tooling/web/assert-shell-privacy.mjs';

test('private identity leakage remains forbidden on public and unadmitted member shells',()=>{
  for(const area of ['public','band'])for(const text of ['Juan','members/private','signInWithPopup'])assert.throws(()=>assertShellPrivacy(`<p>${text}</p>`,{area}));
});
test('only an explicitly approved public member name is allowed in its matching editorial card',()=>{
  const html='<article data-public-member><h3>Juan</h3><p class="member-role">Guitarra</p></article>';
  assert.doesNotThrow(()=>assertShellPrivacy(html,{area:'public',approvedMembers:[{name:'Juan',role:'Guitarra'}]}));
  assert.throws(()=>assertShellPrivacy(html,{area:'public'}));
  assert.throws(()=>assertShellPrivacy(html,{area:'band',approvedMembers:[{name:'Juan',role:'Guitarra'}]}));
  assert.throws(()=>assertShellPrivacy(html+'<p>Juan</p>',{area:'public',approvedMembers:[{name:'Juan',role:'Guitarra'}]}));
});
test('an approved card cannot hide another private identity or private collection reference',()=>{
  const members=[{name:'Juan',role:'Guitarra'}];
  for(const leak of ['Pablo','members/private'])assert.throws(()=>assertShellPrivacy(`<article data-public-member><h3>Juan</h3><p class="member-role">Guitarra</p><p>${leak}</p></article>`,{area:'public',approvedMembers:members}));
});
test('approved editorial names and roles are matched safely as HTML text',()=>{
  assert.doesNotThrow(()=>assertShellPrivacy('<article data-public-member><h3>A &amp; B</h3><p class="member-role">Voz &amp; guitarra</p></article>',{area:'public',approvedMembers:[{name:'A & B',role:'Voz & guitarra'}]}));
  assert.doesNotThrow(()=>assertShellPrivacy('<article data-public-member><h3>O\'Connor</h3><p class="member-role">Guitarra</p></article>',{area:'public',approvedMembers:[{name:"O'Connor",role:'Guitarra'}]}));
  assert.throws(()=>assertShellPrivacy('<article data-public-member><h3>Juan</h3><p class="member-role">Bajo</p></article>',{area:'public',approvedMembers:[{name:'Juan',role:'Guitarra'}]}));
});
test('explicit approved descriptions and image labels may contain the public name but never private references',()=>{
  const member={name:'Juan',role:'Guitarra',description:'Juan toca la guitarra.',image:{label:'Juan en directo'}};
  const card='<article data-public-member><img alt="Juan en directo"><h3>Juan</h3><p class="member-role">Guitarra</p><p>Juan toca la guitarra.</p></article>';
  assert.doesNotThrow(()=>assertShellPrivacy(card,{area:'public',approvedMembers:[member]}));
  assert.throws(()=>assertShellPrivacy(card.replace('Juan toca la guitarra.','Pablo toca la guitarra.'),{area:'public',approvedMembers:[member]}));
  assert.throws(()=>assertShellPrivacy(card.replace('Juan toca la guitarra.','members/private'),{area:'public',approvedMembers:[{...member,description:'members/private'}]}));
});

import assert from 'node:assert/strict';
import {test} from 'node:test';
import {publicMusic,upcomingPublicGigs,contactLink} from '../../public-site/content.ts';
test('public music consumes only intended fields and rejects executable media or credential links',()=>{
  assert.deepEqual(publicMusic({title:'Tema',artist:'Artista',mediaUrl:'https://www.youtube.com/watch?v=demo',notes:'Privado'}),{title:'Tema',artist:'Artista',mediaUrl:'https://www.youtube.com/watch?v=demo'});
  assert.throws(()=>publicMusic({title:'Tema',artist:'Artista',mediaUrl:'javascript:alert(1)'}));
  assert.equal(contactLink(null),null);assert.equal(contactLink({label:'Contacto',url:'mailto:band@example.test'}),'mailto:band@example.test');
  assert.throws(()=>contactLink({label:'Malo',url:'javascript:alert(1)'}));
});
test('public upcoming gigs use Madrid civil time, retaining date-only today and sorting future events',()=>{
  const rows=[{title:'Mañana',date:'2026-10-26',time:''},{title:'Pasado',date:'2026-10-24',time:'19:00'},{title:'Hoy sin hora',date:'2026-10-25',time:''},{title:'Hoy terminado',date:'2026-10-25',time:'02:00'},{title:'Hoy próximo',date:'2026-10-25',time:'04:00'}];
  assert.deepEqual(upcomingPublicGigs(rows,new Date('2026-10-25T02:00:00Z')).map(row=>row.title),['Hoy sin hora','Hoy próximo','Mañana']);
});

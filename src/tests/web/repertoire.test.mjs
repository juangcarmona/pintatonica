import assert from 'node:assert/strict';
import {test} from 'node:test';
import {publicSong,validateSong,safeURL} from '../../band/repertoire.ts';
const song={title:'Tema de prueba',artist:'Artista',status:'En trabajo',key:'Am',tempo:'100',arrangement:'Privado',notes:'Ensayar puente',public:true,publicMediaUrl:'https://www.youtube.com/watch?v=example',resources:[{kind:'Partitura',label:'Trabajo privado',url:'https://docs.google.com/document/d/example'}]};
test('public song projection includes only deliberately selected safe fields, never internal material',()=>{
  assert.deepEqual(publicSong(song),{title:'Tema de prueba',artist:'Artista',mediaUrl:song.publicMediaUrl});
  assert.equal(publicSong({...song,public:false}),null);
});
test('resources retain provider links and reject executable schemes or embedded credentials',()=>{
  for(const url of ['https://docs.google.com/document/d/example','https://drive.google.com/file/d/example','https://www.youtube.com/watch?v=example'])assert.equal(safeURL(url),url);
  for(const url of ['javascript:alert(1)','data:text/html,test','file:///secret','https://user:password@example.test'])assert.throws(()=>safeURL(url));
  assert.throws(()=>validateSong({...song,title:' '}));
  assert.throws(()=>validateSong({...song,resources:[{kind:'Partitura',label:'Mala',url:'javascript:alert(1)'}]}));
  assert.throws(()=>validateSong({...song,tempo:'-10'}));
});

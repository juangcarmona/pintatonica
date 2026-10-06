import {collection,doc,onSnapshot,type Firestore} from 'firebase/firestore';
import {resourceKinds,safeURL,type Song,type SongResource} from './repertoire';
import {saveSong} from './repertoire-store';
import {button,element,field,input,setStatus,editorDisclosure} from './dom';
export function mountRepertoire(db:Firestore,host:HTMLElement) {
  let alive=true,loaded=false,dirty=false,saving=false,id='',revision=0;
  let songs:Song[]=[];
  const heading=element('h2','Repertorio'),status=element('p','Cargando repertorio…');status.role='status';status.setAttribute('aria-live','polite');
  const list=element('div',undefined,'repertoire-list'),details=element('div');
  const form=element('form',undefined,'panel song-editor');
  const controls={title:input('text'),artist:input('text'),status:input('text'),key:input('text'),tempo:input('number'),arrangement:element('textarea'),notes:element('textarea'),publicMediaUrl:input('url')};
  controls.title.required=true;controls.tempo.min='1';controls.tempo.step='any';
  const publicCheck=input('checkbox');const publicLabel=field('Seleccionar para el repertorio público',publicCheck);publicLabel.classList.add('check-field');
  const resources=element('div');
  const disclosure=editorDisclosure('Editar canción',form);
  const newSong=button('Nueva canción',()=>{select();disclosure.open=true;});
  const save=element('button','Guardar canción','button');save.type='submit';
  const reload=button('Recargar versión guardada',()=>select(songs.find(song=>song.id===id)));
  form.append(element('h3','Canción y material de trabajo'));
  for(const [key,label] of [['title','Título'],['artist','Artista original'],['status','Estado'],['key','Tonalidad'],['tempo','Tempo (BPM)'],['arrangement','Estructura / arreglo'],['notes','Notas de la banda']] as const)form.append(field(label,controls[key]));
  form.append(publicLabel,field('Enlace de media pública (selección explícita)',controls.publicMediaUrl),element('p','Este enlace se publica si seleccionas la canción. El resto de recursos y notas siguen siendo privados.'),element('h4','Recursos privados'),resources,button('Añadir recurso',()=>{addResource();markDirty();}),save,reload);
  host.append(heading,status,newSong,list,details,disclosure);setDisabled(true);
  function setDisabled(value:boolean){for(const control of host.querySelectorAll<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement|HTMLButtonElement>('input,textarea,select,button'))control.disabled=value;}
  function markDirty(){dirty=true;setStatus(status,'Cambios de canción sin guardar.','warning');}
  form.addEventListener('input',markDirty);
  function addResource(resource:SongResource={kind:'Partitura',label:'',url:''}) {
    const row=element('div',undefined,'resource-row');const kind=element('select');kind.dataset.resourceKind='';
    for(const value of resourceKinds){const option=element('option',value);option.value=value;kind.append(option);}kind.value=resource.kind;
    const label=input('text',resource.label),url=input('url',resource.url);url.required=true;label.dataset.resourceLabel='';url.dataset.resourceUrl='';
    row.append(field('Tipo de recurso',kind),field('Nombre del recurso',label),field('Enlace privado',url),button('Quitar recurso',()=>{row.remove();markDirty();},'button destructive compact'));resources.append(row);
  }
  function select(song?:Song) {
    if(saving)return;
    if(dirty&&!window.confirm('¿Descartar los cambios de canción sin guardar?'))return;
    id=song?.id??doc(collection(db,'songs')).id;revision=song?.revision??0;dirty=false;
    for(const key of Object.keys(controls) as (keyof typeof controls)[])controls[key].value=song?.[key]??'';
    publicCheck.checked=song?.public===true;resources.replaceChildren();for(const resource of song?.resources??[])addResource(resource);
    renderDetails(song);setStatus(status,song?'Canción cargada.':'Nueva canción. Guarda para compartirla.');
  }
  function renderDetails(song?:Song) {
    details.replaceChildren();if(!song)return;
    const card=element('article',undefined,'panel song-details');card.dataset.songDetails=song.id;
    card.append(element('h3',song.title),element('p',song.artist||'Artista sin especificar'),element('p',`${song.status||'Estado sin especificar'} · ${song.key||'Tonalidad sin especificar'} · ${song.tempo?`${song.tempo} BPM`:'Tempo sin especificar'}`),element('p',song.arrangement),element('p',song.notes),element('p',song.public?'Seleccionada para mostrar públicamente':'Canción privada'));
    for(const resource of song.resources??[]){try{const link=element('a',`${resource.kind}: ${resource.label}`);link.href=safeURL(resource.url);link.target='_blank';link.rel='noopener noreferrer';card.append(link,element('br'));}catch{card.append(element('p','Recurso con enlace no válido. Edítalo antes de abrirlo.'));}}
    details.append(card);
  }
  form.addEventListener('submit',event=>{event.preventDefault();if(saving||!loaded)return;void(async()=>{
    try {
      saving=true;setDisabled(true);setStatus(status,'Guardando canción…','neutral');
      const draft={...Object.fromEntries(Object.entries(controls).map(([key,control])=>[key,control.value])),public:publicCheck.checked,resources:Array.from(resources.children).map(row=>({kind:row.querySelector<HTMLSelectElement>('[data-resource-kind]')!.value,label:row.querySelector<HTMLInputElement>('[data-resource-label]')!.value,url:row.querySelector<HTMLInputElement>('[data-resource-url]')!.value}))} as Omit<Song,'id'|'revision'>;
      await saveSong(db,id,revision,draft);
      if(alive){revision++;dirty=false;renderDetails({...draft,id,revision});setStatus(status,'Canción guardada y compartida.','positive');}
    }catch(error){if(alive)setStatus(status,error instanceof Error&&error.message==='shared-conflict'?'Otra persona ha cambiado esta canción. Tu borrador sigue aquí; recarga la versión guardada antes de volver a editar.':'No se ha guardado la canción. Revisa los datos y los enlaces.','error');}
    finally {saving=false;if(alive)setDisabled(false);}
  })();});
  const stop=onSnapshot(collection(db,'songs'),{includeMetadataChanges:true},snapshot=>{
    if(!alive||snapshot.metadata.fromCache||snapshot.metadata.hasPendingWrites)return;
    songs=snapshot.docs.map(record=>({...record.data(),id:record.id} as Song)).sort((a,b)=>a.title.localeCompare(b.title));
    list.replaceChildren();if(!songs.length)list.append(element('p','Todavía no hay canciones. Añade el repertorio real de Pintatónica.'));
    for(const song of songs)list.append(button(`${song.title}${song.artist?` · ${song.artist}`:''}`,()=>select(song)));
    if(!loaded){loaded=true;setDisabled(false);select();}
    else if(id&&!dirty&&!saving){const current=songs.find(song=>song.id===id);if(current&&current.revision!==revision)select(current);}
  },()=>{if(alive){loaded=false;setStatus(status,'No se ha podido cargar el repertorio. Vuelve a entrar para reintentar.','error');setDisabled(true);}});
  return ()=>{alive=false;stop();host.replaceChildren();};
}

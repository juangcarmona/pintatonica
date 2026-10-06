import {setUnsaved} from "./unsaved";
import {collection,doc,onSnapshot,type Firestore} from 'firebase/firestore';
import {button,element,setStatus,editorDisclosure} from './dom';
type RecordBase={id:string;title:string;revision:number};
export function sharedEditor<T extends RecordBase>(db:Firestore,host:HTMLElement,path:string,label:string,options:{form:HTMLFormElement;fill:(item?:T)=>void;read:()=>Omit<T,'id'|'revision'>;details:(item:T)=>HTMLElement;save:(id:string,revision:number,draft:Omit<T,'id'|'revision'>)=>Promise<void>;ready:()=>boolean}) {
  let alive=true,loaded=false,dirty=false,saving=false,id='',revision=0,items:T[]=[];
  const status=element('p','Cargando datos compartidos…'),list=element('div'),details=element('div');status.role='status';status.setAttribute('aria-live','polite');
  const save=element('button',`Guardar ${label}`,'button compact');save.type='submit';
  options.form.append(save,button(`Recargar ${label} guardado`,()=>select(items.find(item=>item.id===id))));
  const disclosure=editorDisclosure(`Editar ${label}`,options.form);
  host.append(element('h2',path==='setlists'?'Setlists':'Conciertos'),status,button(`Nuevo ${label}`,()=>{select();disclosure.open=true;}),list,details,disclosure);
  function disabled(){for(const control of host.querySelectorAll<HTMLInputElement|HTMLButtonElement|HTMLSelectElement|HTMLTextAreaElement>('input,button,select,textarea'))control.disabled=saving||!loaded||!options.ready()||control.dataset.unavailable==='true';}
  function select(item?:T){if(saving)return;if(dirty&&!window.confirm('¿Descartar los cambios sin guardar?'))return;id=item?.id??doc(collection(db,path)).id;revision=item?.revision??0;dirty=false;setUnsaved(options.form,false);options.fill(item);details.replaceChildren();if(item)details.append(options.details(item));setStatus(status,item?'Versión compartida cargada.':'Nuevo borrador. Guarda para compartirlo.');}
  function markDirty(){dirty=true;setUnsaved(options.form,true);setStatus(status,'Cambios sin guardar.','warning');}
  options.form.addEventListener('input',markDirty);
  options.form.addEventListener('submit',event=>{event.preventDefault();if(saving||!loaded||!options.ready())return;void(async()=>{
    try{const draft=options.read();saving=true;setUnsaved(options.form,true);disabled();setStatus(status,'Guardando…');await options.save(id,revision,draft);if(alive){revision++;dirty=false;setUnsaved(options.form,false);details.replaceChildren(options.details({...draft,id,revision} as T));setStatus(status,`${label==='setlist'?'Setlist':'Concierto'} guardado y compartido.`,'positive');}}
    catch(error){if(alive)setStatus(status,error instanceof Error&&error.message==='shared-conflict'?'Otra persona ha cambiado este registro. Tu borrador sigue aquí; recarga antes de editar.':'No se ha guardado. Tu borrador sigue aquí; revisa los datos.','error');}
    finally{saving=false;if(alive)disabled();}
  })();});
  const stop=onSnapshot(collection(db,path),{includeMetadataChanges:true},snapshot=>{
    if(!alive||snapshot.metadata.fromCache||snapshot.metadata.hasPendingWrites)return;
    items=snapshot.docs.map(record=>({...record.data(),id:record.id} as T)).sort((a,b)=>a.title.localeCompare(b.title));
    list.replaceChildren();if(!items.length)list.append(element('p','Todavía no hay registros compartidos.'));
    for(const item of items)list.append(button(item.title,()=>select(item)));
    if(!loaded){loaded=true;select();}else if(!dirty&&!saving){const current=items.find(item=>item.id===id);if(current&&current.revision!==revision)select(current);}disabled();
  },()=>{if(alive){loaded=false;setStatus(status,'No se han podido cargar los datos. Vuelve a entrar para reintentar.','error');disabled();}});
  disabled();return {markDirty,refresh:disabled,dispose:()=>{alive=false;stop();host.replaceChildren();}};
}

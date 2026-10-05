import {doc,runTransaction,type Firestore} from 'firebase/firestore';
import {button,element,field,input} from './dom';
import {validatePreparation} from './preparation';
import {safeURL,type Song} from './repertoire';
import type {Rehearsal} from './rehearsals';
export function preparationEditor(db:Firestore,id:string) {
  const form=element('form',undefined,'preparation-editor');
  const choices=element('fieldset'),focus=element('textarea'),status=element('p'),links=element('div');
  status.role='status';status.setAttribute('aria-live','polite');
  const save=element('button','Guardar preparación','button compact');save.type='submit';
  let alive=true,dirty=false,saving=false,revision=-1,current:Rehearsal,songs:Song[]|null=null;
  const reload=button('Recargar preparación guardada',()=>{if(dirty&&!window.confirm('¿Descartar la preparación sin guardar?'))return;dirty=false;revision=-1;refresh();});
  form.append(element('h4','Preparación musical'),choices,field('Foco / notas del ensayo',focus),save,reload,status,links);
  function disabled(value:boolean){for(const node of form.querySelectorAll<HTMLInputElement|HTMLTextAreaElement|HTMLButtonElement>('input,textarea,button'))node.disabled=value;}
  function resources(ids:string[]){links.replaceChildren();for(const id of ids){const song=songs?.find(item=>item.id===id);if(!song)continue;links.append(element('h4',song.title),element('p',song.arrangement),element('p',song.notes));for(const resource of song.resources??[]){try{const a=element('a',`${resource.kind}: ${resource.label}`);a.href=safeURL(resource.url);a.target='_blank';a.rel='noopener noreferrer';links.append(a,element('br'));}catch{links.append(element('p','Enlace no válido; revísalo en el repertorio.'));}}}}
  function refresh(){
    disabled(songs===null||saving);if(!current||songs===null)return;
    resources(current.songIds??[]);
    if(dirty||saving)return;
    const version=current.preparationRevision??0;
    const selected=revision===version?Array.from(choices.querySelectorAll<HTMLInputElement>('input:checked')).map(node=>node.value):current.songIds??[];
    choices.replaceChildren(element('legend','Canciones para este ensayo'));
    if(!songs.length)choices.append(element('p','Añade primero canciones al repertorio.'));
    for(const song of songs){const check=input('checkbox');check.value=song.id;check.checked=selected.includes(song.id);const label=field(song.title,check);label.classList.add('check-field');choices.append(label);}
    if(revision!==version){focus.value=current.focus??'';revision=version;status.textContent='Preparación guardada cargada.';}
  }
  form.addEventListener('input',()=>{dirty=true;status.textContent='Preparación sin guardar.';});
  form.addEventListener('submit',event=>{event.preventDefault();if(saving||songs===null)return;void(async()=>{
    try {
      const draft=validatePreparation(Array.from(choices.querySelectorAll<HTMLInputElement>('input:checked')).map(node=>node.value),focus.value,songs.map(song=>song.id));
      saving=true;disabled(true);status.textContent='Guardando preparación…';
      await runTransaction(db,async tx=>{const ref=doc(db,'rehearsals',id),stored=await tx.get(ref);if(!stored.exists())throw Error('missing-rehearsal');if((stored.data().preparationRevision??0)!==revision)throw Error('shared-conflict');
        for(const songId of draft.songIds)if(!(await tx.get(doc(db,'songs',songId))).exists())throw Error('missing-song');
        tx.update(ref,{...draft,preparationRevision:revision+1});});
      if(alive){revision++;dirty=false;status.textContent='Preparación guardada y compartida.';resources(draft.songIds);}
    }catch(error){if(alive)status.textContent=error instanceof Error&&error.message==='shared-conflict'?'Otra persona ha cambiado la preparación. Tu borrador sigue aquí; recarga antes de editar.':'No se ha guardado la preparación. Tu borrador sigue aquí.';}
    finally{saving=false;if(alive)disabled(songs===null);}
  })();});
  disabled(true);
  return {form,update:(item:Rehearsal,items:Song[]|null)=>{current=item;songs=items;refresh();},dispose:()=>{alive=false;form.remove();}};
}

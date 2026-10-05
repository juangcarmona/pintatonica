import {doc,runTransaction,type Firestore} from 'firebase/firestore';
import {element,field,input} from './dom';
import {sharedEditor} from './shared-editor';
import {publicGig,validateGig,type Gig} from './setlists';
export function mountGigs(db:Firestore,host:HTMLElement) {
  const form=element('form',undefined,'panel gig-editor'),controls={title:input('text'),date:input('date'),time:input('time'),venue:input('text'),info:element('textarea'),notes:element('textarea')},publish=input('checkbox');
  controls.title.required=true;controls.date.required=true;
  for(const [key,label] of [['title','Nombre del concierto'],['date','Fecha del concierto'],['time','Hora (Madrid, opcional)'],['venue','Lugar'],['info','Información pública'],['notes','Notas privadas de preparación']] as const)form.append(field(label,controls[key]));
  const publicLabel=field('Mostrar este concierto públicamente',publish);publicLabel.classList.add('check-field');form.append(publicLabel,element('p','Solo nombre, fecha, hora, lugar e información pública. Las notas y setlists permanecen privados.'));
  return sharedEditor<Gig>(db,host,'gigs','concierto',{form,ready:()=>true,fill:item=>{for(const key of Object.keys(controls) as (keyof typeof controls)[])controls[key].value=item?.[key]??'';publish.checked=item?.public===true;},read:()=>validateGig({...Object.fromEntries(Object.entries(controls).map(([key,node])=>[key,node.value])),public:publish.checked} as Omit<Gig,'id'|'revision'>),details:item=>{const card=element('article',undefined,'panel');card.dataset.gigDetails=item.id;card.append(element('h3',item.title),element('p',`${item.date}${item.time?' · '+item.time:''} · Madrid`),element('p',item.venue),element('p',item.info),element('p',item.notes),element('p',item.public?'Seleccionado para mostrar públicamente':'Concierto privado'));return card;},save:async(id,revision,draft)=>{
    await runTransaction(db,async tx=>{const ref=doc(db,'gigs',id),record=await tx.get(ref);if((record.data()?.revision??0)!==revision)throw Error('shared-conflict');tx.set(ref,{...draft,revision:revision+1});const projected=publicGig(draft),publicRef=doc(db,'publicGigs',id);if(projected)tx.set(publicRef,projected);else tx.delete(publicRef);});
  }}).dispose;
}

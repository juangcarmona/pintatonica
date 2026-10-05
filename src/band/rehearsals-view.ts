import {collection,doc,onSnapshot,setDoc,type Firestore} from 'firebase/firestore';
import {attendance,upcoming,type Rehearsal} from './rehearsals';
import {dateLabel} from './availability';
import type {Window} from './opportunities';
import type {MemberAvailability} from './availability-view';
import {element,field,input} from './dom';
export function confirmationForm(db:Firestore,uid:string,date:string,slot:Window,members:MemberAvailability[]) {
  const form=element('form',undefined,'confirmation-form');
  const id=doc(collection(db,'rehearsals')).id;
  const names=Object.fromEntries(members.map(member=>[member.uid,member.name]));
  const required=members.map(member=>member.uid);
  const attendanceGroup=element('fieldset');attendanceGroup.append(element('legend','Miembros esperados en este ensayo'));
  for(const member of members){const check=input('checkbox');check.value=member.uid;check.checked=slot.members.includes(member.uid);check.dataset.expected='';const label=field(`${member.name}${slot.members.includes(member.uid)?' · disponible':' · sin disponibilidad en esta ventana'}`,check);label.classList.add('check-field');attendanceGroup.append(label);}
  const agreed=input('checkbox');agreed.required=true;const agreement=field('La banda ha acordado este horario y esta asistencia.',agreed);agreement.classList.add('check-field');
  const submit=element('button','Confirmar ensayo','button compact');submit.type='submit';
  const status=element('p');status.role='status';status.setAttribute('aria-live','polite');
  form.append(attendanceGroup,agreement,submit,status);
  form.addEventListener('submit',(event)=>{event.preventDefault();void(async()=>{
    try {
      if(!upcoming([{date,start:slot.start,end:slot.end}]).length)throw Error('La ventana ha terminado.');
      const expected=Array.from(form.querySelectorAll<HTMLInputElement>('[data-expected]:checked')).map(check=>check.value);
      const decision=attendance(required,expected);
      if(!agreed.checked)throw Error('Confirma el acuerdo.');
      for(const node of form.querySelectorAll<HTMLInputElement|HTMLButtonElement>('input,button'))node.disabled=true;
      status.textContent='Guardando confirmación…';
      await setDoc(doc(db,'rehearsals',id),{date,start:slot.start,end:slot.end,required,available:slot.members,expected:decision.expected,kind:decision.kind,names,confirmedBy:uid});
      status.textContent='Ensayo confirmado. Ya está en la lista compartida.';
    } catch {status.textContent='No se ha confirmado el ensayo. Revisa la asistencia y vuelve a intentarlo.';for(const node of form.querySelectorAll<HTMLInputElement|HTMLButtonElement>('input,button'))node.disabled=false;}
  })();});
  return form;
}
export function mountRehearsals(db:Firestore,host:HTMLElement) {
  let alive=true,loaded=false,stored:Rehearsal[]=[],visibleIds='';host.append(element('h2','Próximos ensayos'),element('p','Cargando ensayos confirmados…'));
  function render(force=false) {
    if(!alive||!loaded)return;
    const rehearsals=upcoming(stored),ids=rehearsals.map(item=>item.id).join(',');
    if(!force&&ids===visibleIds)return;visibleIds=ids;
    host.replaceChildren(element('h2','Próximos ensayos'));
    if(!rehearsals.length)host.append(element('p','Todavía no hay ensayos confirmados próximos.'));
    for(const item of rehearsals) {
      const card=element('article',undefined,'panel');card.dataset.rehearsal=item.id;
      card.append(element('h3',`${dateLabel(item.date)} · ${item.start}–${item.end} · Madrid`),element('p',item.kind==='full'?'Ensayo confirmado · grupo completo':'Ensayo confirmado · asistencia parcial'),element('p',`Esperados: ${item.expected.map(id=>item.names[id]??'Miembro').join(', ')}`),element('p',`Disponibles al confirmar: ${item.available.map(id=>item.names[id]??'Miembro').join(', ')}`));
      host.append(card);
    }
  }
  const stop=onSnapshot(collection(db,'rehearsals'),{includeMetadataChanges:true},snapshot=>{
    if(!alive||snapshot.metadata.fromCache||snapshot.metadata.hasPendingWrites)return;
    stored=snapshot.docs.map(record=>({...record.data(),id:record.id} as Rehearsal));loaded=true;render(true);
  },()=>{loaded=false;if(alive)host.replaceChildren(element('h2','Próximos ensayos'),element('p','No se han podido cargar los ensayos. Vuelve a entrar para reintentar.'));});
  const timer=window.setInterval(()=>render(),60_000);
  return ()=>{alive=false;clearInterval(timer);stop();host.replaceChildren();};
}

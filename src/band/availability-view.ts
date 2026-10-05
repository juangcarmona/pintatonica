import { collection, deleteDoc, doc, onSnapshot, setDoc, type Firestore } from 'firebase/firestore';
import { dateLabel, effectiveAvailability, madridDate, normalizeIntervals, planningDates, validDate, weekdays, type Interval, type Overrides, type WeeklyInterval } from './availability';
import { button, element, field, input } from './dom';
import {renderOpportunities} from './opportunities-view';
import {confirmationForm} from './rehearsals-view';
import {upcoming} from './rehearsals';

export type MemberAvailability = {uid:string; name:string; weekly:WeeklyInterval[]; overrides:Overrides};
export function mountAvailability(db: Firestore, uid: string, host: HTMLElement) {
  let alive=true, loaded=false, weeklyLoaded=false, overridesLoaded=false, ownWeekly:WeeklyInterval[]=[], ownOverrides:Overrides={};
  let weeklyDirty=false, overrideDirty=false;
  const members=new Map<string,MemberAvailability>();
  const weeklyReady=new Set<string>(), overridesReady=new Set<string>();
  const subscriptions = new Map<string,(()=>void)[]>();
  const dates=planningDates();
  const status=element('p','Cargando disponibilidad…'); status.role='status'; status.setAttribute('aria-live','polite');
  const editor=element('div',undefined,'availability-editors');
  const weeklyForm=element('form',undefined,'panel');
  const weeklyRows=element('div');
  const overrideForm=element('form',undefined,'panel');
  const overrideRows=element('div');
  const selectedDate=input('date',madridDate()); selectedDate.min=dates[0]; selectedDate.max=dates.at(-1)!;
  const overview=element('div',undefined,'planning-weeks');
  const opportunities=element('div',undefined,'opportunities');
  let rosterReady=false, readFailed=false;
  const title=element('h2','Disponibilidad');
  host.append(title,element('p','Tu horario habitual y las excepciones por fecha. Todas las horas son de Madrid.'),status,editor,opportunities,element('h3','Próximas seis semanas'),overview);
  function rows(container:HTMLElement, slots:(Interval & {day?:number})[], weekly=false) {
    container.replaceChildren(); for(const slot of slots) addRow(container,slot,weekly);
  }
  function addRow(container:HTMLElement, slot:Interval & {day?:number}={start:'18:00',end:'22:00',day:1}, weekly=false) {
    const row=element('div',undefined,'interval-row');
    if(weekly) {
      const day=element('select'); day.dataset.day='';
      for(const index of [1,2,3,4,5,6,0]) {const option=element('option',weekdays[index]); option.value=String(index); day.append(option);}
      day.value=String(slot.day??1); row.append(field('Día',day));
    }
    const start=input('time',slot.start), end=input('time',slot.end); start.required=end.required=true;
    start.dataset.start=''; end.dataset.end='';
    row.append(field('Desde',start),field('Hasta',end),button('Quitar intervalo',()=>{row.remove();markDirty(weekly);})); container.append(row);
  }
  function readRows(container:HTMLElement, weekly=false): (Interval & {day?:number})[] {
    return Array.from(container.children).map((row)=>({
      start:row.querySelector<HTMLInputElement>('[data-start]')!.value,
      end:row.querySelector<HTMLInputElement>('[data-end]')!.value,
      ...(weekly ? {day:Number(row.querySelector<HTMLSelectElement>('[data-day]')!.value)} : {}),
    }));
  }
  function markDirty(weekly:boolean) {if(weekly)weeklyDirty=true;else overrideDirty=true;status.textContent='Cambios sin guardar.';}
  function loadOverride() { if(!overrideDirty)rows(overrideRows, effectiveAvailability(ownWeekly,ownOverrides,selectedDate.value)); }
  weeklyForm.addEventListener('input',()=>markDirty(true));
  overrideForm.addEventListener('input',(event)=>{if(event.target!==selectedDate)markDirty(false);});
  weeklyForm.append(element('h3','Horario semanal'),element('p','Sin intervalos en un día significa que no tienes disponibilidad.'),weeklyRows,button('Añadir intervalo semanal',()=>{addRow(weeklyRows,undefined,true);markDirty(true);}));
  const weeklySave=element('button','Guardar horario semanal','button'); weeklySave.type='submit'; weeklyForm.append(weeklySave);
  overrideForm.append(element('h3','Excepción para una fecha'),field('Fecha',selectedDate),element('p','Estos intervalos sustituyen el horario habitual de ese día. Sin intervalos significa no disponible.'),overrideRows,button('Añadir intervalo para esta fecha',()=>{addRow(overrideRows);markDirty(false);}),button('Marcar no disponible',()=>{overrideRows.replaceChildren();markDirty(false);}));
  const overrideSave=element('button','Guardar excepción','button'); overrideSave.type='submit';
  const restore=button('Restaurar horario habitual',()=>{const date=selectedDate.value;void save(overrideForm,()=>deleteDoc(doc(db,'availability',uid,'overrides',date)),()=>{delete ownOverrides[date];loadOverride();});});
  let previousDate=selectedDate.value;
  overrideForm.append(overrideSave,restore); selectedDate.addEventListener('change',()=>{
    if(!validDate(selectedDate.value))return;
    if(overrideDirty && !window.confirm('¿Descartar los cambios sin guardar de esta fecha?')){selectedDate.value=previousDate;return;}
    previousDate=selectedDate.value;overrideDirty=false;loadOverride();status.textContent=weeklyDirty?'Cambios sin guardar.':'Excepción cargada. Guarda para aplicar cambios.';
  });
  editor.append(weeklyForm,overrideForm);
  function setDisabled(form:HTMLFormElement, disabled:boolean) {for(const control of form.querySelectorAll<HTMLInputElement|HTMLButtonElement|HTMLSelectElement>('input,button,select'))control.disabled=disabled;}
  setDisabled(weeklyForm,true); setDisabled(overrideForm,true);
  async function save(form:HTMLFormElement, write:()=>Promise<void>, committed:()=>void=()=>{}) {
    if(!alive || !loaded)return;
    try {
      if(!validDate(selectedDate.value))throw new Error('Fecha no válida.');
      setDisabled(form,true); status.textContent='Guardando…'; await write();
      if(alive){if(form===weeklyForm)weeklyDirty=false;else overrideDirty=false;committed();status.textContent=weeklyDirty||overrideDirty?'Guardado. Todavía hay cambios sin guardar.':'Disponibilidad guardada.';}
    } catch {if(alive)status.textContent='No se ha guardado. Revisa las horas y vuelve a intentarlo.';}
    finally {if(alive)setDisabled(form,false);}
  }
  weeklyForm.addEventListener('submit',(event)=>{event.preventDefault();let weekly:WeeklyInterval[]=[]; void save(weeklyForm,()=>{
    const raw=readRows(weeklyRows,true);
    weekly=[0,1,2,3,4,5,6].flatMap(day=>normalizeIntervals(raw.filter(slot=>slot.day===day)).map(slot=>({...slot,day})));
    return setDoc(doc(db,'availability',uid),{weekly});
  },()=>{ownWeekly=weekly;rows(weeklyRows,weekly,true);loadOverride();});});
  overrideForm.addEventListener('submit',(event)=>{event.preventDefault();const date=selectedDate.value;let intervals:Interval[]=[];void save(overrideForm,()=>{intervals=normalizeIntervals(readRows(overrideRows));return setDoc(doc(db,'availability',uid,'overrides',date),{intervals});},()=>{ownOverrides[date]=intervals;loadOverride();});});
  const displaySlots=(slots:Interval[])=>slots.length ? slots.map(slot=>`${slot.start}–${slot.end}`).join(', ') : 'No disponible';
  function renderOverview() {
    if(!alive)return; overview.replaceChildren();
    const qualified=renderOpportunities(opportunities,dates,[...members.values()],rosterReady&&!readFailed&&[...members.keys()].every(id=>weeklyReady.has(id)&&overridesReady.has(id)),(date,slot)=>upcoming([{date,start:slot.start,end:slot.end}]).length?confirmationForm(db,uid,date,slot,[...members.values()]):element('p','Esta ventana ya ha terminado.'));
    for(let week=0;week<6;week++) {
      const section=element('details',undefined,'panel week'); if(week===0)section.open=true;
      const hasFull=dates.slice(week*7,week*7+7).some(date=>qualified.has(date));
      section.classList.toggle('has-full-opportunity',hasFull);
      section.append(element('summary',`${dateLabel(dates[week*7])} — ${dateLabel(dates[week*7+6])}${hasFull?' · Grupo completo':''}`));
      for(const date of dates.slice(week*7,week*7+7)) {
        const day=element('section',undefined,'planning-day'); day.append(element('h4',dateLabel(date)));
        for(const member of members.values()) day.append(element('p',`${member.name}: ${weeklyReady.has(member.uid)&&overridesReady.has(member.uid)?displaySlots(effectiveAvailability(member.weekly,member.overrides,date)):'Cargando…'}${Object.hasOwn(member.overrides,date)?' · excepción':''}`));
        section.append(day);
      }
      overview.append(section);
    }
  }
  function fail() {if(alive){readFailed=true;status.textContent='No se ha podido cargar la disponibilidad. Vuelve a entrar para reintentar.';renderOverview();}}
  function enableEditing() {
    const wasLoaded=loaded;
    loaded=weeklyLoaded && overridesLoaded;
    if(loaded && !wasLoaded){setDisabled(weeklyForm,false);setDisabled(overrideForm,false);status.textContent='Disponibilidad cargada. Los cambios se guardan con cada botón.';}
  }
  const roster=onSnapshot(collection(db,'members'),{includeMetadataChanges:true},snapshot=>{
    if(!alive || snapshot.metadata.fromCache)return;
    rosterReady=true;
    const active=new Set(snapshot.docs.filter(record=>record.data().active===true).map(record=>record.id));
    for(const [id,stops] of subscriptions)if(!active.has(id)){stops.forEach(stop=>stop());subscriptions.delete(id);members.delete(id);weeklyReady.delete(id);overridesReady.delete(id);}
    for(const record of snapshot.docs) {
      if(!active.has(record.id))continue;
      const member=members.get(record.id) ?? {uid:record.id,name:record.data().name||'Miembro',weekly:[],overrides:{}};
      member.name=typeof record.data().name==='string'?record.data().name:'Miembro'; members.set(record.id,member);
      if(subscriptions.has(record.id))continue;
      const weekly=onSnapshot(doc(db,'availability',record.id),{includeMetadataChanges:true}, data=> {
        if(!alive || data.metadata.fromCache || data.metadata.hasPendingWrites)return;
        member.weekly=Array.isArray(data.data()?.weekly)?data.data()!.weekly:[];
        weeklyReady.add(record.id);
        if(record.id===uid){ownWeekly=member.weekly;weeklyLoaded=true;if(!weeklyDirty)rows(weeklyRows,ownWeekly,true);loadOverride();enableEditing();}
        renderOverview();
      },fail);
      const overrides=onSnapshot(collection(db,'availability',record.id,'overrides'),{includeMetadataChanges:true}, data=>{
        if(!alive || data.metadata.fromCache || data.metadata.hasPendingWrites)return;
        member.overrides=Object.fromEntries(data.docs.filter(item=>validDate(item.id)).map(item=>[item.id,item.data().intervals??[]]));
        overridesReady.add(record.id);
        if(record.id===uid){ownOverrides=member.overrides;overridesLoaded=true;loadOverride();enableEditing();}
        renderOverview();
      },fail);
      subscriptions.set(record.id,[weekly,overrides]);
    }
    renderOverview();
  },fail);
  return ()=>{alive=false;roster();for(const stops of subscriptions.values())stops.forEach(stop=>stop());host.replaceChildren();};
}

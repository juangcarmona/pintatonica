import {dateLabel, effectiveAvailability} from './availability';
import {findWindows, type Window} from './opportunities';
import {element} from './dom';
import type {MemberAvailability} from './availability-view';
export type SchedulingSummary={ready:boolean;failed?:boolean;full:{date:string;slot:Window}[];partial:{date:string;slot:Window}[]};
export function renderOpportunities(host:HTMLElement,dates:string[],members:MemberAvailability[],ready:boolean,confirm?:(date:string,slot:Window)=>HTMLElement,summarize?:(summary:SchedulingSummary)=>void):Set<string> {
  host.replaceChildren();
  host.append(element('h2','Opciones para ensayar'));
  if(!ready){host.append(element('p','Esperando la disponibilidad de todos los miembros activos…'));summarize?.({ready:false,full:[],partial:[]});return new Set();}
  const full=element('section',undefined,'panel'),partial=element('section',undefined,'panel partial-windows');
  full.dataset.fullOpportunities='';partial.dataset.partialWindows='';
  full.append(element('h3','Oportunidades de grupo completo'),element('p','Todos los miembros activos, durante al menos dos horas continuas. Todavía no son ensayos confirmados.'));
  partial.append(element('h3','Ventanas de grupo parcial'),element('p','Información secundaria para coordinarse: faltan miembros del grupo. Todavía no son ensayos confirmados.'));
  const names=new Map(members.map(member=>[member.uid,member.name]));
  const qualified=new Set<string>();let fullCount=0;
  const partialSlots:{date:string;slot:Window}[]=[];
  const fullSlots:{date:string;slot:Window}[]=[];
  function card(date:string,slot:Window) {
    const card=element('article',undefined,'opportunity');
    card.append(element('h4',`${dateLabel(date)} · ${slot.start}–${slot.end}`),element('p',`${slot.members.length}/${members.length} miembros · ${slot.duration} min`),element('p',slot.members.map(id=>names.get(id)).join(', ')));
    if(confirm)card.append(confirm(date,slot));
    return card;
  }
  try {
    for(const date of dates) {
      const windows=findWindows(members.map(member=>({uid:member.uid,intervals:effectiveAvailability(member.weekly,member.overrides,date)})));
      for(const slot of windows.full){qualified.add(date);fullCount++;fullSlots.push({date,slot});full.append(card(date,slot));}
      partialSlots.push(...windows.partial.map(slot=>({date,slot})));
    }
  }catch {host.append(element('p','No se han podido calcular las opciones. Revisa la disponibilidad guardada.'));summarize?.({ready:false,failed:true,full:[],partial:[]});return new Set();}
  if(!fullCount)full.append(element('p','No hay oportunidades de grupo completo en estas seis semanas.'));
  partialSlots.sort((a,b)=>b.slot.members.length-a.slot.members.length||b.slot.duration-a.slot.duration||a.date.localeCompare(b.date)||a.slot.start.localeCompare(b.slot.start));
  for(const {date,slot} of partialSlots)partial.append(card(date,slot));
  if(!partialSlots.length)partial.append(element('p','No hay ventanas de grupo parcial.'));
  host.append(full,partial);summarize?.({ready:true,full:fullSlots,partial:partialSlots});return qualified;
}

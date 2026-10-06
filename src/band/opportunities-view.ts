import {dateLabel} from './availability';
import {type Window} from './opportunities';
import {element} from './dom';
import type {MemberAvailability} from './availability-view';
import {planningSummary,type SchedulingSummary} from './planning-summary';
export type {SchedulingSummary} from './planning-summary';
export function renderOpportunities(host:HTMLElement,dates:string[],members:MemberAvailability[],ready:boolean,confirm?:(date:string,slot:Window)=>HTMLElement,summarize?:(summary:SchedulingSummary)=>void):Set<string> {
  host.replaceChildren();
  host.append(element('h2','Opciones para ensayar'));
  const summary=planningSummary(dates,members,ready);
  if(!summary.ready){host.append(element('p',summary.failed?'No se han podido calcular las opciones. Revisa la disponibilidad guardada.':'Esperando la disponibilidad de todos los miembros activos…'));summarize?.(summary);return new Set();}
  const full=element('section',undefined,'panel'),partial=element('section',undefined,'panel partial-windows');
  full.dataset.fullOpportunities='';partial.dataset.partialWindows='';
  full.append(element('h3','Oportunidades de grupo completo'),element('p','Todos los miembros activos, durante al menos dos horas continuas. Todavía no son ensayos confirmados.'));
  partial.append(element('h3','Ventanas de grupo parcial'),element('p','Información secundaria para coordinarse: faltan miembros del grupo. Todavía no son ensayos confirmados.'));
  const names=new Map(members.map(member=>[member.uid,member.name]));
  const qualified=new Set(summary.full.map(item=>item.date));
  function card(date:string,slot:Window) {
    const card=element('article',undefined,'opportunity');
    card.append(element('h4',`${dateLabel(date)} · ${slot.start}–${slot.end}`),element('p',`${slot.members.length}/${members.length} miembros · ${slot.duration} min`),element('p',slot.members.map(id=>names.get(id)).join(', ')));
    if(confirm)card.append(confirm(date,slot));
    return card;
  }
  for(const {date,slot} of summary.full)full.append(card(date,slot));
  if(!summary.full.length)full.append(element('p','No hay oportunidades de grupo completo en estas seis semanas.'));
  for(const {date,slot} of summary.partial)partial.append(card(date,slot));
  if(!summary.partial.length)partial.append(element('p','No hay ventanas de grupo parcial.'));
  host.append(full,partial);summarize?.(summary);return qualified;
}

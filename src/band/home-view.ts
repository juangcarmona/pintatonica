import {collection,onSnapshot,type Firestore} from 'firebase/firestore';
import {memberHome} from './home';
import {element} from './dom';
import {observeAvailability} from "./availability-observer";
import {planningSummary} from "./planning-summary";
import {bandDestination,type BandArea} from "./areas";
import {dateLabel,planningDates} from './availability';
import type {Rehearsal} from './rehearsals';
import {safeURL,type Song} from './repertoire';
import type {Gig,Setlist} from './setlists';
import type {SchedulingSummary} from './opportunities-view';

export function mountHome(db:Firestore,host:HTMLElement) {
  let alive=true,failed=false;
  const ready=new Set<string>();
  let rehearsals:Rehearsal[]=[],songs:Song[]=[],gigs:Gig[]=[],setlists:Setlist[]=[];
  let scheduling:SchedulingSummary|null=null;
  const content=element('div',undefined,'member-home-grid');
  host.append(element('h2','Ahora en la banda'),content);
  const link=(label:string,area:BandArea,anchor?:string,edit=false)=>{const a=element('a',label,'button secondary compact');a.href=bandDestination(area,anchor);if(edit)a.dataset.openEditor='';return a;};
  function render() {
    if(!alive)return;
    content.replaceChildren();
    content.setAttribute('aria-busy',String(!failed&&ready.size!==4));
    if(failed){content.append(element('p','No se ha podido cargar el resumen. Consulta las secciones para reintentar.'));return;}
    if(ready.size!==4){content.append(element('p','Cargando la actividad de la banda…'));return;}
    const current=memberHome(rehearsals,songs,gigs,setlists);
    const rehearsal=element('article',undefined,'panel home-rehearsal');
    rehearsal.append(element('h3','Próximo ensayo'));
    if(current.rehearsal){
      const item=current.rehearsal;
      rehearsal.append(element('p',`${dateLabel(item.date)} · ${item.start}–${item.end} · Madrid`),element('p',item.kind==='full'?'Grupo completo':'Asistencia parcial'),element('p',`Esperados: ${item.expected.map(id=>item.names[id]??'Miembro').join(', ')}`));
      rehearsal.append(element('h4','Preparación guardada'),element('p',item.focus||'Todavía no hay foco compartido para este ensayo.'));
      if(!current.songs.length)rehearsal.append(element('p','Todavía no hay canciones seleccionadas.'));
      for(const song of current.songs){rehearsal.append(element('h4',song.title),element('p',song.arrangement));for(const resource of song.resources??[]){try{const a=element('a',`${resource.kind}: ${resource.label}`);a.href=safeURL(resource.url);a.target='_blank';a.rel='noopener noreferrer';rehearsal.append(a,element('br'));}catch{rehearsal.append(element('p','Enlace no válido; revísalo en el repertorio.'));}}}
      rehearsal.append(link('Preparar ensayo','ensayos',`preparation-${item.id}`,true));
    }else rehearsal.append(element('p','Todavía no hay ensayos confirmados próximos.'),link('Buscar fecha','ensayos','band-availability'));
    const planning=element('article',undefined,'panel');planning.append(element('h3','Encontrar otro ensayo'));
    if(!scheduling?.ready)planning.append(element('p',scheduling?.failed?'No se han podido calcular las opciones.':'Esperando disponibilidad guardada de la banda…'));
    else{
      planning.append(element('p',`${scheduling.full.length} oportunidades de grupo completo · ${scheduling.partial.length} ventanas parciales`));
      for(const {date,slot} of scheduling.full.slice(0,2))planning.append(element('p',`${dateLabel(date)} · ${slot.start}–${slot.end} · grupo completo`));
      for(const {date,slot} of scheduling.partial.slice(0,2))planning.append(element('p',`${dateLabel(date)} · ${slot.start}–${slot.end} · ${slot.members.length} miembros · parcial`));
    }
    planning.append(link('Ver opciones y disponibilidad','ensayos','band-availability'));
    const gig=element('article',undefined,'panel');gig.append(element('h3','Próximo concierto'));
    if(current.gig){const item=current.gig;gig.append(element('h4',item.title),element('p',`${dateLabel(item.date)}${item.time?' · '+item.time:''} · Madrid`),element('p',item.venue));if(current.setlists.length)for(const list of current.setlists)gig.append(element('p',`Setlist: ${list.title}${list.minutes?' · '+list.minutes+' min':''}`));else gig.append(element('p','Todavía no hay setlist asociado.'));gig.append(link('Ver concierto','conciertos'),link('Abrir setlists','setlists'));}
    else gig.append(element('p','Todavía no hay conciertos próximos.'));
    const music=element('article',undefined,'panel');music.append(element('h3','Material musical'),element('p','Canciones, arreglos y recursos compartidos de la banda.'),link('Abrir repertorio','repertorio'));
    content.append(rehearsal,planning,gig,music);
  }
  const stops=['rehearsals','songs','gigs','setlists'].map(path=>onSnapshot(collection(db,path),{includeMetadataChanges:true},snapshot=>{
    if(!alive||snapshot.metadata.fromCache||snapshot.metadata.hasPendingWrites)return;
    const items=snapshot.docs.map(row=>({...row.data(),id:row.id}));
    if(path==='rehearsals')rehearsals=items as Rehearsal[];
    else if(path==='songs')songs=items as Song[];
    else if(path==='gigs')gigs=items as Gig[];
    else setlists=items as Setlist[];
    ready.add(path);render();
  },()=>{failed=true;rehearsals=[];songs=[];gigs=[];setlists=[];render();}));
  const dates=planningDates();
  const stopScheduling=observeAvailability(db,state=>{scheduling=planningSummary(dates,state.members,state.rosterReady&&state.members.every(member=>state.weeklyReady.has(member.uid)&&state.overridesReady.has(member.uid)),state.failed);render();});
  render();const timer=window.setInterval(render,60_000);
  return {dispose:()=>{alive=false;clearInterval(timer);stops.forEach(stop=>stop());stopScheduling();host.replaceChildren();}};
}

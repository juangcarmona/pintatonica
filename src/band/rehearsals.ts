export type Rehearsal={id:string;date:string;start:string;end:string;required:string[];available:string[];expected:string[];names:Record<string,string>;kind:'full'|'partial';confirmedBy:string;songIds?:string[];focus?:string;preparationRevision?:number};
export function attendance(required:string[],expected:string[]):{expected:string[];kind:'full'|'partial'} {
  if(!expected.length||new Set(expected).size!==expected.length||expected.some(id=>!required.includes(id)))throw Error('Selecciona miembros válidos.');
  return {expected:[...expected].sort(),kind:expected.length===required.length?'full':'partial'};
}
export function upcoming<T extends {date:string;start:string;end:string}>(rehearsals:T[],now=new Date()):T[] {
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now);
  const part=(type:string)=>parts.find(value=>value.type===type)!.value;
  const date=`${part('year')}-${part('month')}-${part('day')}`,time=`${part('hour')}:${part('minute')}`;
  return rehearsals.filter(item=>item.date>date||(item.date===date&&item.end>time)).sort((a,b)=>a.date.localeCompare(b.date)||a.start.localeCompare(b.start));
}

export type Setlist={id:string;revision:number;title:string;songIds:string[];minutes:string;notes:string;targetType:string;targetId:string};
export type Gig={id:string;revision:number;title:string;date:string;time:string;venue:string;info:string;notes:string;public:boolean};
export function validateSetlist(draft:Omit<Setlist,'id'|'revision'>,knownSongs:string[],targets:string[]) {
  if(!draft.title.trim()||!draft.songIds.length||draft.songIds.some(id=>!knownSongs.includes(id))||!targets.includes(`${draft.targetType}/${draft.targetId}`)||!['rehearsals','gigs'].includes(draft.targetType))throw Error('Revisa canciones y asociación.');
  if(draft.minutes&&(!Number.isFinite(Number(draft.minutes))||Number(draft.minutes)<=0))throw Error('Duración no válida.');
  return {...draft,title:draft.title.trim(),songIds:[...draft.songIds]};
}
export function validateGig(draft:Omit<Gig,'id'|'revision'>) {
  const date=new Date(draft.date+'T00:00:00Z');
  if(!draft.title.trim()||!/^\d{4}-\d{2}-\d{2}$/.test(draft.date)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==draft.date||(draft.time&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.time)))throw Error('Revisa fecha y datos del concierto.');
  return {...draft,title:draft.title.trim()};
}
export function publicGig(gig:Omit<Gig,'id'|'revision'>){return gig.public?{title:gig.title,date:gig.date,time:gig.time,venue:gig.venue,info:gig.info}:null;}

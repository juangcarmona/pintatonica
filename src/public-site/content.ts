import {safeURL} from '../band/repertoire.ts';
export type Contact={label:string;url:string};
// Editorial media may be a repo-served static asset (root-relative path, no protocol or traversal) or an external http(s) link.
export function editorialURL(value:string):string {
  const trimmed=value.trim();
  // A single leading slash only: no protocol-relative '//' and no backslash that browsers could normalise into one.
  if(trimmed.startsWith('/')&&!trimmed.startsWith('//')&&!/[\s\\]/.test(trimmed)&&!trimmed.includes('..'))return trimmed;
  return safeURL(trimmed);
}
export type PublicMember={name:string;role:string;description?:string;image?:{url:string;label:string}};
export type PublicProfile={introduction:string;contact:Contact|null;media:{label:string;url:string;kind:'photo'|'video'|'audio'|'link'}[];members:PublicMember[]};
// Public editorial entries require explicit approval; never derive these from membership.
// The profile literal between the editorial markers is replaced only by approved real content or, locally and reversibly, by fixture harnesses.
// Approved by Juan, 2026-10-10: debut fact, four member name/role pairs and the Paracuellos 2026 photos.
export const publicProfile:PublicProfile={
  // editorial-approved begin
  introduction:'Pintatónica empezó con una idea sencilla: tocar juntos y construir un repertorio. Poco a poco fuimos sumando canciones, ensayos y ganas, y en las fiestas de Paracuellos de Jarama de 2026 por fin lo llevamos al directo: nuestro primer concierto, en la plaza.',
  contact:null,
  media:[
    {label:'Tras nuestro primer concierto — Fiestas de Paracuellos de Jarama 2026',url:'/media/paracuellos-2026-1.jpg',kind:'photo'},
    {label:'Tras nuestro primer concierto — Fiestas de Paracuellos de Jarama 2026',url:'/media/paracuellos-2026-2.jpg',kind:'photo'},
    {label:'Tras nuestro primer concierto — Fiestas de Paracuellos de Jarama 2026',url:'/media/paracuellos-2026-3.jpg',kind:'photo'},
    {label:'Tras nuestro primer concierto — Fiestas de Paracuellos de Jarama 2026',url:'/media/paracuellos-2026-4.jpg',kind:'photo'}
  ],
  members:[
    {name:'Guille',role:'Guitarra'},
    {name:'Will',role:'Bajo'},
    {name:'Pablo',role:'Batería'},
    {name:'Juan',role:'Teclado'}
  ]
  // editorial-approved end
};
export function contactLink(contact:Contact|null) {
  if(!contact)return null;
  const url=new URL(contact.url);
  if(url.protocol==='mailto:'&&/^[^\s?]+@[^\s?]+$/.test(url.pathname)&&!url.search&&!url.hash)return url.href;
  return safeURL(contact.url);
}
export function publicMusic(data:Record<string,unknown>) {
  if(typeof data.title!=='string'||typeof data.artist!=='string'||typeof data.mediaUrl!=='string')throw Error('Public music data unavailable');
  return {title:data.title,artist:data.artist,mediaUrl:data.mediaUrl?safeURL(data.mediaUrl):''};
}
export function upcomingPublicGigs<T extends {date:string;time:string}>(rows:T[],now=new Date()):T[] {
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now),part=(type:string)=>parts.find(row=>row.type===type)!.value;
  const date=`${part('year')}-${part('month')}-${part('day')}`,time=`${part('hour')}:${part('minute')}`;
  return rows.filter(row=>row.date>date||(row.date===date&&(!row.time||row.time>=time))).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
}

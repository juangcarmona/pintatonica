import {safeURL} from '../band/repertoire.ts';
export type Contact={label:string;url:string};
export type PublicMember={name:string;role:string;description?:string;image?:{url:string;label:string}};
export type PublicProfile={introduction:string;contact:Contact|null;media:{label:string;url:string;kind:'photo'|'video'|'audio'|'link'}[];members:PublicMember[]};
// Public editorial entries require explicit approval; never derive these from membership.
export const publicProfile:PublicProfile={introduction:'Pintatónica es una pequeña banda de música.',contact:null,media:[],members:[]};
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

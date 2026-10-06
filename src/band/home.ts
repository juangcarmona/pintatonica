import {upcoming} from './rehearsals.ts';
import {upcomingPublicGigs} from '../public-site/content.ts';

export function memberHome<R extends {id:string;date:string;start:string;end:string;songIds?:string[]},S extends {id:string},G extends {id:string;date:string;time:string},L extends {targetType:string;targetId:string}>(rehearsals:R[],songs:S[],gigs:G[],setlists:L[],now=new Date()) {
  const rehearsal=upcoming(rehearsals,now)[0]??null;
  const gig=upcomingPublicGigs(gigs,now)[0]??null;
  return {rehearsal,songs:(rehearsal?.songIds??[]).flatMap(id=>songs.filter(song=>song.id===id)),gig,setlists:gig?setlists.filter(item=>item.targetType==='gigs'&&item.targetId===gig.id):[]};
}

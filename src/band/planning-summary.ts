import {effectiveAvailability} from './availability.ts';
import {findWindows,type Window} from './opportunities.ts';
import type {MemberAvailability} from './availability-observer';
export type SchedulingSummary={ready:boolean;failed?:boolean;full:{date:string;slot:Window}[];partial:{date:string;slot:Window}[]};
export function planningSummary(dates:string[],members:MemberAvailability[],ready:boolean,failed=false):SchedulingSummary {
  if(!ready||failed)return {ready:false,failed,full:[],partial:[]};
  const full:SchedulingSummary['full']=[],partial:SchedulingSummary['partial']=[];
  try{
    for(const date of dates){const windows=findWindows(members.map(member=>({uid:member.uid,intervals:effectiveAvailability(member.weekly,member.overrides,date)})));full.push(...windows.full.map(slot=>({date,slot})));partial.push(...windows.partial.map(slot=>({date,slot})));}
    partial.sort((a,b)=>b.slot.members.length-a.slot.members.length||b.slot.duration-a.slot.duration||a.date.localeCompare(b.date)||a.slot.start.localeCompare(b.slot.start));
    return {ready:true,full,partial};
  }catch{return {ready:false,failed:true,full:[],partial:[]};}
}

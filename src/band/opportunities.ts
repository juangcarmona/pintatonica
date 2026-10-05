export type Window = {start:string;end:string;members:string[];duration:number};
export type AvailableMember = {uid:string;intervals:{start:string;end:string}[]};
const minute=(value:string)=>Number(value.slice(0,2))*60+Number(value.slice(3));
export function findWindows(roster:AvailableMember[]):{full:Window[];partial:Window[]} {
  if(!roster.length)return {full:[],partial:[]};
  const boundaries=[...new Set(roster.flatMap(member=>member.intervals.flatMap(slot=>[slot.start,slot.end])))].sort();
  const segments:Window[]=[];
  for(let index=0;index<boundaries.length-1;index++) {
    const start=boundaries[index],end=boundaries[index+1];
    const members=roster.filter(member=>member.intervals.some(slot=>slot.start<=start&&slot.end>=end)).map(member=>member.uid).sort();
    if(!members.length)continue;
    const previous=segments.at(-1);
    if(previous?.end===start && JSON.stringify(previous.members)===JSON.stringify(members)){previous.end=end;previous.duration=minute(end)-minute(previous.start);}
    else segments.push({start,end,members,duration:minute(end)-minute(start)});
  }
  return {full:segments.filter(slot=>slot.members.length===roster.length&&slot.duration>=120),partial:segments.filter(slot=>slot.members.length>=2&&slot.members.length<roster.length).sort((a,b)=>b.members.length-a.members.length||b.duration-a.duration||a.start.localeCompare(b.start))};
}

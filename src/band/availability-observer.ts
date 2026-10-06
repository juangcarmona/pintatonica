import {collection,doc,onSnapshot,type Firestore} from 'firebase/firestore';
import {validDate,type WeeklyInterval,type Overrides} from './availability';
export type MemberAvailability={uid:string;name:string;weekly:WeeklyInterval[];overrides:Overrides};
export type AvailabilitySnapshot={members:MemberAvailability[];weeklyReady:Set<string>;overridesReady:Set<string>;rosterReady:boolean;failed:boolean};
export function observeAvailability(db:Firestore,next:(state:AvailabilitySnapshot)=>void) {
  let alive=true,rosterReady=false,failed=false;
  const members=new Map<string,MemberAvailability>(),weeklyReady=new Set<string>(),overridesReady=new Set<string>(),subscriptions=new Map<string,(()=>void)[]>();
  const publish=()=>{if(alive)next({members:[...members.values()],weeklyReady:new Set(weeklyReady),overridesReady:new Set(overridesReady),rosterReady,failed});};
  const fail=()=>{failed=true;publish();};
  const roster=onSnapshot(collection(db,'members'),{includeMetadataChanges:true},snapshot=>{
    if(!alive||snapshot.metadata.fromCache||snapshot.metadata.hasPendingWrites)return;
    rosterReady=true;
    const active=new Set(snapshot.docs.filter(record=>record.data().active===true).map(record=>record.id));
    for(const [id,stops] of subscriptions)if(!active.has(id)){stops.forEach(stop=>stop());subscriptions.delete(id);members.delete(id);weeklyReady.delete(id);overridesReady.delete(id);}
    for(const record of snapshot.docs){
      if(!active.has(record.id))continue;
      const member=members.get(record.id)??{uid:record.id,name:'Miembro',weekly:[],overrides:{}};
      member.name=typeof record.data().name==='string'?record.data().name:'Miembro';members.set(record.id,member);
      if(subscriptions.has(record.id))continue;
      const weekly=onSnapshot(doc(db,'availability',record.id),{includeMetadataChanges:true},data=>{
        if(!alive||data.metadata.fromCache||data.metadata.hasPendingWrites)return;
        member.weekly=Array.isArray(data.data()?.weekly)?data.data()!.weekly:[];weeklyReady.add(record.id);publish();
      },fail);
      const overrides=onSnapshot(collection(db,'availability',record.id,'overrides'),{includeMetadataChanges:true},data=>{
        if(!alive||data.metadata.fromCache||data.metadata.hasPendingWrites)return;
        member.overrides=Object.fromEntries(data.docs.filter(item=>validDate(item.id)).map(item=>[item.id,item.data().intervals??[]]));overridesReady.add(record.id);publish();
      },fail);
      subscriptions.set(record.id,[weekly,overrides]);
    }
    publish();
  },fail);
  publish();
  return ()=>{alive=false;roster();for(const stops of subscriptions.values())stops.forEach(stop=>stop());subscriptions.clear();};
}

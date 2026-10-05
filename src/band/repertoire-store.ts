import {doc,runTransaction,type Firestore} from 'firebase/firestore';
import {publicSong,validateSong,type Song} from './repertoire';
export async function saveSong(db:Firestore,id:string,revision:number,draft:Omit<Song,'id'|'revision'>) {
  const song=validateSong(draft);
  await runTransaction(db,async transaction=>{
    const ref=doc(db,'songs',id),record=await transaction.get(ref);
    if((record.data()?.revision??0)!==revision)throw Error('shared-conflict');
    transaction.set(ref,{...song,revision:revision+1});
    const projection=publicSong(song),publicRef=doc(db,'publicSongs',id);
    if(projection)transaction.set(publicRef,projection);else transaction.delete(publicRef);
  });
}

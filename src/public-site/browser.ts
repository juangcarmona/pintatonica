import {collection,getDocsFromServer} from 'firebase/firestore';
import {initializeBrowserFirebase} from '../firebase/browser';
import {element} from '../band/dom';
import {publicMusic,upcomingPublicGigs} from './content';
async function loadPublic() {
  const music=document.querySelector<HTMLElement>('[data-public-music]'),media=document.querySelector<HTMLElement>('[data-public-song-media]'),gigs=document.querySelector<HTMLElement>('[data-public-gigs]');
  if(!music||!media||!gigs)return;
  const client=await initializeBrowserFirebase();if(!client)throw Error('Unavailable');
  const results=await Promise.allSettled([getDocsFromServer(collection(client.db,'publicSongs')),getDocsFromServer(collection(client.db,'publicGigs'))]);
  const songs=results[0];music.replaceChildren();media.replaceChildren();
  if(songs.status==='fulfilled'){
    const rows=songs.value.docs.map(record=>publicMusic(record.data())).sort((a,b)=>a.title.localeCompare(b.title));
    if(!rows.length)music.append(element('p','Todavía no hay repertorio publicado.'));
    let linked=0;
    for(const song of rows){const card=element('article',undefined,'public-card');card.append(element('h3',song.title),element('p',song.artist));music.append(card);if(song.mediaUrl){const link=element('a',`${song.title} · ver / escuchar`);link.href=song.mediaUrl;link.target='_blank';link.rel='noopener noreferrer';media.append(link);linked++;}}
    if(!linked)media.append(element('p','Todavía no hay enlaces de canciones publicados.'));
  }else{music.append(element('p','No se ha podido cargar el repertorio. Vuelve a intentarlo más tarde.'));media.append(element('p','No se han podido cargar los enlaces de media.'));}
  gigs.replaceChildren();const performances=results[1];
  if(performances.status==='fulfilled'){
    const rows=upcomingPublicGigs(performances.value.docs.map(record=>{const data=record.data();return {title:String(data.title??''),date:String(data.date??''),time:String(data.time??''),venue:String(data.venue??''),info:String(data.info??'')};}));
    if(!rows.length)gigs.append(element('p','No hay próximos conciertos publicados.'));
    for(const gig of rows){const card=element('article',undefined,'public-card');card.append(element('h3',gig.title),element('p',`${gig.date}${gig.time?' · '+gig.time+' · Madrid':''}`),element('p',gig.venue),element('p',gig.info));gigs.append(card);}
  }else gigs.append(element('p','No se han podido cargar los conciertos. Vuelve a intentarlo más tarde.'));
}
void loadPublic().catch(()=>{for(const node of document.querySelectorAll<HTMLElement>('[data-public-music],[data-public-song-media],[data-public-gigs]'))node.replaceChildren(element('p','El contenido no está disponible ahora. Vuelve a intentarlo más tarde.'));});

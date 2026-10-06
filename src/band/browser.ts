import { initializeBrowserFirebase } from '../firebase/browser';
import { createAccessSession, type AccessState } from './access';
import { firebaseAccessPort } from './firebase-access';
import { mountAvailability } from './availability-view';
import {mountRehearsals} from './rehearsals-view';
import {mountRepertoire} from './repertoire-view';
import {mountSetlists} from './setlists-view';
import {mountGigs} from './gigs-view';
import {mountHome} from './home-view';
import {bandAreas,bandArea} from './areas';
import {protectUnsavedDeparture} from './unsaved';

const status = document.querySelector<HTMLElement>('[data-access-status]');
const dashboard = document.querySelector<HTMLElement>('[data-member-dashboard]');
const memberName = document.querySelector<HTMLElement>('[data-member-name]');
const login = document.querySelector<HTMLButtonElement>('[data-google-login]');
const logout = document.querySelector<HTMLButtonElement>('[data-google-logout]');
const introduction = document.querySelector<HTMLElement>('[data-access-introduction]');
protectUnsavedDeparture();
const messages = {
  checking: 'Comprobando el acceso…',
  'signed-out': 'Entra con tu cuenta de Google. El acceso está reservado a miembros de Pintatónica.',
  denied: 'Esta cuenta no tiene una membresía activa en Pintatónica. Puedes salir y usar otra cuenta.',
  error: 'No se ha podido comprobar el acceso. No se ha concedido acceso privado. Inténtalo de nuevo.',
  member: 'Tu membresía está activa.',
};
function render(state: AccessState) {
  if (!status || !dashboard || !memberName || !login || !logout) return;
  dashboard.hidden = state.kind !== 'member';
  if (introduction) introduction.hidden = state.kind === 'member';
  dashboard.closest('.band-shell')?.toggleAttribute('data-admitted',state.kind==='member');
  memberName.textContent = state.kind === 'member' ? state.name : '';
  status.textContent = messages[state.kind];
  login.hidden = state.kind === 'member' || state.kind === 'checking';
  logout.hidden = state.kind === 'signed-out';
  logout.disabled = state.kind === 'checking';
}
void initializeBrowserFirebase().then((client) => {
  if (!client || !login || !logout) {
    if (status) status.textContent = 'El acceso privado aún no está configurado. Vuelve a intentarlo más tarde.';
    return;
  }
  let disposeWorkspace=()=>{};
  const workspace=document.querySelector<HTMLElement>('[data-band-workspace]');
  const controller = createAccessSession(firebaseAccessPort(client.auth, client.db), (state)=>{
    disposeWorkspace(); disposeWorkspace=()=>{};
    render(state);
    if(state.kind==='member' && workspace && client.auth.currentUser){
      const current=bandArea(document.querySelector<HTMLElement>('[data-band-area]')?.dataset.bandArea);
      const section=document.createElement('div');section.id=`band-section-${bandAreas.indexOf(current)}`;section.tabIndex=-1;
      const navigation=document.createElement('nav');navigation.className='band-navigation';navigation.setAttribute('aria-label','Backstage');
      for(const area of bandAreas){const link=document.createElement('a');link.href=area.path;link.textContent=area.label;if(area.id===current.id)link.setAttribute('aria-current','page');navigation.append(link);}
      workspace.append(navigation,section);
      const measureNavigation=()=>workspace.style.setProperty('--member-navigation-height',`${navigation.getBoundingClientRect().height}px`);
      const navigationSize=new ResizeObserver(measureNavigation);navigationSize.observe(navigation);measureNavigation();
      let stopArea=()=>{};
      if(current.id==='inicio')stopArea=mountHome(client.db,section).dispose;
      else if(current.id==='ensayos'){
        const rehearsalList=document.createElement('div'),availability=document.createElement('div');availability.id='band-availability';availability.tabIndex=-1;section.append(rehearsalList,availability);
        const stopRehearsals=mountRehearsals(client.db,rehearsalList),stopAvailability=mountAvailability(client.db,client.auth.currentUser.uid,availability);
        stopArea=()=>{stopRehearsals();stopAvailability();};
      }else if(current.id==='repertorio')stopArea=mountRepertoire(client.db,section);
      else if(current.id==='setlists')stopArea=mountSetlists(client.db,section);
      else stopArea=mountGigs(client.db,section);
      let reached='';
      const reachAnchor=()=>{
        if(!location.hash||reached===location.hash)return;
        let id:string;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
        const target=document.getElementById(id);if(!target||!section.contains(target))return;
        const disclosure=target.closest('details');if(disclosure)disclosure.open=true;
        target.focus({preventScroll:true});target.scrollIntoView({block:'start'});reached=location.hash;
      };
      const targets=new MutationObserver(reachAnchor);targets.observe(section,{childList:true,subtree:true});addEventListener('hashchange',reachAnchor);reachAnchor();
      disposeWorkspace=()=>{targets.disconnect();removeEventListener('hashchange',reachAnchor);navigationSize.disconnect();workspace.style.removeProperty('--member-navigation-height');stopArea();workspace.replaceChildren();};
    }
  });
  login.addEventListener('click', () => { void controller.signIn(); });
  logout.addEventListener('click', () => { void controller.signOut(); });
  controller.start();
  window.addEventListener('pagehide', () => controller.stop());
  window.addEventListener('pageshow', (event) => { if (event.persisted) controller.start(); });
}).catch(() => { if (status) status.textContent = messages.error; });

import { initializeBrowserFirebase } from '../firebase/browser';
import { createAccessSession, type AccessState } from './access';
import { firebaseAccessPort } from './firebase-access';
import { mountAvailability } from './availability-view';

const status = document.querySelector<HTMLElement>('[data-access-status]');
const dashboard = document.querySelector<HTMLElement>('[data-member-dashboard]');
const memberName = document.querySelector<HTMLElement>('[data-member-name]');
const login = document.querySelector<HTMLButtonElement>('[data-google-login]');
const logout = document.querySelector<HTMLButtonElement>('[data-google-logout]');
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
    if(state.kind==='member' && workspace && client.auth.currentUser)disposeWorkspace=mountAvailability(client.db,client.auth.currentUser.uid,workspace);
  });
  login.addEventListener('click', () => { void controller.signIn(); });
  logout.addEventListener('click', () => { void controller.signOut(); });
  controller.start();
  window.addEventListener('pagehide', () => controller.stop());
  window.addEventListener('pageshow', (event) => { if (event.persisted) controller.start(); });
}).catch(() => { if (status) status.textContent = messages.error; });

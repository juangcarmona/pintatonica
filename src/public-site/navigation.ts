const toggle=document.querySelector<HTMLButtonElement>('[data-menu-toggle]'),nav=document.querySelector<HTMLElement>('#site-navigation'),header=document.querySelector<HTMLElement>('.site-header');
if(toggle&&nav&&header){
  const compact=window.matchMedia('(max-width: 60rem)');header.classList.add('navigation-ready');
  function close(){nav!.hidden=compact.matches;toggle!.setAttribute('aria-expanded','false');}
  toggle.hidden=!compact.matches;close();
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.hidden=!open;});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){close();toggle.focus();}});
  nav.addEventListener('click',event=>{const link=(event.target as Element).closest('a');if(link){close();if(link.hash&&new URL(link.href).pathname===location.pathname){const destination=document.getElementById(link.hash.slice(1));destination?.focus();}}});
  compact.addEventListener('change',()=>{toggle.hidden=!compact.matches;close();});
}

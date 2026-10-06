import {currentSection} from './current-section';
const toggle=document.querySelector<HTMLButtonElement>('[data-menu-toggle]'),nav=document.querySelector<HTMLElement>('#site-navigation'),header=document.querySelector<HTMLElement>('.site-header');
if(toggle&&nav&&header){
  const compact=window.matchMedia('(max-width: 60rem)');header.classList.add('navigation-ready');
  function close(){nav!.hidden=compact.matches;toggle!.setAttribute('aria-expanded','false');}
  toggle.hidden=!compact.matches;close();
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.hidden=!open;});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){close();toggle.focus();}});
  nav.addEventListener('click',event=>{const link=(event.target as Element).closest('a');if(link){close();if(link.hash&&new URL(link.href).pathname===location.pathname){const destination=document.getElementById(link.hash.slice(1));destination?.focus({preventScroll:true});}}});
  compact.addEventListener('change',()=>{toggle.hidden=!compact.matches;close();});
  const sections=[...nav.querySelectorAll<HTMLAnchorElement>('[data-public-area]')].flatMap(link=>{const section=document.getElementById(link.dataset.publicArea!);return section?[{link,section}]:[];});
  if(sections.length){
    let frame=0, entryReady=false, requested:string|undefined, requestedAt:number|undefined;
    const update=()=>{
      frame=0;
      const height=header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--public-header-height',`${height}px`);
      if(requestedAt!==undefined&&requestedAt!==window.scrollY){requested=undefined;requestedAt=undefined;}
      const destination=sections.find(item=>item.section.id===requested);
      const bounds=destination?.section.getBoundingClientRect();
      const visible=destination&&bounds&&bounds.bottom>height&&bounds.top<innerHeight;
      const selected=visible?{...destination,top:bounds.top}:currentSection(sections.map(item=>({...item,top:item.section.getBoundingClientRect().top})),height+(innerHeight-height)/2,window.scrollY>0&&Math.ceil(window.scrollY+window.innerHeight)>=document.documentElement.scrollHeight);
      if(visible)requestedAt=window.scrollY;
      if(selected){
        // Geometry objects are fresh each frame; select by the stable DOM destination.
        for(const item of sections){if(item.section===selected.section)item.link.setAttribute('aria-current','location');else item.link.removeAttribute('aria-current');}
        const url=new URL(location.href);
        const tracked=sections.some(item=>`#${item.section.id}`===url.hash);
        if(entryReady&&(!url.hash||tracked)&&url.hash!==`#${selected.section.id}`){url.hash=selected.section.id;history.replaceState(history.state,'',url);}
      }
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
    const requestHash=()=>{requested=location.hash.slice(1);requestedAt=undefined;schedule();};
    nav.addEventListener('click',event=>{const link=(event.target as Element).closest<HTMLAnchorElement>('a[data-public-area]');if(link){requested=link.dataset.publicArea;requestedAt=undefined;schedule();}});
    addEventListener('hashchange',requestHash);addEventListener('popstate',requestHash);
    const resumeScroll=()=>{requested=undefined;requestedAt=undefined;schedule();};
    addEventListener('wheel',resumeScroll,{passive:true});addEventListener('touchstart',resumeScroll,{passive:true});
    addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))resumeScroll();});
    const restoreEntry=()=>{requested=location.hash.slice(1);requestedAt=undefined;const target=sections.find(item=>`#${item.section.id}`===location.hash);target?.section.scrollIntoView({block:'start'});entryReady=true;schedule();};
    addEventListener('pageshow',restoreEntry);if(document.readyState==='complete')restoreEntry();
    const resize=new ResizeObserver(schedule);resize.observe(header);resize.observe(document.querySelector('main')!);
    schedule();
  }
}

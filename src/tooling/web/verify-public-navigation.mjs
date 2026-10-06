import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {serveBuild} from './serve-build.mjs';

const app=process.env.RUNTIME_URL?undefined:await serveBuild();
const origin=process.env.RUNTIME_URL??app.url;
const local=new URL(origin).hostname==='127.0.0.1';
const output=process.env.RUNTIME_OUTPUT??'artifacts/runtime/GH-28';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'}),observations=[];
const areas=['inicio','quienes-somos','repertorio','media','conciertos','contacto'];
try{
  for(const [label,viewport] of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]){
    const context=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await context.newPage(),errors=[],privateRequests=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('request',request=>{if(/identitytoolkit.googleapis.com/.test(request.url())||(/firestore.googleapis.com|127\.0\.0\.1:8080/.test(request.url())&&/members|availability|rehearsals|setlists|(?:"|%22)(?:songs|gigs)(?:"|%22)/.test(request.postData()??request.url())))privateRequests.push(request.url());});
    const current=async id=>{
      try { await page.waitForFunction(id=>document.querySelector('#site-navigation [aria-current="location"]')?.dataset.publicArea===id,id,{timeout:5000}); } catch(error) { console.log(JSON.stringify({expected:id,...await page.evaluate(()=>({hash:location.hash,current:document.querySelector('[aria-current]')?.outerHTML,scrollY,header:document.querySelector('.site-header').getBoundingClientRect().height,padding:getComputedStyle(document.documentElement).scrollPaddingTop,sections:[...document.querySelectorAll('main section')].map(n=>({id:n.id,top:n.getBoundingClientRect().top}))}))}));await page.screenshot({path:`${output}/${label}-failure.png`});throw error; }
      assert.equal(await page.locator('#site-navigation [aria-current]').count(),1);
      const style=await page.locator(`#site-navigation [data-public-area="${id}"]`).evaluate(node=>({font:getComputedStyle(node).fontWeight,current:node.getAttribute('aria-current'),hash:location.hash,scrollY,viewport:innerHeight,header:document.querySelector('.site-header').getBoundingClientRect().height,banda:document.querySelector('#quienes-somos').getBoundingClientRect().top,htmlHeight:document.documentElement.scrollHeight}));if(style.font!=='700')console.log(JSON.stringify({expected:id,style}));assert.equal(style.font,'700');
    };
    const anchored=async id=>{await page.waitForFunction(id=>{const top=document.getElementById(id).getBoundingClientRect().top,padding=parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);return (id==='inicio'&&scrollY===0)||Math.abs(top-padding)<2||(Math.ceil(scrollY+innerHeight)>=document.documentElement.scrollHeight&&top<innerHeight);},id);};
    const activate=async id=>{
      if(viewport.width<960)await page.getByRole('button',{name:'Abrir navegación',exact:true}).click();
      await page.locator(`#site-navigation [data-public-area="${id}"]`).click();
      await anchored(id);await current(id);
      assert.equal(new URL(page.url()).hash,`#${id}`);
      assert.equal(await page.locator(`#${id}`).evaluate(node=>node===document.activeElement),true);
      if(viewport.width<960)assert.equal(await page.locator('#site-navigation').isHidden(),true);
    };
    await page.goto(origin+'/?navigation-evidence=1#media');await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>!document.querySelector('[data-public-music]').textContent.includes('Cargando'));await current('media');
    await page.reload();await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>!document.querySelector('[data-public-music]').textContent.includes('Cargando'));await current('media');
    await activate('quienes-somos');await activate('repertorio');
    await page.goBack();await anchored('quienes-somos');await current('quienes-somos');
    await page.goForward();await anchored('repertorio');await current('repertorio');
    for(const id of areas){
      await page.evaluate(()=>scrollTo(0,0));await current('inicio');
      await page.evaluate(id=>{const header=document.querySelector('.site-header').getBoundingClientRect().height;const line=header+(innerHeight-header)/2;const target=Math.max(0,scrollY+document.getElementById(id).getBoundingClientRect().top-line+16);window.scrollTo({top:target,behavior:'instant'});return {id,target,actual:scrollY,line,top:document.getElementById(id).getBoundingClientRect().top};},id);
      await current(id);assert.equal(new URL(page.url()).hash,`#${id}`);
    }
    await page.mouse.wheel(0,-500);await page.waitForFunction(()=>document.querySelector('[aria-current="location"]')?.dataset.publicArea!=='contacto');
    assert.equal(new URL(page.url()).search,'?navigation-evidence=1');
    for(const id of areas)await activate(id);
    await activate('inicio');
    await page.screenshot({path:`${output}/${label}-inicio.png`});
    await activate('contacto');
    await page.screenshot({path:`${output}/${label}-contacto.png`});
    if(viewport.width<960){
      const button=page.getByRole('button',{name:'Abrir navegación',exact:true});await button.click();
      await page.screenshot({path:`${output}/${label}-current-menu.png`});
      await page.keyboard.press('Escape');assert.equal(await button.evaluate(n=>n===document.activeElement),true);
      await page.setViewportSize({width:1200,height:844});await page.locator('#site-navigation').waitFor({state:'visible'});
      await page.setViewportSize(viewport);await page.locator('#site-navigation').waitFor({state:'hidden'});
    }
    await page.goto(origin+'/');await page.keyboard.press('Tab');assert.equal(await page.locator('.skip-link').evaluate(n=>n.matches(':focus-visible')),true);
    await page.keyboard.press('Enter');assert.equal(await page.locator('#contenido').evaluate(n=>n===document.activeElement),true);
    // Local-only DOM changes prove that short sections and late content alter measured geometry.
    if(local){
      await page.evaluate(()=>{document.querySelector('#repertorio').style.minHeight='200vh';});
      await activate('media');await page.locator('#repertorio').evaluate(node=>node.style.minHeight='');await page.waitForFunction(()=>{const id=document.querySelector('[aria-current="location"]')?.dataset.publicArea;const box=id&&document.getElementById(id).getBoundingClientRect();return id!=='media'&&box&&box.bottom>document.querySelector('.site-header').getBoundingClientRect().height&&box.top<innerHeight;});await page.mouse.wheel(0,10000);await current('contacto');
      await activate('media');await current('media');
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    assert.deepEqual(errors,[]);assert.deepEqual(privateRequests,[]);
    observations.push({viewport:label,directEntryAndRefresh:true,nativeBackForward:true,allScrollSections:true,linkFocusAndQueryPreserved:true,shortBottomContact:true,menuEscapeResize:true,skipKeyboard:true,asyncGeometry:local?'observed':'local evidence only',pageErrors:0,privateRequests:0,noOverflow:true});
    await context.close();
  }
  await writeFile(`${output}/runtime.json`,JSON.stringify({origin,observedAt:new Date().toISOString(),observations},null,2)+'\n');
  console.log(JSON.stringify(observations));
}finally{await browser.close();await app?.close();}

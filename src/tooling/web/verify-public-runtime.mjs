import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {origin,seedData,project} from './band-session.mjs';
const output='artifacts/runtime/GH-9';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'}),observations=[];
const endpoint=`http://127.0.0.1:8080/v1/projects/${project}/databases/(default)/documents`;
const profilePath='src/public-site/content.ts',original=await readFile(profilePath,'utf8');let fixture;
try{
  const reset=await fetch(`http://127.0.0.1:8080/emulator/v1/projects/${project}/databases/(default)/documents`,{method:'DELETE'});assert.equal(reset.ok,true);
  await seedData('songs/selected',{title:'Tema seleccionado',artist:'Artista',notes:'Notas privadas nunca públicas',resources:[{url:'https://drive.google.com/private-material'}],public:true,publicMediaUrl:'https://www.youtube.com/watch?v=demo-public'});
  await seedData('publicSongs/selected',{title:'Tema seleccionado',artist:'Artista',mediaUrl:'https://www.youtube.com/watch?v=demo-public'});
  await seedData('songs/private',{title:'Tema privado',artist:'Prueba',public:false,notes:'Otro secreto musical'});
  await seedData('gigs/g1',{title:'Concierto seleccionado',date:'2099-11-02',time:'19:00',venue:'Lugar de prueba',info:'Información pública',notes:'Ensayar puente privado',public:true});
  await seedData('publicGigs/g1',{title:'Concierto seleccionado',date:'2099-11-02',time:'19:00',venue:'Lugar de prueba',info:'Información pública'});
  await seedData('publicGigs/past',{title:'Concierto pasado',date:'2000-01-01',time:'19:00',venue:'Pasado',info:''});
  for(const [label,viewport] of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]){
    const context=await browser.newContext({viewport}),page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));await page.goto(origin+'/');await page.getByRole('heading',{name:'Tema seleccionado',exact:true}).waitFor();await page.getByRole('heading',{name:'Concierto seleccionado',exact:true}).waitFor();assert.equal(await page.title(),'Pintatónica');
    const text=await page.locator('main').innerText();assert.doesNotMatch(text,/Tema privado|Notas privadas|Otro secreto|Ensayar puente privado|Concierto pasado|juntos\.|Espacio de la banda/);assert.equal(await page.getByRole('link',{name:'Tema seleccionado · ver / escuchar',exact:true}).getAttribute('href'),'https://www.youtube.com/watch?v=demo-public');
    for(const path of ['songs/selected','gigs/g1','setlists/private','rehearsals/private','members/private'])assert.equal((await fetch(`${endpoint}/${path}`)).status,403);
    await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').innerText(),'Saltar al contenido');assert.equal(await page.locator(':focus').evaluate(node=>{const rect=node.getBoundingClientRect();return document.elementFromPoint(rect.x+rect.width/2,rect.y+rect.height/2)===node;}),true);await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'contenido');
    const toggle=page.getByRole('button',{name:'Abrir navegación',exact:true});
    if(label==='mobile'){await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true');assert.equal(await toggle.locator('span').count(),4);const colours=await toggle.locator('span').evaluateAll(nodes=>nodes.map(node=>getComputedStyle(node).backgroundColor));assert.equal(new Set(colours).size,4);await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert.equal(await toggle.evaluate(node=>node===document.activeElement),true);await toggle.click();await page.locator('#site-navigation').getByRole('link',{name:'Repertorio',exact:true}).click();assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert.equal(await page.locator(':focus').getAttribute('id'),'repertorio');await page.setViewportSize({width:1440,height:1000});await page.locator('#site-navigation').waitFor({state:'visible'});await page.setViewportSize(viewport);await toggle.waitFor({state:'visible'});}
    await page.evaluate(()=>scrollTo(0,0));if(label==='mobile'){await toggle.click();await page.screenshot({path:`${output}/mobile-menu.png`});await page.keyboard.press('Escape');}assert.equal(await page.locator('.site-header').evaluate(node=>getComputedStyle(node).position),'fixed');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);
    await page.screenshot({path:`${output}/${label}-public.png`,fullPage:true});await page.goto(origin+'/band/');await page.getByRole('button',{name:'Entrar con Google',exact:true}).waitFor();assert.equal(await page.locator('[data-member-dashboard]').isHidden(),true);await page.screenshot({path:`${output}/${label}-band.png`});observations.push({viewport:label,selectedPublicMusicAndMedia:true,onlyUpcomingPublicGigs:true,noPrivateMaterial:true,realPrivateReadDenied:true,titleAndBrandFeedback:true,keyboardSkipVisible:true,mobileMenuEscapeLinkResize:true,fixedHeader:true,noOverflow:true,pageErrors:0});await context.close();
  }
  // Exercise the real Astro editorial path with synthetic configuration, then restore exact source.
  const begin='  // editorial-approved begin',end='  // editorial-approved end';
  const beginIndex=original.indexOf(begin),endIndex=original.indexOf(end);
  assert.ok(beginIndex>=0&&endIndex>beginIndex,'Editorial profile markers must bracket the approved content');
  fixture=original.slice(0,beginIndex)+begin+`\n  contact:{label:'Contacto de prueba',url:'mailto:band@example.test'},\n  media:[{label:'Imagen sintética de marca',url:'${origin}/brand/logo.png',kind:'photo'}],\n  members:[]\n`+original.slice(endIndex);
  await writeFile(profilePath,fixture);
  assert.equal((await fetch(`${endpoint}/publicSongs/selected`,{method:'DELETE',headers:{Authorization:'Bearer owner'}})).ok,true);
  const context=await browser.newContext(),page=await context.newPage();await page.goto(origin+'/?editorial-fixture=1');await page.getByRole('link',{name:'Contacto de prueba',exact:true}).waitFor();assert.equal(await page.getByRole('link',{name:'Contacto de prueba',exact:true}).getAttribute('href'),'mailto:band@example.test');assert.equal(await page.getByRole('img',{name:'Imagen sintética de marca',exact:true}).evaluate(img=>img.complete&&img.naturalWidth>0),true);await page.getByText('Todavía no hay enlaces de canciones publicados.',{exact:true}).waitFor();assert.equal(await page.getByText('Todavía no hay fotos o vídeos publicados.',{exact:true}).count(),0);
  const contact=page.getByRole('link',{name:'Contacto de prueba',exact:true});await contact.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');assert.equal(await contact.evaluate(node=>node.matches(':focus-visible')&&getComputedStyle(node).outlineColor!==getComputedStyle(node.closest('.paper-section')).backgroundColor),true);await context.close();
  observations.push({syntheticEditorialConfigurationRendersContactAndPhoto:true,editorialMediaEmptyStateAccurate:true,contactKeyboardFocusContrasts:true,productionEditorialStillPending:true});
  await writeFile(`${output}/runtime.json`,JSON.stringify({project,observations},null,2)+'\n');console.log(JSON.stringify(observations));
}finally{if(fixture){assert.equal(await readFile(profilePath,'utf8'),fixture,'Refuse to overwrite concurrent editorial edits');await writeFile(profilePath,original);}await browser.close();}

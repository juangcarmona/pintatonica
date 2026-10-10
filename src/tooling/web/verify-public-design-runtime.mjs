import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {origin,seedData,project} from './band-session.mjs';
import {assertShellPrivacy} from './assert-shell-privacy.mjs';
const output='artifacts/runtime/GH-22';await mkdir(output,{recursive:true});
const profilePath='src/public-site/content.ts',original=await readFile(profilePath,'utf8');
const endpoint=`http://127.0.0.1:8080/v1/projects/${project}/databases/(default)/documents`;
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'}),observations=[];
const members=['A','B','C','D'].map(letter=>({name:`Músico sintético ${letter}`,role:`Rol musical sintético ${letter}`}));
members[0].description='Descripción editorial sintética.';
members[0].image={url:`${origin}/brand/logo.png`,label:'Imagen de miembro sintética'};
let fixture;
async function reset(){assert.equal((await fetch(`http://127.0.0.1:8080/emulator/v1/projects/${project}/databases/(default)/documents`,{method:'DELETE'})).ok,true);}
async function capture(state){
  for(const [label,viewport] of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]){
    const context=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await context.newPage(),errors=[],privateRequests=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('request',request=>{if(/identitytoolkit.googleapis.com/.test(request.url())||(/firestore.googleapis.com|127\.0\.0\.1:8080/.test(request.url())&&/members|availability|rehearsals|setlists|(?:"|%22)(?:songs|gigs)(?:"|%22)/.test(request.postData()??request.url())))privateRequests.push(request.url());});
    await page.goto(origin+`/?design-state=${state}`);await page.locator('.site-header.navigation-ready').waitFor();
    if(state==='empty'){
      await page.getByText('Todavía no hay repertorio publicado.',{exact:true}).waitFor();
      await page.getByText('No hay próximos conciertos publicados.',{exact:true}).waitFor();
      await page.getByText('Todavía no hay una presentación pública de los miembros.',{exact:true}).waitFor();
      await page.getByText('Todavía no hay fotos o vídeos publicados.',{exact:true}).waitFor();
      await page.getByText('Todavía no hay un contacto público disponible.',{exact:true}).waitFor();
      assert.equal(await page.locator('[data-public-member]').count(),0);
    }else{
      await page.getByRole('heading',{name:'Tema público sintético',exact:true}).waitFor();
      await page.getByRole('heading',{name:'Actuación pública sintética',exact:true}).waitFor();
      assert.equal(await page.locator('[data-public-member]').count(),4);
      assert.equal(await page.locator('.event-date').getAttribute('datetime'),'2099-11-02');
      assert.equal(await page.getByRole('link',{name:'Contacto sintético',exact:true}).getAttribute('href'),'mailto:band@example.test');
      const photo=page.getByRole('img',{name:'Imagen editorial sintética',exact:true});await photo.scrollIntoViewIfNeeded();
      await page.waitForFunction(()=>{const img=document.querySelector('img[alt="Imagen editorial sintética"]');return img?.complete&&img.naturalWidth>0;});
      assert.equal(await photo.evaluate(img=>img.complete&&img.naturalWidth>0),true);
      assertShellPrivacy(await page.content(),{area:'public',approvedMembers:members});
    }
    assert.equal(await page.locator('.hero .button').count(),1);
    assert.equal(await page.locator('.hero > .brand-bars > span').count(),4);
    const utility=page.locator('.site-header .backstage-link');
    assert.equal(await utility.evaluate(node=>getComputedStyle(node).backgroundColor===getComputedStyle(node.closest('header')).backgroundColor),true);
    await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').innerText(),'Saltar al contenido');await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'),'contenido');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${output}/${label}-${state}-hero.png`});
    for(const id of ['quienes-somos','repertorio','media','conciertos','contacto'])await page.locator(`#${id}`).screenshot({path:`${output}/${label}-${state}-${id}.png`});
    await page.locator('.site-footer').screenshot({path:`${output}/${label}-${state}-footer.png`});
    for(const path of ['members/private','songs/private','gigs/private','rehearsals/private','setlists/private'])assert.equal((await fetch(`${endpoint}/${path}`)).status,403);
    assert.deepEqual(privateRequests,[]);assert.deepEqual(errors,[]);
    observations.push({viewport:label,state,approvedEditorialMembersOnly:true,heroSinglePublicAction:true,integratedFourBars:true,secondaryBackstage:true,readablePublicEventDate:state==='populated',honestEmptyStates:state==='empty',noPrivateRequests:true,realPrivateReadsDenied:true,keyboardSkip:true,reducedMotion:true,noOverflow:true,pageErrors:0});
    await context.close();
  }
}
try{
  const begin='  // editorial-approved begin',end='  // editorial-approved end';
  const beginIndex=original.indexOf(begin),endIndex=original.indexOf(end);
  assert.ok(beginIndex>=0&&endIndex>beginIndex,'Editorial profile markers must bracket the approved content');
  const withFixture=profile=>original.slice(0,beginIndex)+begin+`\n  contact:${JSON.stringify(profile.contact)},\n  media:${JSON.stringify(profile.media)},\n  members:${JSON.stringify(profile.members)}\n`+original.slice(endIndex);
  // The empty state is now a fixture too: production editorial is populated, and both renderings must stay regression-verified.
  fixture=withFixture({contact:null,media:[],members:[]});
  await writeFile(profilePath,fixture);
  await reset();await capture('empty');
  fixture=withFixture({contact:{label:'Contacto sintético',url:'mailto:band@example.test'},media:[{label:'Imagen editorial sintética',url:`${origin}/brand/logo.png`,kind:'photo'}],members});
  await writeFile(profilePath,fixture);
  await seedData('publicSongs/design-song',{title:'Tema público sintético',artist:'Artista sintético',mediaUrl:'https://www.youtube.com/watch?v=demo-public'});
  await seedData('publicGigs/design-gig',{title:'Actuación pública sintética',date:'2099-11-02',time:'19:00',venue:'Sala sintética',info:'Información pública sintética'});
  await capture('populated');
  await writeFile(`${output}/runtime.json`,JSON.stringify({project,observations,syntheticEditorialNeverProduction:true},null,2)+'\n');console.log(JSON.stringify(observations));
}finally{
  if(fixture){assert.equal(await readFile(profilePath,'utf8'),fixture,'Preserve concurrent editorial edits');await writeFile(profilePath,original);}
  await browser.close();
}

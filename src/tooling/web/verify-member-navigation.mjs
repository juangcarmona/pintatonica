import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {memberSession,visitArea,cancelAreaLeave,seedData,origin} from './band-session.mjs';
const output=process.env.RUNTIME_OUTPUT??'artifacts/runtime/GH-30';await mkdir(output,{recursive:true});
const areas=[['Inicio','/band/'],['Ensayos','/band/ensayos/'],['Repertorio','/band/repertorio/'],['Setlists','/band/setlists/'],['Conciertos','/band/conciertos/']];
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'}),observations=[];
try{
  for(const[label,viewport]of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]){
    const{page,context,uid,dates,errors}=await memberSession(browser,label,viewport);
    const date=dates.at(-1);
    await seedData('songs/navigation-song',{title:'Tema sintético30',artist:'Prueba',public:false,publicMediaUrl:'',resources:[],revision:1});
    await seedData('gigs/navigation-gig',{title:'Concierto sintético30',date,time:'19:00',venue:'Sala sintética',info:'',notes:'',public:false,revision:1});
    await seedData('rehearsals/navigation-rehearsal',{date,start:'18:00',end:'20:00',required:[uid],available:[uid],expected:[uid],names:{[uid]:'Miembro sintético'},kind:'full',confirmedBy:uid,songIds:[],focus:'',preparationRevision:1});
    await seedData(`availability/${uid}/overrides/${date}`,{intervals:[{start:'18:00',end:'21:00'}]});
    const current=async(name,path)=>{
      await page.locator('[data-member-dashboard]').waitFor({state:'visible'});
      const nav=page.getByRole('navigation',{name:'Backstage',exact:true});assert.equal(await nav.getByRole('link').count(),5);
      assert.equal(await nav.locator('[aria-current=page]').count(),1);assert.equal(await nav.locator('[aria-current=page]').innerText(),name);
      assert.equal(new URL(page.url()).pathname,path);assert.equal(await page.locator('[data-band-workspace] > div').count(),1);
      assert.equal(await nav.locator('[aria-current=page]').evaluate(node=>getComputedStyle(node).fontWeight),'700');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    };
    for(const[name,path]of areas){
      await page.goto(origin+path);await current(name,path);await page.reload();await current(name,path);
      await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${output}/${label}-${name}.png`});
      await seedData(`members/${uid}`,{active:false,name:'Miembro sintético'});await page.locator('[data-member-dashboard]').waitFor({state:'hidden'});
      assert.equal(await page.locator('.band-navigation').count(),0);assert.equal(await page.locator('[data-band-workspace]').innerText(),'');assert.equal(await page.locator('[data-member-name]').innerText(),'');
      await page.reload();await page.waitForFunction(()=>document.querySelector('[data-access-status]').textContent.includes('no tiene una membresía'));
      assert.equal(await page.locator('.band-navigation').count(),0);
      await seedData(`members/${uid}`,{active:true,name:'Miembro sintético'});await current(name,path);
    }
    await visitArea(page,'Inicio',{openEditors:false});await visitArea(page,'Repertorio');await page.goBack();await current('Inicio','/band/');await page.goForward();await current('Repertorio','/band/repertorio/');
    await visitArea(page,'Ensayos');
    const weekly=page.locator('.availability-editors form').first();await weekly.getByRole('button',{name:'Añadir intervalo semanal',exact:true}).click();await cancelAreaLeave(page,'Repertorio');assert.equal(await weekly.locator('[data-start]').count(),1);
    await weekly.getByRole('button',{name:'Guardar horario semanal',exact:true}).click();await page.getByText('Disponibilidad guardada.',{exact:true}).waitFor();assert.equal(await weekly.getAttribute('data-unsaved'),null);await visitArea(page,'Repertorio');
    const song=page.locator('.song-editor');await song.getByLabel('Título',{exact:true}).fill('Borrador de navegación');
    await page.route(/:commit(?:\?|$)/,route=>route.fulfill({status:403,contentType:'application/json',body:JSON.stringify({error:{code:403,status:'PERMISSION_DENIED',message:'Synthetic denied save'}})}));await song.getByRole('button',{name:'Guardar canción',exact:true}).click();await page.getByText('No se ha guardado la canción. Revisa los datos y los enlaces.',{exact:true}).waitFor();await cancelAreaLeave(page,'Setlists');assert.equal(await song.getByLabel('Título',{exact:true}).inputValue(),'Borrador de navegación');
    for(const action of [()=>page.reload({timeout:2000}),()=>page.goBack({timeout:2000})]){let offered=false;const before=page.url();page.once('dialog',async dialog=>{assert.equal(dialog.type(),'beforeunload');offered=true;await dialog.dismiss();});await action().catch(error=>{assert.equal(offered,true);assert.match(error.message,/Timeout 2000ms exceeded|ERR_ABORTED|Navigation.*canceled|net::/);});assert.equal(offered,true);assert.equal(page.url(),before);assert.equal(await song.getByLabel('Título',{exact:true}).inputValue(),'Borrador de navegación');}
    await page.unroute(/:commit(?:\?|$)/);
    page.once('dialog',async dialog=>{assert.equal(dialog.type(),'beforeunload');await dialog.accept();});await visitArea(page,'Setlists');
    const setlist=page.locator('.setlist-editor');await setlist.getByLabel('Nombre del setlist',{exact:true}).fill('Borrador de orden');await setlist.getByLabel('Ensayo / concierto',{exact:true}).selectOption('gigs/navigation-gig');await setlist.getByRole('button',{name:'Añadir canción al setlist',exact:true}).click();await cancelAreaLeave(page,'Conciertos');assert.equal(await setlist.locator('li').count(),1);
    page.once('dialog',async dialog=>{assert.equal(dialog.type(),'beforeunload');await dialog.accept();});await visitArea(page,'Conciertos');
    const gig=page.locator('.gig-editor');await gig.getByLabel('Nombre del concierto',{exact:true}).fill('Borrador concierto');await cancelAreaLeave(page,'Ensayos');assert.equal(await gig.getByLabel('Nombre del concierto',{exact:true}).inputValue(),'Borrador concierto');
    page.once('dialog',async dialog=>{assert.equal(dialog.type(),'beforeunload');await dialog.accept();});await visitArea(page,'Ensayos');
    const override=page.locator('.availability-editors form').nth(1);await override.getByRole('button',{name:'Marcar no disponible',exact:true}).click();await cancelAreaLeave(page,'Inicio');
    page.once('dialog',async dialog=>{assert.equal(dialog.type(),'beforeunload');await dialog.accept();});await visitArea(page,'Inicio',{openEditors:false});await visitArea(page,'Ensayos');
    const confirmation=page.locator('.confirmation-form').first();await confirmation.getByLabel('La banda ha acordado este horario y esta asistencia.',{exact:true}).check();await cancelAreaLeave(page,'Inicio');assert.equal(await confirmation.getByLabel('La banda ha acordado este horario y esta asistencia.',{exact:true}).isChecked(),true);
    page.once('dialog',async dialog=>{assert.equal(dialog.type(),'beforeunload');await dialog.accept();});await visitArea(page,'Inicio',{openEditors:false});await visitArea(page,'Ensayos');
    const prep=page.locator('#preparation-navigation-rehearsal');await prep.getByLabel('Foco / notas del ensayo',{exact:true}).fill('Borrador preparación');await cancelAreaLeave(page,'Inicio');assert.equal(await prep.getByLabel('Foco / notas del ensayo',{exact:true}).inputValue(),'Borrador preparación');await prep.getByRole('button',{name:'Guardar preparación',exact:true}).click();await prep.getByText('Preparación guardada y compartida.',{exact:true}).waitFor();await visitArea(page,'Inicio',{openEditors:false});
    await page.getByRole('button',{name:'Salir de la cuenta',exact:true}).click();await page.getByRole('button',{name:'Entrar con Google',exact:true}).waitFor();
    for(const[,path]of areas){await page.goto(origin+path);await page.getByRole('button',{name:'Entrar con Google',exact:true}).waitFor();assert.equal(await page.locator('.band-navigation').count(),0);assert.equal(await page.locator('[data-member-dashboard]').isVisible(),false);}
    const popupPending=page.waitForEvent('popup');await page.getByRole('button',{name:'Entrar con Google',exact:true}).click();const popup=await popupPending;await popup.waitForLoadState();await popup.getByText('Add new account',{exact:true}).click();await popup.locator('#email-input').fill(`nonmember-${label}-${Date.now()}@example.test`);await popup.locator('#display-name-input').fill('No miembro sintético');await popup.getByRole('button',{name:'Sign in with Google.com',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[data-access-status]').textContent.includes('no tiene una membresía'));
    for(const[,path]of areas){await page.goto(origin+path);await page.waitForFunction(()=>document.querySelector('[data-access-status]').textContent.includes('no tiene una membresía'));assert.equal(await page.locator('.band-navigation').count(),0);assert.equal(await page.locator('[data-member-dashboard]').isVisible(),false);}
    assert.deepEqual(errors,[]);observations.push({viewport:label,fiveSeparatePages:true,oneCurrentSecondaryArea:true,selectedAreaOnly:true,directRefreshHistory:true,allAreaRevocationAndInactiveDirectDenial:true,allSignedOutAndNonmemberPagesWithholdNavigation:true,sevenFormKindsProtected:true,cancelLeaveKeepsDraft:true,deliberateLeaveDiscards:true,failedSaveRemainsProtected:true,dirtyRefreshAndHistoryCancelled:true,successfulSaveClearsProtection:true,noOverflow:true,pageErrors:0});await context.close();
  }
  await writeFile(`${output}/member-navigation.json`,JSON.stringify(observations,null,2)+'\n');console.log(JSON.stringify(observations));
}finally{await browser.close();}

import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {memberSession,seedData,project} from './band-session.mjs';
const output='artifacts/runtime/GH-7';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'});const observations=[];
try {
  for(const [label,viewport] of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]){
    const {context,page,uid,dates,errors}=await memberSession(browser,label,viewport);
    await seedData('songs/prep-song',{title:'Canción de ensayo',artist:'Prueba',public:false,publicMediaUrl:'',notes:'Arreglo interno',resources:[{kind:'Partitura',label:'Puente',url:'https://docs.google.com/document/d/demo'}],revision:1});
    await seedData('rehearsals/prep',{date:dates.at(-1),start:'18:00',end:'20:00',required:[uid],available:[uid],expected:[uid],names:{[uid]:'Miembro de prueba'},kind:'full',confirmedBy:uid});
    const card=page.locator('[data-rehearsal=prep]'),form=card.locator('.preparation-editor');
    await form.getByLabel('Canción de ensayo',{exact:true}).check();await form.getByLabel('Foco / notas del ensayo',{exact:true}).fill('Ensayar el puente');await form.getByRole('button',{name:'Guardar preparación',exact:true}).click();await form.getByText('Preparación guardada y compartida.',{exact:true}).waitFor();
    assert.equal(await form.getByRole('link',{name:'Partitura: Puente',exact:true}).getAttribute('href'),'https://docs.google.com/document/d/demo');
    await page.reload();await form.getByLabel('Foco / notas del ensayo',{exact:true}).waitFor();assert.equal(await form.getByLabel('Foco / notas del ensayo',{exact:true}).inputValue(),'Ensayar el puente');assert.equal(await form.getByLabel('Canción de ensayo',{exact:true}).isChecked(),true);assert.match(await card.innerText(),/18:00–20:00/);
    await form.getByLabel('Foco / notas del ensayo',{exact:true}).fill('Borrador local');
    const other=await memberSession(browser,`${label}-other`,viewport,{reset:false});const otherForm=other.page.locator('[data-rehearsal=prep] .preparation-editor');await otherForm.getByLabel('Foco / notas del ensayo',{exact:true}).fill('Foco compartido de otro miembro');await otherForm.getByRole('button',{name:'Guardar preparación',exact:true}).click();await otherForm.getByText('Preparación guardada y compartida.',{exact:true}).waitFor();
    assert.equal(await form.getByLabel('Foco / notas del ensayo',{exact:true}).inputValue(),'Borrador local');await form.getByRole('button',{name:'Guardar preparación',exact:true}).click();await form.getByText('Otra persona ha cambiado la preparación. Tu borrador sigue aquí; recarga antes de editar.',{exact:true}).waitFor();assert.equal(await form.getByLabel('Foco / notas del ensayo',{exact:true}).inputValue(),'Borrador local');
    page.once('dialog',dialog=>dialog.accept());await form.getByRole('button',{name:'Recargar preparación guardada',exact:true}).click();assert.equal(await form.getByLabel('Foco / notas del ensayo',{exact:true}).inputValue(),'Foco compartido de otro miembro');
    await page.route(/:commit(?:\?|$)/,route=>route.fulfill({status:403,contentType:'application/json',body:JSON.stringify({error:{code:403,status:'PERMISSION_DENIED',message:'Synthetic denied save'}})}));
    await form.getByLabel('Foco / notas del ensayo',{exact:true}).fill('Borrador rechazado');await form.getByRole('button',{name:'Guardar preparación',exact:true}).click();await form.getByText('No se ha guardado la preparación. Tu borrador sigue aquí.',{exact:true}).waitFor();assert.equal(await form.getByLabel('Foco / notas del ensayo',{exact:true}).inputValue(),'Borrador rechazado');await page.unroute(/:commit(?:\?|$)/);
    page.once('dialog',dialog=>dialog.accept());await form.getByRole('button',{name:'Recargar preparación guardada',exact:true}).click();
    await card.screenshot({path:`${output}/${label}.png`});assert.deepEqual(errors,[]);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    observations.push({viewport:label,savedReload:true,timingAttendanceRetained:true,resourceLink:true,secondMemberCanEdit:true,dirtyDraftSurvivesSnapshot:true,conflictPreservesDraft:true,deniedSaveNeverClaimsSuccess:true,noOverflow:true,pageErrors:0});await other.context.close();await context.close();
  }
  await writeFile(`${output}/runtime.json`,JSON.stringify({project,observations},null,2)+'\n');console.log(JSON.stringify(observations));
}finally{await browser.close();}

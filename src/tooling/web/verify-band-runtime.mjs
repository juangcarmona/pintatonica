import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const project='demo-pintatonica';
const origin=process.env.RUNTIME_URL??'http://127.0.0.1:4321';
assert.equal(new URL(origin).hostname,'127.0.0.1','Band scenarios require local demo-only Firebase');
const output='artifacts/runtime/GH-3'; await mkdir(output,{recursive:true});
async function seed(path,fields) {
  const response=await fetch(`http://127.0.0.1:8080/v1/projects/${project}/databases/(default)/documents/${path}`,{method:'PATCH',headers:{'Content-Type':'application/json',Authorization:'Bearer owner'},body:JSON.stringify({fields})});
  assert.equal(response.ok,true);
}
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'});
const observations=[];
try {
  for(const [label,viewport] of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]) {
    const reset=await fetch(`http://127.0.0.1:8080/emulator/v1/projects/${project}/databases/(default)/documents`,{method:'DELETE'});
    assert.equal(reset.ok,true,'Reset only the explicit local demo database between independent browser scenarios');
    const context=await browser.newContext({viewport}); const page=await context.newPage(); const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(origin+'/band/');
    const popupPromise=page.waitForEvent('popup'); await page.getByRole('button',{name:'Entrar con Google',exact:true}).click(); const popup=await popupPromise;
    await popup.waitForLoadState();
    await popup.getByText('Add new account',{exact:true}).click(); await popup.locator('#email-input').fill(`${label}-${Date.now()}@example.test`); await popup.locator('#display-name-input').fill('Cuenta sintética'); await popup.getByRole('button',{name:'Sign in with Google.com',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('[data-access-status]').textContent.includes('no tiene una membresía'));
    const uid=await page.evaluate(async()=>{const client=await import('/src/firebase/client.ts');if(client.auth.app.options.projectId!=='demo-pintatonica')throw Error('Not a demo project');return client.auth.currentUser.uid;});
    await seed(`members/${uid}`,{active:{booleanValue:true},name:{stringValue:'Miembro de prueba'}});
    await page.getByText('Editar mi disponibilidad',{exact:true}).click();
    const weekly=page.locator('form').filter({has:page.getByRole('heading',{name:'Horario semanal',exact:true})});
    const override=page.locator('form').filter({has:page.getByRole('heading',{name:'Excepción para una fecha',exact:true})});
    await weekly.getByRole('button',{name:'Guardar horario semanal',exact:true}).waitFor();
    await page.waitForFunction(()=>!Array.from(document.querySelectorAll('button')).find(node=>node.textContent==='Guardar horario semanal').disabled);
    for(let count=0;count<2;count++)await weekly.getByRole('button',{name:'Añadir intervalo semanal',exact:true}).click();
    await weekly.locator('[data-start]').nth(0).fill('18:00');await weekly.locator('[data-end]').nth(0).fill('20:00');
    await weekly.locator('[data-start]').nth(1).fill('21:00');await weekly.locator('[data-end]').nth(1).fill('22:00');
    await weekly.getByRole('button',{name:'Guardar horario semanal',exact:true}).click();
    await page.getByText('Disponibilidad guardada.',{exact:true}).waitFor();
    await page.reload();await page.getByText('Editar mi disponibilidad',{exact:true}).click(); await page.waitForFunction(()=>document.querySelectorAll('[data-day]').length===2);
    assert.equal(await weekly.locator('[data-start]').nth(0).inputValue(),'18:00');
    const monday=await page.evaluate(async()=> (await import('/src/band/availability.ts')).planningDates()[0]);
    async function reloadDate() {
      await page.reload();await page.getByText('Editar mi disponibilidad',{exact:true}).click();
      await page.waitForFunction(()=>Array.from(document.querySelectorAll('button')).find(node=>node.textContent==='Guardar excepción')?.disabled===false);
      await override.getByLabel('Fecha',{exact:true}).fill(monday);await override.getByLabel('Fecha',{exact:true}).press('Tab');
    }
    await override.getByLabel('Fecha',{exact:true}).fill(monday); await override.getByLabel('Fecha',{exact:true}).press('Tab');
    await override.getByRole('button',{name:'Quitar intervalo',exact:true}).nth(1).click();
    await override.locator('[data-start]').fill('19:00');await override.locator('[data-end]').fill('21:00');
    await page.getByText('Cambios sin guardar.',{exact:true}).waitFor();
    await weekly.getByRole('button',{name:'Guardar horario semanal',exact:true}).click();
    await page.getByText('Guardado. Todavía hay cambios sin guardar.',{exact:true}).waitFor();
    assert.equal(await override.locator('[data-start]').inputValue(),'19:00','Saving the weekly habit must preserve the exception draft');
    assert.equal(await override.locator('[data-end]').inputValue(),'21:00');
    await override.getByRole('button',{name:'Guardar excepción',exact:true}).click();await page.getByText('Disponibilidad guardada.',{exact:true}).waitFor();
    assert.equal(await weekly.locator('[data-start]').nth(0).inputValue(),'18:00');
    await reloadDate();
    assert.equal(await override.locator('[data-start]').inputValue(),'19:00');assert.equal(await override.locator('[data-end]').inputValue(),'21:00');
    await page.locator('.planning-day').first().getByText('Miembro de prueba: 19:00–21:00 · excepción',{exact:true}).waitFor();
    await override.getByRole('button',{name:'Marcar no disponible',exact:true}).click();
    await override.getByRole('button',{name:'Guardar excepción',exact:true}).click();await page.getByText('Disponibilidad guardada.',{exact:true}).waitFor();
    assert.equal(await override.locator('[data-start]').count(),0);
    await reloadDate();assert.equal(await override.locator('[data-start]').count(),0);
    await page.locator('.planning-day').first().getByText('Miembro de prueba: No disponible · excepción',{exact:true}).waitFor();
    await override.getByRole('button',{name:'Restaurar horario habitual',exact:true}).click();await page.getByText('Disponibilidad guardada.',{exact:true}).waitFor();
    assert.equal(await override.locator('[data-start]').count(),2);
    await reloadDate();assert.equal(await override.locator('[data-start]').count(),2);
    await page.locator('.planning-day').first().getByText('Miembro de prueba: 18:00–20:00, 21:00–22:00',{exact:true}).waitFor();
    await weekly.locator('[data-end]').nth(0).fill('17:00');await weekly.getByRole('button',{name:'Guardar horario semanal',exact:true}).click();
    await page.getByText('No se ha guardado. Revisa las horas y vuelve a intentarlo.',{exact:true}).waitFor();
    await page.reload();await page.getByText('Editar mi disponibilidad',{exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-day]').length===2);
    assert.equal(await weekly.locator('[data-end]').nth(0).inputValue(),'20:00');
    const other=`other-${label}`;
    await seed(`members/${other}`,{active:{booleanValue:true},name:{stringValue:'Otro miembro de prueba'}});
    await seed(`availability/${other}/overrides/${monday}`,{intervals:{arrayValue:{values:[{mapValue:{fields:{start:{stringValue:'10:00'},end:{stringValue:'12:00'}}}}]}}});
    await page.locator('.planning-day').first().getByText('Otro miembro de prueba: 10:00–12:00 · excepción',{exact:true}).waitFor();
    const denied=await page.evaluate(async(other)=>{
      const {db}=await import('/src/firebase/client.ts');
      const source=await (await fetch('/src/firebase/client.ts')).text();
      const moduleUrl=source.match(/from ["']([^"']*firebase_firestore[^"']*)["']/)[1];
      const {setDoc,doc}=await import(moduleUrl);
      try{await setDoc(doc(db,'availability',other),{weekly:[]});return 'unexpected-success';}catch(error){return error.code;}
    },other);
    assert.equal(denied,'permission-denied');
    assert.equal(await page.locator('details.week').count(),6);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.screenshot({path:`${output}/${label}-availability.png`,fullPage:true});
    await page.locator('.availability-editors').screenshot({path:`${output}/${label}-editor.png`});
    assert.deepEqual(errors,[]);
    await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));
    assert.equal(await page.locator('[data-band-workspace]').textContent(),'');
    await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));
    await page.getByText('Editar mi disponibilidad',{exact:true}).click();
    await weekly.getByRole('button',{name:'Guardar horario semanal',exact:true}).waitFor();
    observations.push({viewport:label,weeklyIntervalsPersistAfterReload:true,replacementPreservesHabit:true,replacementPersistsInOverviewAfterReload:true,emptyOverridePersistsAfterReload:true,restorationPersistsInOverviewAfterReload:true,dirtyDraftNeverLabelledSaved:true,weeklySavePreservesExceptionDraft:true,invalidSaveFailsWithoutChangingStoredHabit:true,otherMemberSavedExceptionVisible:true,crossMemberWriteDenied:true,workspaceDisposedOnSuspension:true,weeks:6,horizontalOverflow:false,pageErrors:0});
    await context.close();
  }
  await writeFile(`${output}/runtime.json`,JSON.stringify({project,observations},null,2)+'\n');console.log(JSON.stringify(observations));
}finally{await browser.close();}

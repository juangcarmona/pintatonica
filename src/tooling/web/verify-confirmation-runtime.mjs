import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {initializeTestEnvironment} from '@firebase/rules-unit-testing';
import {memberSession,seedData,project} from './band-session.mjs';
const output='artifacts/runtime/GH-5';await mkdir(output,{recursive:true});
const rules=await readFile('src/firebase/firestore.rules','utf8');
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'});const observations=[];
const installRules=async(rules)=>{const env=await initializeTestEnvironment({projectId:project,firestore:{host:'127.0.0.1',port:8080,rules}});await env.cleanup();};
try {
  for(const [label,viewport] of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]) {
    const {context,page,uid,dates,errors}=await memberSession(browser,label,viewport,{clock:true});
    const date=dates[7];for(const id of ['b','c'])await seedData(`members/${id}`,{active:true,name:`Miembro ${id.toUpperCase()}`});
    for(const [id,intervals] of [[uid,[{start:'18:00',end:'22:00'}]],['b',[{start:'18:00',end:'22:00'}]],['c',[{start:'19:00',end:'21:00'}]]])await seedData(`availability/${id}/overrides/${date}`,{intervals});
    const full=page.locator('[data-full-opportunities] article').first();await full.getByText('3/3 miembros · 120 min',{exact:true}).waitFor();
    await full.getByLabel('La banda ha acordado este horario y esta asistencia.',{exact:true}).check();
    await installRules(rules.replace('allow read, write: if isMember();','allow read: if isMember(); allow write: if false;'));
    await full.getByRole('button',{name:'Confirmar ensayo',exact:true}).click();
    await full.getByText('No se ha confirmado el ensayo. Revisa la asistencia y vuelve a intentarlo.',{exact:true}).waitFor();
    assert.equal(await page.locator('[data-rehearsal]').count(),0);
    await installRules(rules);
    await full.getByRole('button',{name:'Confirmar ensayo',exact:true}).click();await full.getByText('Ensayo confirmado. Ya está en la lista compartida.',{exact:true}).waitFor();
    await page.getByText('Ensayo confirmado · grupo completo',{exact:true}).waitFor();
    const partial=page.locator('[data-partial-windows] article').first();
    await partial.getByLabel('La banda ha acordado este horario y esta asistencia.',{exact:true}).check();await partial.getByRole('button',{name:'Confirmar ensayo',exact:true}).click();
    await page.getByText('Ensayo confirmado · asistencia parcial',{exact:true}).waitFor();
    await page.reload();await page.getByText('Ensayo confirmado · grupo completo',{exact:true}).waitFor();await page.getByText('Ensayo confirmado · asistencia parcial',{exact:true}).waitFor();
    assert.equal(await page.locator('[data-rehearsal]').count(),2);
    const openForm=page.locator('[data-full-opportunities] article').first();await openForm.getByLabel('La banda ha acordado este horario y esta asistencia.',{exact:true}).check();
    await page.clock.setFixedTime(new Date(date+'T23:00:00Z'));
    await openForm.getByRole('button',{name:'Confirmar ensayo',exact:true}).click();
    await openForm.getByText('No se ha confirmado el ensayo. Revisa la asistencia y vuelve a intentarlo.',{exact:true}).waitFor();
    await page.clock.runFor(61_000);
    assert.equal(await page.locator('[data-rehearsal]').count(),0,'Upcoming list must expire without a data write');
    await page.clock.setFixedTime(new Date());await page.clock.runFor(61_000);
    await page.getByText('Ensayo confirmado · grupo completo',{exact:true}).waitFor();assert.equal(await page.locator('[data-rehearsal]').count(),2,'Expired open form must not create a third record');
    const other=await memberSession(browser,`${label}-other`,viewport,{reset:false});
    await other.page.getByText('Ensayo confirmado · grupo completo',{exact:true}).waitFor();await other.page.getByText('Ensayo confirmado · asistencia parcial',{exact:true}).waitFor();
    const shared=other.page.locator('[data-rehearsal]').filter({hasText:'asistencia parcial'});const expected=await shared.locator('p').filter({hasText:'Esperados:'}).textContent();assert.match(expected,/Miembro de prueba/);assert.match(expected,/Miembro B/);assert.doesNotMatch(expected,/Miembro C/);
    await other.context.close();assert.deepEqual(errors,[]);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.locator('#band-section-1').screenshot({path:`${output}/${label}.png`});
    observations.push({viewport:label,explicitFullAndPartialConfirmation:true,failedWriteNeverConfirmed:true,retrySingleSavedRecord:true,persistsAfterReload:true,expiredOpenWindowCannotConfirm:true,upcomingExpiresWithoutSnapshot:true,otherMemberSeesExpectedAttendance:true,noOverflow:true,pageErrors:0});await context.close();
  }
  await writeFile(`${output}/runtime.json`,JSON.stringify({project,observations},null,2)+'\n');console.log(JSON.stringify(observations));
}finally{await installRules(rules);await browser.close();}

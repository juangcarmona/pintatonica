import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {memberSession,visitArea,origin} from './band-session.mjs';

const output='artifacts/runtime/GH-20';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'});
const observations=[];
try {
  for(const [label,viewport] of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]) {
    const {page,context,errors}=await memberSession(browser,label,viewport);
    const form=page.locator('.availability-editors form').first();
    await form.getByRole('button',{name:'Añadir intervalo semanal',exact:true}).click();
    const removal=form.getByRole('button',{name:'Quitar intervalo',exact:true});
    assert.equal(await removal.evaluate(node=>node.classList.contains('destructive')),true);
    await form.getByRole('button',{name:'Guardar horario semanal',exact:true}).click();
    await page.getByText('Disponibilidad guardada.',{exact:true}).waitFor();
    assert.equal(await page.getByText('Disponibilidad guardada.',{exact:true}).getAttribute('data-tone'),'positive');
    await removal.focus();
    await page.mouse.move(0,0);
    assert.equal(await removal.evaluate(node=>getComputedStyle(node).borderTopColor===getComputedStyle(node).color),true);
    assert.ok(await removal.evaluate(node=>parseFloat(getComputedStyle(node).outlineWidth)>0));
    assert.ok(await removal.evaluate(node=>node.getBoundingClientRect().height>=44));
    await form.screenshot({path:`${output}/${label}-controls.png`});
    await visitArea(page,'Repertorio');
    const song=page.locator('.song-editor');
    await song.getByLabel('Título',{exact:true}).fill('Borrador sintético');
    let nativeConfirmation=false;
    page.once('dialog',async dialog=>{assert.equal(dialog.type(),'confirm');nativeConfirmation=true;await dialog.dismiss();});
    await page.getByRole('button',{name:'Nueva canción',exact:true}).click();
    assert.equal(nativeConfirmation,true);
    assert.equal(await song.getByLabel('Título',{exact:true}).inputValue(),'Borrador sintético');
    assert.equal(await page.locator('dialog').count(),0);
    await page.evaluate(()=>scrollTo(0,0));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.screenshot({path:`${output}/${label}-member.png`});
    page.once('dialog',async dialog=>{assert.equal(dialog.type(),'beforeunload');await dialog.accept();});
    await page.goto(origin+'/');
    await page.locator('.site-header.navigation-ready').waitFor();
    await page.locator('footer .brand-bars').waitFor();
    assert.equal(await page.locator('footer .brand-bars > span').count(),4);
    await page.locator('.public-button').focus();
    assert.ok(await page.locator('.public-button').evaluate(node=>parseFloat(getComputedStyle(node).outlineWidth)>0));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.screenshot({path:`${output}/${label}-public.png`,fullPage:true});
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.locator('.button').first().evaluate(node=>getComputedStyle(node).transitionDuration),'0s');
    assert.deepEqual(errors,[]);
    observations.push({viewport:label,admittedControls:true,positiveSavedStatus:true,destructiveAction:true,visibleFocus:true,touchTarget:true,nativeConfirmationPreservesDraft:true,noApplicationDialog:true,reusableBars:true,reducedMotion:true,noOverflow:true,pageErrors:0});
    await context.close();
  }
  await writeFile(`${output}/runtime.json`,JSON.stringify(observations,null,2)+'\n');
  console.log(JSON.stringify(observations));
} finally {await browser.close();}

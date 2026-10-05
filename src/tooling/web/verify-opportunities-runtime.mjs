import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {memberSession,seedData,project} from './band-session.mjs';
const output='artifacts/runtime/GH-4';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'});const observations=[];
try {
  for(const [label,viewport] of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]) {
    const {context,page,uid,dates,errors}=await memberSession(browser,label,viewport);
    for(const id of ['b','c'])await seedData(`members/${id}`,{active:true,name:`Miembro ${id.toUpperCase()}`});
    await seedData(`availability/${uid}/overrides/${dates[0]}`,{intervals:[{start:'18:00',end:'22:00'}]});
    await seedData(`availability/b/overrides/${dates[0]}`,{intervals:[{start:'18:00',end:'22:00'}]});
    await seedData(`availability/c/overrides/${dates[0]}`,{intervals:[{start:'19:00',end:'21:00'}]});
    const full=page.locator('[data-full-opportunities]'),partial=page.locator('[data-partial-windows]');
    await full.getByText('3/3 miembros · 120 min',{exact:true}).waitFor();
    assert.equal(await partial.locator('article').count(),2);
    assert.equal(await page.locator('.has-full-opportunity').count(),1);
    await seedData('members/d',{active:true,name:'Miembro D'});
    await full.getByText('No hay oportunidades de grupo completo en estas seis semanas.',{exact:true}).waitFor();
    await partial.getByText('3/4 miembros · 120 min',{exact:true}).waitFor();
    assert.equal(await page.locator('.has-full-opportunity').count(),0);
    assert.match(await partial.locator('article').first().textContent(),/3\/4 miembros/);
    await seedData('members/d',{active:false,name:'Miembro D'});
    await full.getByText('3/3 miembros · 120 min',{exact:true}).waitFor();
    await seedData(`availability/c/overrides/${dates[0]}`,{intervals:[{start:'19:00',end:'20:59'}]});
    await full.getByText('No hay oportunidades de grupo completo en estas seis semanas.',{exact:true}).waitFor();
    assert.equal(await partial.getByText('3/3 miembros · 119 min',{exact:true}).count(),0);
    assert.equal(await page.locator('.has-full-opportunity').count(),0);
    await seedData(`availability/c/overrides/${dates[0]}`,{intervals:[{start:'19:00',end:'21:00'}]});
    await full.getByText('3/3 miembros · 120 min',{exact:true}).waitFor();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);
    const response=await fetch(`http://127.0.0.1:8080/v1/projects/${project}/databases/(default)/documents/rehearsals`,{headers:{Authorization:'Bearer owner'}});const data=await response.json();assert.equal(data.documents?.length??0,0);
    await page.locator('.opportunities').screenshot({path:`${output}/${label}.png`});
    observations.push({viewport:label,fullAndPartialSeparate:true,savedOverridesRecalculate:true,dynamicActiveRoster:true,onlyFullHighlightsWeeks:true,shortFullNotDemoted:true,noAutomaticRehearsal:true,noOverflow:true,pageErrors:0});await context.close();
  }
  await writeFile(`${output}/runtime.json`,JSON.stringify({project,observations},null,2)+'\n');console.log(JSON.stringify(observations));
}finally{await browser.close();}

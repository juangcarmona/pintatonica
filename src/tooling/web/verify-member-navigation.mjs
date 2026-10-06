import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {memberSession} from './band-session.mjs';
const output='artifacts/runtime/GH-9';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'}),observations=[];
try{
  for(const[label,viewport]of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]){
    const{page,context,errors}=await memberSession(browser,label,viewport);
    const nav=page.getByRole('navigation',{name:'Backstage',exact:true});assert.equal(await nav.getByRole('link').count(),5);
    const title=page.locator('.gig-editor').getByLabel('Nombre del concierto',{exact:true});await title.fill('Borrador sin guardar');
    await nav.getByRole('link',{name:'Repertorio',exact:true}).click();await nav.getByRole('link',{name:'Conciertos',exact:true}).click();
    assert.equal(await title.inputValue(),'Borrador sin guardar');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${output}/${label}-member.png`});assert.deepEqual(errors,[]);
    observations.push({viewport:label,fiveMemberAnchors:true,unsavedDraftSurvivesNavigation:true,noOverflow:true,pageErrors:0});await context.close();
  }
  await writeFile(`${output}/member-navigation.json`,JSON.stringify(observations,null,2)+'\n');console.log(JSON.stringify(observations));
}finally{await browser.close();}

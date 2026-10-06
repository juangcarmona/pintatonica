import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {memberSession,seedData,project} from './band-session.mjs';
const rules=(await readFile('src/firebase/firestore.rules','utf8')).replaceAll('\r\n','\n');
async function setRules(content){const response=await fetch(`http://127.0.0.1:8080/emulator/v1/projects/${project}:securityRules`,{method:'PUT',headers:{'Content-Type':'application/json',Authorization:'Bearer owner'},body:JSON.stringify({rules:{files:[{name:'firestore.rules',content}]}})});assert.equal(response.ok,true,'Rules manipulation must stay in the explicit local demo emulator');}
const output='artifacts/runtime/GH-21';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'}),observations=[];
try {
  for(const [label,viewport] of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]) {
    let loadingObserved=false,loadingIntercepted=false;
    const {page,context,uid,dates,errors}=await memberSession(browser,label,viewport,{openEditors:false,prepareAdmission:async page=>{
      await page.route('**/Listen/channel**',async route=>{
        if(!loadingIntercepted&&decodeURIComponent(route.request().postData()??'').includes('collectionId')){
          loadingIntercepted=true;
          await page.locator('#band-section-0 [aria-busy=true]').waitFor();loadingObserved=true;
        }
        await route.continue();
      });
    }});
    await page.unroute('**/Listen/channel**');assert.equal(loadingObserved,true);
    const home=page.locator('#band-section-0');
    await home.getByText('Todavía no hay ensayos confirmados próximos.',{exact:true}).waitFor();
    assert.equal(await page.locator('[data-editor-disclosure][open]').count(),0);
    assert.equal(await page.locator('#band-section-1 #band-availability').count(),1);
    await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${output}/${label}-empty.png`});
    const song={title:'Tema del próximo ensayo',artist:'Artista sintético',status:'En trabajo',key:'Am',tempo:'100',arrangement:'Puente suave',notes:'Nota privada',public:false,publicMediaUrl:'',resources:[{kind:'Partitura',label:'Material del ensayo',url:'https://docs.google.com/document/d/demo-home'}],revision:1};
    await seedData('songs/home-song',song);
    await seedData('rehearsals/home-rehearsal',{date:dates[7],start:'18:00',end:'20:00',required:[uid],available:[uid],expected:[uid],names:{[uid]:'Miembro sintético'},kind:'full',confirmedBy:uid,songIds:['home-song'],focus:'Preparar el puente',preparationRevision:1});
    await seedData('gigs/home-gig',{title:'Actuación sintética',date:dates[14],time:'19:00',venue:'Local sintético',info:'Información pública',notes:'Notas privadas',public:false,revision:1});
    await seedData('setlists/home-list',{title:'Orden de la actuación',targetType:'gigs',targetId:'home-gig',songIds:['home-song'],minutes:'45',notes:'Interpretación',revision:1});
    await home.getByText('Preparar el puente',{exact:true}).waitFor();
    await home.getByText('Setlist: Orden de la actuación · 45 min',{exact:true}).waitFor();
    assert.equal(await home.getByRole('link',{name:'Partitura: Material del ensayo',exact:true}).getAttribute('href'),'https://docs.google.com/document/d/demo-home');
    await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${output}/${label}-home.png`});
    await home.screenshot({path:`${output}/${label}-home-detail.png`});
    const deniedRules=rules.replace('match /setlists/{id} {\n      allow read, write: if isMember();','match /setlists/{id} {\n      allow read: if false;\n      allow write: if isMember();');
    assert.notEqual(deniedRules,rules,'The isolated fault must deny only the setlist summary reader');
    try{
      await setRules(deniedRules);
      await seedData('setlists/home-list',{title:'Orden de la actuación',targetType:'gigs',targetId:'home-gig',songIds:['home-song'],minutes:'45',notes:'Cambio sintético para reevaluar el lector',revision:2});
      await home.getByText('No se ha podido cargar el resumen. Consulta las secciones para reintentar.',{exact:true}).waitFor();
      assert.doesNotMatch(await home.innerText(),/Preparar el puente|Actuación sintética|Orden de la actuación/);assert.equal(await home.locator('[aria-busy=false]').count(),1);
    }finally{await setRules(rules);}
    await page.reload();await home.getByText('Preparar el puente',{exact:true}).waitFor();
    await home.getByRole('link',{name:'Preparar ensayo',exact:true}).click();
    const preparation=page.locator('#preparation-home-rehearsal');
    assert.equal(await preparation.isVisible(),true);
    const visibleTarget=async target=>assert.equal(await target.evaluate(node=>node.getBoundingClientRect().top>=document.querySelector('.band-navigation').getBoundingClientRect().bottom),true,'Sticky navigation must leave the selected target visible');
    await visibleTarget(preparation);
    await preparation.getByLabel('Foco / notas del ensayo',{exact:true}).fill('Preparar la entrada');
    await preparation.getByRole('button',{name:'Guardar preparación',exact:true}).click();
    await preparation.getByText('Preparación guardada y compartida.',{exact:true}).waitFor();
    await home.getByText('Preparar la entrada',{exact:true}).waitFor();
    await page.getByRole('button',{name:'Nueva canción',exact:true}).click();
    const title=page.locator('.song-editor').getByLabel('Título',{exact:true});await title.fill('Borrador conservado');
    const nav=page.getByRole('navigation',{name:'Backstage',exact:true});
    await nav.getByRole('link',{name:'Conciertos',exact:true}).click();await nav.getByRole('link',{name:'Repertorio',exact:true}).click();assert.equal(await title.inputValue(),'Borrador conservado');
    await visibleTarget(page.locator('#band-section-2'));
    await page.screenshot({path:`${output}/${label}-editing.png`});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await seedData(`members/${uid}`,{active:false,name:'Miembro sintético'});
    await page.locator('[data-member-dashboard]').waitFor({state:'hidden'});
    assert.equal(await page.locator('[data-band-workspace]').innerText(),'');assert.deepEqual(errors,[]);
    observations.push({viewport:label,loadingBeforeServerSnapshots:loadingObserved,failedReadClearsSummary:true,emptyHome:true,defaultEditorsClosed:true,availabilityWithinRehearsals:true,nextRehearsalPreparationAndResource:true,upcomingGigAndSetlist:true,directPreparationSaved:true,deliberateEditing:true,draftSurvivesNavigation:true,stickyNavigationLeavesTargetsVisible:true,revocationClearsHomeAndWorkspace:true,noOverflow:true,pageErrors:0});
    await context.close();
  }
  await writeFile(`${output}/runtime.json`,JSON.stringify(observations,null,2)+'\n');console.log(JSON.stringify(observations));
}finally{await browser.close();}

import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {memberSession,project} from './band-session.mjs';
const output='artifacts/runtime/GH-6';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL??'msedge'});const observations=[];
const endpoint=`http://127.0.0.1:8080/v1/projects/${project}/databases/(default)/documents`;
let currentPage;
try {
  for(const [label,viewport] of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]) {
    const {context,page,errors}=await memberSession(browser,label,viewport);
    currentPage=page;
    const form=page.locator('.song-editor');await page.waitForFunction(()=>document.querySelector('.song-editor button[type=submit]')?.disabled===false);
    await form.getByLabel('Título',{exact:true}).fill('Tema sintético');await form.getByLabel('Artista original',{exact:true}).fill('Artista de prueba');await form.getByLabel('Notas de la banda',{exact:true}).fill('Notas internas de ensayo');await form.getByLabel('Estructura / arreglo',{exact:true}).fill('Puente lento');await form.getByLabel('Tempo (BPM)',{exact:true}).fill('100');await form.getByLabel('Tonalidad',{exact:true}).fill('Am');
    await form.getByRole('button',{name:'Añadir recurso',exact:true}).click();await form.getByLabel('Nombre del recurso',{exact:true}).fill('Partitura de trabajo');await form.getByLabel('Enlace privado',{exact:true}).fill('https://docs.google.com/document/d/demo-material');
    await form.getByLabel('Seleccionar para el repertorio público',{exact:true}).check();await form.getByLabel('Enlace de media pública (selección explícita)',{exact:true}).fill('https://www.youtube.com/watch?v=demo-public');
    await form.getByRole('button',{name:'Guardar canción',exact:true}).click();await page.getByText('Canción guardada y compartida.',{exact:true}).waitFor();
    const details=page.locator('[data-song-details]');const id=await details.getAttribute('data-song-details');
    assert.equal(await details.getByRole('link',{name:'Partitura: Partitura de trabajo',exact:true}).getAttribute('href'),'https://docs.google.com/document/d/demo-material');
    const response=await fetch(`${endpoint}/publicSongs/${id}`);assert.equal(response.ok,true);const data=await response.json();assert.deepEqual(Object.keys(data.fields).sort(),['artist','mediaUrl','title']);assert.doesNotMatch(JSON.stringify(data),/Notas internas|demo-material|Puente lento/);
    assert.equal((await fetch(`${endpoint}/songs/${id}`)).status,403);
    await page.reload();await page.getByRole('button',{name:'Tema sintético · Artista de prueba',exact:true}).click();assert.equal(await form.getByLabel('Notas de la banda',{exact:true}).inputValue(),'Notas internas de ensayo');
    await form.getByLabel('Notas de la banda',{exact:true}).fill('Mi borrador sin guardar');
    const other=await memberSession(browser,`${label}-other`,viewport,{reset:false});const otherForm=other.page.locator('.song-editor');await other.page.getByRole('button',{name:'Tema sintético · Artista de prueba',exact:true}).click();await otherForm.getByLabel('Notas de la banda',{exact:true}).fill('Cambio de otro miembro');await otherForm.getByRole('button',{name:'Guardar canción',exact:true}).click();await other.page.getByText('Canción guardada y compartida.',{exact:true}).waitFor();
    await form.getByRole('button',{name:'Guardar canción',exact:true}).click();await page.getByText('Otra persona ha cambiado esta canción. Tu borrador sigue aquí; recarga la versión guardada antes de volver a editar.',{exact:true}).waitFor();assert.equal(await form.getByLabel('Notas de la banda',{exact:true}).inputValue(),'Mi borrador sin guardar');
    page.once('dialog',dialog=>dialog.accept());await form.getByRole('button',{name:'Recargar versión guardada',exact:true}).click();assert.equal(await form.getByLabel('Notas de la banda',{exact:true}).inputValue(),'Cambio de otro miembro');
    await form.getByLabel('Enlace privado',{exact:true}).fill('javascript:alert(1)');await form.getByRole('button',{name:'Guardar canción',exact:true}).click();await page.getByText('No se ha guardado la canción. Revisa los datos y los enlaces.',{exact:true}).waitFor();
    await form.getByLabel('Enlace privado',{exact:true}).fill('https://docs.google.com/document/d/demo-material');await form.getByLabel('Seleccionar para el repertorio público',{exact:true}).uncheck();await form.getByRole('button',{name:'Guardar canción',exact:true}).click();await page.getByText('Canción guardada y compartida.',{exact:true}).waitFor();assert.equal((await fetch(`${endpoint}/publicSongs/${id}`)).status,404);
    await other.page.getByText('Canción privada',{exact:true}).waitFor();assert.equal(await otherForm.getByLabel('Notas de la banda',{exact:true}).inputValue(),'Cambio de otro miembro');await other.context.close();
    await details.screenshot({path:`${output}/${label}.png`});assert.deepEqual(errors,[]);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    observations.push({viewport:label,createAndReload:true,externalPrivateResourceLink:true,explicitSafePublicProjection:true,anonymousPrivateReadDenied:true,otherMemberCanEdit:true,conflictingDraftPreserved:true,unsafeResourceRejected:true,unpublishingRemovesProjection:true,noOverflow:true,pageErrors:0});await context.close();
  }
  await writeFile(`${output}/runtime.json`,JSON.stringify({project,observations},null,2)+'\n');console.log(JSON.stringify(observations));
}catch(error){if(currentPage&&!currentPage.isClosed()){console.error('Repertoire UI diagnostic:',await currentPage.locator('.song-editor').evaluate(form=>({status:form.parentElement.querySelector('[role=status]').textContent,invalid:Array.from(form.elements).filter(node=>node.validity&&!node.validity.valid).map(node=>node.type)})));await currentPage.locator('.song-editor').screenshot({path:`${output}/failure.png`});}throw error;}finally{await browser.close();}

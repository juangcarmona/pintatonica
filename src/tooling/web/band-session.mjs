import assert from 'node:assert/strict';
export const project='demo-pintatonica';
export const origin=process.env.RUNTIME_URL??'http://127.0.0.1:4321';
assert.equal(new URL(origin).hostname,'127.0.0.1','Private runtime fixtures require the local demo emulator');
export async function seed(path,fields) {
  const response=await fetch(`http://127.0.0.1:8080/v1/projects/${project}/databases/(default)/documents/${path}`,{method:'PATCH',headers:{'Content-Type':'application/json',Authorization:'Bearer owner'},body:JSON.stringify({fields})});
  assert.equal(response.ok,true);
}
export function firestoreValue(value) {
  if(typeof value==='string')return {stringValue:value};
  if(typeof value==='boolean')return {booleanValue:value};
  if(typeof value==='number')return {integerValue:String(value)};
  if(Array.isArray(value))return {arrayValue:{values:value.map(firestoreValue)}};
  return {mapValue:{fields:Object.fromEntries(Object.entries(value).map(([key,item])=>[key,firestoreValue(item)]))}};
}
export const seedData=(path,data)=>seed(path,Object.fromEntries(Object.entries(data).map(([key,value])=>[key,firestoreValue(value)])));
export async function memberSession(browser,label,viewport,{reset=true}={}) {
  if(reset){const response=await fetch(`http://127.0.0.1:8080/emulator/v1/projects/${project}/databases/(default)/documents`,{method:'DELETE'});assert.equal(response.ok,true);}
  const context=await browser.newContext({viewport});const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(origin+'/band/');
  const pending=page.waitForEvent('popup');await page.getByRole('button',{name:'Entrar con Google',exact:true}).click();const popup=await pending;await popup.waitForLoadState();
  await popup.getByText('Add new account',{exact:true}).click();await popup.locator('#email-input').fill(`${label}-${Date.now()}@example.test`);await popup.locator('#display-name-input').fill('Cuenta sintética');await popup.getByRole('button',{name:'Sign in with Google.com',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('[data-access-status]').textContent.includes('no tiene una membresía'));
  const uid=await page.evaluate(async()=>{const client=await import('/src/firebase/client.ts');assertDemo(client.auth.app.options.projectId);function assertDemo(id){if(id!=='demo-pintatonica')throw Error('Not demo');}return client.auth.currentUser.uid;});
  await seedData(`members/${uid}`,{active:true,name:'Miembro de prueba'});
  await page.waitForFunction(()=>Array.from(document.querySelectorAll('button')).find(node=>node.textContent==='Guardar horario semanal')?.disabled===false);
  const dates=await page.evaluate(async()=> (await import('/src/band/availability.ts')).planningDates());
  return {context,page,uid,dates,errors};
}

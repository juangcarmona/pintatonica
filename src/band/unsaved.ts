export function setUnsaved(form:HTMLFormElement,dirty:boolean) {form.toggleAttribute('data-unsaved',dirty);}
export function protectUnsavedDeparture() {
  const leave=(event:BeforeUnloadEvent)=>{
    if(!document.querySelector('[data-band-workspace] form[data-unsaved]'))return;
    event.preventDefault();
  };
  window.addEventListener('beforeunload',leave);
  return ()=>window.removeEventListener('beforeunload',leave);
}

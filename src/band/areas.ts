export const bandAreas = [
  {id:'inicio',label:'Inicio',path:'/band/'},
  {id:'ensayos',label:'Ensayos',path:'/band/ensayos/'},
  {id:'repertorio',label:'Repertorio',path:'/band/repertorio/'},
  {id:'setlists',label:'Setlists',path:'/band/setlists/'},
  {id:'conciertos',label:'Conciertos',path:'/band/conciertos/'},
] as const;
export type BandArea = typeof bandAreas[number]['id'];
export function bandArea(id:string|undefined) {return bandAreas.find(area=>area.id===id)??bandAreas[0];}
export function bandDestination(id:BandArea,anchor?:string) {return bandArea(id).path+(anchor?`#${encodeURIComponent(anchor)}`:'');}

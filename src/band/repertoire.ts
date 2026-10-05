export type SongResource={kind:string;label:string;url:string};
export type Song={id:string;title:string;artist:string;status:string;key:string;tempo:string;arrangement:string;notes:string;public:boolean;publicMediaUrl:string;resources:SongResource[];revision:number};
export const resourceKinds=['Partitura','Letra','Acordes','Referencia / original','Grabación de ensayo','Vídeo','Google Docs / Drive','Otro recurso'];
export function publicSong(song:Pick<Song,'public'|'title'|'artist'|'publicMediaUrl'>) {return song.public?{title:song.title,artist:song.artist,mediaUrl:song.publicMediaUrl}:null;}
export function safeURL(value:string):string {
  try {const url=new URL(value.trim());if(!['https:','http:'].includes(url.protocol)||url.username||url.password)throw Error();return value.trim();}
  catch {throw Error('Usa un enlace http/https sin credenciales.');}
}
export function validateSong(song:Omit<Song,'id'|'revision'>):Omit<Song,'id'|'revision'> {
  const title=song.title.trim();if(!title)throw Error('El título es obligatorio.');
  const tempo=song.tempo.trim();if(tempo&&(!Number.isFinite(Number(tempo))||Number(tempo)<=0))throw Error('El tempo debe ser positivo.');
  return {...song,title,artist:song.artist.trim(),tempo,publicMediaUrl:song.publicMediaUrl.trim()?safeURL(song.publicMediaUrl):'',resources:song.resources.map(resource=>{
    if(!resourceKinds.includes(resource.kind))throw Error('Tipo de recurso no válido.');
    return {kind:resource.kind,label:resource.label.trim()||resource.kind,url:safeURL(resource.url)};
  })};
}

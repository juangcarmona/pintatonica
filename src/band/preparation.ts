export function validatePreparation(songIds:string[],focus:string,knownIds:string[]) {
  if(new Set(songIds).size!==songIds.length||songIds.some(id=>!knownIds.includes(id)))throw Error('Selecciona canciones existentes.');
  return {songIds:[...songIds],focus};
}

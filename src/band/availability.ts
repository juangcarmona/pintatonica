export type Interval = { start: string; end: string };
export type WeeklyInterval = Interval & { day: number };
export type Overrides = Record<string, Interval[]>;
export const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export function effectiveAvailability(weekly: WeeklyInterval[], overrides: Overrides, date: string): Interval[] {
  if (Object.hasOwn(overrides, date)) return overrides[date];
  const day = new Date(date + 'T12:00:00Z').getUTCDay();
  return weekly.filter((slot) => slot.day === day).map(({ start, end }) => ({ start, end }));
}
export function minutes(time: string): number {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error('Usa una hora válida (HH:MM).');
  return Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
}
export function normalizeIntervals(slots: Interval[]): Interval[] {
  const sorted = slots.map(({start,end}) => {
    if (minutes(start) >= minutes(end)) throw new Error('La hora final debe ser posterior a la inicial.');
    return {start,end};
  }).sort((a,b)=>a.start.localeCompare(b.start));
  const result: Interval[] = [];
  for (const slot of sorted) {
    const previous = result.at(-1);
    if (previous && slot.start <= previous.end) previous.end = previous.end > slot.end ? previous.end : slot.end;
    else result.push({...slot});
  }
  return result;
}
export function madridDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const part = (type: string) => parts.find((item)=>item.type===type)!.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
export function planningDates(now = new Date()): string[] {
  const date = new Date(madridDate(now)+'T12:00:00Z');
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay()+6)%7);
  return Array.from({length:42}, (_,index)=> {
    const day = new Date(date); day.setUTCDate(day.getUTCDate()+index);
    return day.toISOString().slice(0,10);
  });
}
export function dateLabel(date: string): string {
  return new Intl.DateTimeFormat('es-ES',{timeZone:'UTC',weekday:'short',day:'numeric',month:'short'}).format(new Date(date+'T12:00:00Z'));
}
export function validDate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date+'T12:00:00Z')) && new Date(date+'T12:00:00Z').toISOString().slice(0,10)===date;
}

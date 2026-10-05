import assert from 'node:assert/strict';
import { test } from 'node:test';
import { effectiveAvailability, normalizeIntervals, planningDates, madridDate } from '../../band/availability.ts';

test('a replacement date exception preserves later weekly habits; empty and removal are distinct', () => {
  const weekly = [{ day: 1, start: '18:00', end: '22:00' }];
  const overrides = { '2026-11-02': [{ start: '19:00', end: '21:00' }] };
  assert.deepEqual(effectiveAvailability(weekly, overrides, '2026-11-02'), [{ start: '19:00', end: '21:00' }]);
  assert.deepEqual(effectiveAvailability(weekly, overrides, '2026-11-09'), [{ start: '18:00', end: '22:00' }]);
  assert.deepEqual(effectiveAvailability(weekly, { '2026-11-02': [] }, '2026-11-02'), []);
  assert.deepEqual(effectiveAvailability(weekly, {}, '2026-11-02'), [{ start: '18:00', end: '22:00' }]);
});

test('Madrid civil dates and six Monday-based weeks remain correct across DST and month boundaries', () => {
  assert.equal(madridDate(new Date('2026-10-04T22:30:00Z')), '2026-10-05');
  const dates = planningDates(new Date('2026-03-29T00:30:00Z'));
  assert.equal(dates.length,42); assert.equal(dates[0],'2026-03-23'); assert.equal(dates.at(-1),'2026-05-03');
  assert.equal(new Set(dates).size,42);
});

test('separated intervals remain separate; overlapping or touching intervals form a continuous union', () => {
  assert.deepEqual(normalizeIntervals([{ start:'21:00',end:'22:00' }, {start:'18:00',end:'20:00'}]), [{start:'18:00',end:'20:00'}, {start:'21:00',end:'22:00'}]);
  assert.deepEqual(normalizeIntervals([{start:'18:00',end:'19:00'}, {start:'19:00',end:'20:00'}, {start:'18:30',end:'19:30'}]), [{start:'18:00',end:'20:00'}]);
  for(const slots of [[{start:'20:00',end:'18:00'}],[{start:'18:00',end:'18:00'}],[{start:'25:00',end:'26:00'}]]) assert.throws(()=>normalizeIntervals(slots));
});

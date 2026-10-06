export function currentSection<T extends { top: number }>(sections: readonly T[], readingLine: number, atBottom: boolean): T | undefined {
  if (atBottom) return sections.at(-1);
  return sections.findLast(section => section.top <= readingLine + 1) ?? sections[0];
}

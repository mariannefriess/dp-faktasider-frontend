export function idFromString(value: string) {
  return `${value
    .toLowerCase()
    .trim()
    .replace(/\s/g, '-')
    .replace(/---/g, '-')
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^\w\d-]/g, '')}`;
}

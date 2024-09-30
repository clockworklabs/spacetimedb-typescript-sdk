export function toPascalCase(s: string): string {
  const str = s.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });

  return str.charAt(0).toUpperCase() + str.slice(1);
}

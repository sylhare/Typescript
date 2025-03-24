export function french(input: string): string {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  const special = [',', '.', '?', '!'];

  return input.split(' ').map(word => {
    const suffix = word.slice(0, [...word].findIndex(e => vowels.includes(e)));
    let  prefix =  word.slice(suffix.length, suffix.length + 1), middle = '', end = '';
    [...word].forEach(char => special.includes(char) ? end += char : middle += char);

    if (vowels.includes(word[0].toLowerCase())) return middle + 'way' + end;
    if (suffix[0].toUpperCase() === suffix[0]) prefix = prefix.toUpperCase();
    return prefix + middle.slice(suffix.length + 1) + suffix.toLowerCase() + 'ay' + end;
  }).join(' ');
}

export function frenchex(input: string): string {
  return input.replace(/\b(\w)(\w+)\b/g, (word: string, first: string, _: string) => {
    const groups = word.match(/\b([^\W_aeiou]+)(\w+)\b/)!!;

    return /[aeiou]/i.test(first) ? word + 'way' :
      groups[2].replace(/^\w/, x => /[A-Z]/.test(first) ? x.toUpperCase() : x) +
      groups[1].toLowerCase() + 'ay';
  });
}
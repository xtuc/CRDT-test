/* @flow */

export function compareIdentifiers(
  l: Identifier,
  r: Identifier
): number {

  if (l === r) {
    return 0;
  }

  const [ lNumber, lLetter ] = l;
  const [ rNumber, rLetter ] = r;

  if (lNumber === rNumber) {

    if (lLetter > rLetter) {
      return 1;
    } else {
      return -1;
    }

  } else if (lNumber > rNumber) {
    return 1;
  } else {
    return -1;
  }
}

export const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

export function generateIdentifier(
  maxNumber: number = 0,
  maxLetter: string = 'a'
) {
  const number = maxNumber + 1;

  const letterIndex = alphabet.indexOf(maxLetter);
  const letter = alphabet[letterIndex + 1];

  return [ number, letter ];
}

import { dictionary } from '../Constants/dictionary';
import { alphabet } from '../Constants/alphabet';

export const findThrees = (word, letter) => {
  const splitWord = word.split('');
  let found = false;
  for (let i = 0; i < word.length; i++) {
    for (let j = i + 1; j < word.length; j++) {
      const sorted = [splitWord[i], splitWord[j], letter].sort().join('').toLowerCase();
      if (dictionary[3][sorted]) {
        found = true;
        break;
      }
    }
  }
  return found;
};

export const findFours = (word, letter) => {
  const splitWord = word.split('');
  let found = false;
  for (let i = 0; i < word.length; i++) {
    for (let j = i + 1; j < word.length; j++) {
      if (found) break;
      for (let k = j + 1; k < word.length; k++) {
        const sorted = [splitWord[i], splitWord[j], splitWord[k], letter]
          .sort()
          .join('')
          .toLowerCase();
        if (dictionary[4][sorted]) {
          found = true;
          break;
        }
      }
    }
  }
  return found;
};

export const findFives = (word, letter) => {
  const splitWord = word.split('');
  let found = false;
  for (let i = 0; i < word.length; i++) {
    for (let j = i + 1; j < word.length; j++) {
      if (found) break;
      for (let k = j + 1; k < word.length; k++) {
        for (let n = k + 1; n < word.length; n++) {
          const sorted = [splitWord[i], splitWord[j], splitWord[k], splitWord[n], letter]
            .sort()
            .join('')
            .toLowerCase();
          if (dictionary[5][sorted]) {
            found = true;
            break;
          }
        }
      }
    }
  }
  return found;
};

export const checkForWords = (word, letters) => {
  if (
    letters.some((letter) => {
      return findThrees(word, letter);
    })
  ) {
    return true;
  } else if (
    letters.some((letter) => {
      return findFours(word, letter);
    })
  ) {
    return true;
  } else if (
    letters.some((letter) => {
      return findFives(word, letter);
    })
  ) {
    return true;
  }
  return false;
};

export const validateWord = (word, usedLetters, usedWords) => {
  if (word.length < 3) return false;
  const availableLetters = alphabet.filter((letter) => !usedLetters.includes(letter));
  const singleNewletter = availableLetters.filter((letter) => word.toUpperCase().includes(letter));
  console.log(singleNewletter);
  if (!singleNewletter || singleNewletter.length > 1) return false;
  const isWord =
    dictionary[word.length] &&
    (dictionary[word.length][word.split('').sort().join('').toLowerCase()] || []).includes(
      word.toLowerCase()
    );
  if (!isWord) return false;
  const wordLetters = {};
  usedWords[0].split('').forEach((letter) => {
    if (wordLetters[letter.toUpperCase()]) wordLetters[letter.toUpperCase()] += 1;
    else wordLetters[letter.toUpperCase()] = 1;
  });
  const wordCheck = word.split('').every((letter) => {
    if (letter.toUpperCase() === singleNewletter[0]) return true;
    else if (wordLetters[letter.toUpperCase()]) {
      wordLetters[letter.toUpperCase()] = wordLetters[letter.toUpperCase()] - 1;
      return wordLetters[letter.toUpperCase()] >= 0;
    } else return false;
  });
  return wordCheck;
};

import { useState, useEffect } from 'react';
import { PageUI } from './ui';
import { alphabet } from '../../Constants/alphabet';
import { dictionary } from '../../Constants/newDictionary';

export const Page = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [usedLetters, setUsedLetters] = useState(['H', 'A', 'T', 'C']);
  const [usedWords, setUsedWords] = useState(['HATCH']);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [valid, setValid] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [newlyUsedLetters, setNewlyUsedLetters] = useState(null);
  const windowWidth = window.innerWidth;
  const mobile = windowWidth < 500;

  useEffect(() => {
    if (finished === false && localStorage.finished === 'true') {
      setFinished(true);
      setTimeTaken(localStorage.time);
      setUsedLetters(Array(parseInt(localStorage.score)).fill('A'));
      setUsedWords(localStorage.words.split(','));
    }
  });

  const handleWordChange = (e) => {
    const newWord = e.target.value.replace(/\s+/g, '').toUpperCase();
    const availableLetters = alphabet.filter((letter) => !usedLetters.includes(letter));
    const newLetters = availableLetters.filter((letter) =>
      newWord.toUpperCase().split('').includes(letter)
    );
    setNewlyUsedLetters(newLetters);

    if (!startTime) {
      setStartTime(new Date());
    }
    setCurrentWord(newWord);
    if (validateWord(newWord)) {
      setValid(true);
    } else setValid(false);
  };

  const handleEnter = (e) => {
    if (valid && e.keyCode === 13) {
      addWord();
    }
  };

  const findPermutations = (string) => {
    if (!string || typeof string !== 'string') {
      return 'Please enter a string';
    } else if (string.length < 3) {
      return string;
    }

    let permutationsArray = [];

    for (let i = 0; i < string.length; i++) {
      let char = string[i];

      if (string.indexOf(char) != i) continue;

      let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length);

      for (let permutation of findPermutations(remainingChars)) {
        permutationsArray.push(char + permutation);
      }
    }
    return permutationsArray;
  };

  const endTime = () => {
    const endTime = new Date();
    const ms = endTime - startTime;
    const min = Math.floor((ms / 1000 / 60) << 0);
    const sec = Math.floor((ms / 1000) % 60);
    const seconds = sec < 10 ? `0${sec}` : sec;
    const timeString = `${min}: ${seconds}`;
    setTimeTaken(timeString);
    return timeString;
  };

  const checkWordsLeft = (word, letters) => {
    const availableLetters = alphabet.filter((letter) => !letters.includes(letter));
    const wordToUse = word.toUpperCase().split('');
    const noWordsLeft = !availableLetters.some((letter) => {
      const perms = findPermutations([...wordToUse, letter].join(''));
      return perms.some((wordToCheck) => {
        if (
          dictionary[wordToCheck.length].includes(wordToCheck.toLowerCase()) &&
          wordToCheck !== word.toUpperCase() &&
          wordToCheck.toUpperCase().split('').sort().join() !==
            word.toUpperCase().split('').sort().join()
        ) {
          return true;
        }
      });
    });
    if (noWordsLeft) {
      endTime();
    }
    return noWordsLeft;
  };

  const validateWord = (word) => {
    const availableLetters = alphabet.filter((letter) => !usedLetters.includes(letter));
    const singleNewletter = availableLetters.filter((letter) =>
      word.toUpperCase().includes(letter)
    );
    if (!singleNewletter) return false;
    const isWord = dictionary[word.length].includes(word.toLowerCase());
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
    return singleNewletter.length === 1 && isWord && word.length > 2 && wordCheck;
  };

  const finishGame = () => {
    const gameTime = endTime();
    localStorage['score'] = usedLetters.length;
    localStorage['finished'] = true;
    localStorage['time'] = gameTime;
    localStorage['words'] = usedWords;
    setFinished(true);
  };

  const addWord = () => {
    const availableLetters = alphabet.filter((letter) => !usedLetters.includes(letter));
    const newLetter = availableLetters.filter((letter) =>
      currentWord.toUpperCase().includes(letter)
    );
    setUsedWords([currentWord, ...usedWords]);
    setUsedLetters([...usedLetters, ...newLetter]);
    if (checkWordsLeft(currentWord, [...usedLetters, ...newLetter])) finishGame();
    setCurrentWord('');
    setValid(false);
  };

  return (
    <PageUI
      finished={finished}
      handleEnter={handleEnter}
      valid={valid}
      addWord={addWord}
      usedLetters={usedLetters}
      usedWords={usedWords}
      currentWord={currentWord}
      handleWordChange={handleWordChange}
      rulesOpen={rulesOpen}
      setRulesOpen={setRulesOpen}
      mobile={mobile}
      timeTaken={timeTaken}
      newlyUsedLetters={newlyUsedLetters}
      finishGame={finishGame}
    />
  );
};

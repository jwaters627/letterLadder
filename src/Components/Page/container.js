import React, { useState, useEffect } from 'react';
import { PageUI } from './ui';
import { alphabet } from '../../Constants/alphabet';
import { checkForWords, validateWord } from '../../Utils/words';
import { wordsToUse } from '../../Constants/wordsToUse';

export const Page = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [usedLetters, setUsedLetters] = useState([]);
  const [usedWords, setUsedWords] = useState([]);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [valid, setValid] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [newlyUsedLetters, setNewlyUsedLetters] = useState(null);
  const windowWidth = window.innerWidth;
  const mobile = windowWidth < 500;
  const startDate = new Date('2/20/22').setHours(0, 0, 0, 0);

  useEffect(() => {
    if (finished === false && localStorage.finished === 'true') {
      setFinished(true);
      setTimeTaken(localStorage.time);
      setUsedLetters(Array(parseInt(localStorage.score)).fill('A'));
      setUsedWords(localStorage.words.split(','));
    }
  });

  useEffect(() => {
    if (usedWords.length === 0) {
      const days = (new Date().setHours(0, 0, 0, 0) - startDate) / (1000 * 60 * 60 * 24);
      const wordToUse = wordsToUse[days];
      setUsedWords([wordToUse]);
      setUsedLetters([...new Set(wordToUse.split(''))]);
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
    if (validateWord(newWord, usedLetters, usedWords)) {
      setValid(true);
    } else setValid(false);
  };

  const handleEnter = (e) => {
    if (valid && e.keyCode === 13) {
      addWord();
    }
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

    const noWordsLeft = !checkForWords(word, availableLetters);
    if (noWordsLeft) {
      endTime();
    }
    return noWordsLeft;
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

import React, { useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { PageUI } from './ui';
import { alphabet } from '../../Constants/alphabet';
import { checkForWords, validateWord, checkWordExistence } from '../../Utils/words';
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
  const [copied, setCopied] = useState(false);
  const [missedGuesses, setMissedGuesses] = useState(0);
  const [copyImage, setCopyImage] = useState(null);
  const [newlyUsedLetters, setNewlyUsedLetters] = useState(null);
  const windowWidth = window.innerWidth;
  const notMobile = !!windowWidth && windowWidth > 1025;
  const startDate = new Date('2/20/22').setHours(0, 0, 0, 0);

  useEffect(() => {
    if (
      localStorage.finished === 'true' &&
      localStorage.completedDate &&
      `${new Date().setHours(0, 0, 0, 0)}` !== `${localStorage.completedDate}`
    ) {
      setFinished(false);
      localStorage['score'] = null;
      localStorage['finished'] = null;
      localStorage['time'] = null;
      localStorage['words'] = null;
      localStorage['completedDate'] = null;
      const days = (new Date().setHours(0, 0, 0, 0) - startDate) / (1000 * 60 * 60 * 24);
      const wordToUse = wordsToUse[days];
      setUsedWords([wordToUse]);
      setUsedLetters([...new Set(wordToUse.split(''))]);
    } else if (finished === false && localStorage.finished === 'true') {
      setFinished(true);
      setTimeTaken(localStorage.time);
      setUsedLetters(Array(parseInt(localStorage.score)).fill('A'));
      setUsedWords(localStorage.words.split(','));
      handleCreateImage();
    } else if (
      usedWords.length === 0 &&
      (localStorage.finished === 'false' || !localStorage.finished)
    ) {
      const days = (new Date().setHours(0, 0, 0, 0) - startDate) / (1000 * 60 * 60 * 24);
      const wordToUse = wordsToUse[days];
      setUsedWords([wordToUse]);
      setUsedLetters([...new Set(wordToUse.split(''))]);
    }
  });

  const copyToClipboard = () => {
    navigator.clipboard.write([
      // eslint-disable-next-line no-undef
      new ClipboardItem({
        'image/png': copyImage
      })
    ]);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleCreateImage = () => {
    const node = document.getElementById('shareImage');
    node.style.display = 'block';
    toPng(node)
      .then((dataUrl) => {
        node.style.display = 'none';
        fetch(dataUrl).then((res) => {
          //eslint-disable-next-line
          setCopyImage(res.blob());
        });
      })
      .catch((e) => console.log(e));
  };

  const handleCreateImageDesktop = () => {
    const node = document.getElementById('shareImage');
    node.style.display = 'block';
    toPng(node)
      .then((dataUrl) => {
        node.style.display = 'none';
        fetch(dataUrl).then((res) => {
          //eslint-disable-next-line
          const data = [new ClipboardItem({ 'image/png': res.blob() })];
          navigator.clipboard
            .write(data)
            .then(() => {
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            })
            .catch((e) => console.log(e));
        });
      })
      .catch((e) => console.log(e));
  };

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
      checkIfCanAdd();
    }
  };

  const endTime = () => {
    const endTime = new Date();
    const ms = endTime - startTime;
    const min = Math.floor((ms / 1000 / 60) << 0);
    const sec = Math.floor((ms / 1000) % 60);
    const seconds = sec < 10 ? `0${sec}` : sec;
    const timeString = `${min}:${seconds}`;
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
    document.getElementById('textInput').blur();
    localStorage['score'] = usedLetters.length;
    localStorage['finished'] = true;
    localStorage['time'] = gameTime;
    localStorage['words'] = usedWords;
    localStorage['completedDate'] = new Date().setHours(0, 0, 0, 0);
    setFinished(true);
    !notMobile && handleCreateImage();
  };

  const checkIfCanAdd = () => {
    const isWord = checkWordExistence(currentWord);
    if (!isWord) {
      setValid(false);
      if (missedGuesses === 2) {
        finishGame();
      }
      setMissedGuesses(missedGuesses + 1);
    } else {
      addWord();
    }
  };

  const addWord = () => {
    document.getElementById('textInput').focus();
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
    <>
      <div
        style={{
          display: 'none',
          borderRadius: '10px',
          width: '120px',
          height: '120px',
          backgroundColor: '#002f5b'
        }}
        id="shareImage">
        <div style={{ marginTop: '10px' }}>
          <p
            style={{
              paddingTop: '10px',
              paddingLeft: '6px',
              paddingBottom: '10px',
              color: '#fff',
              fontSize: '8px',
              borderBottom: '1px solid #fff'
            }}>
            letterladdergame.com
          </p>
          <p style={{ paddingLeft: '6px', marginTop: '10px', color: '#fff', fontSize: '8px' }}>
            LEVEL: {usedLetters.length}
          </p>
          <p style={{ paddingLeft: '6px', marginTop: '10px', color: '#fff', fontSize: '8px' }}>
            TIME: {timeTaken}
          </p>
          <p style={{ paddingLeft: '6px', marginTop: '10px', color: '#fff', fontSize: '8px' }}>
            DATE:{' '}
            {new Date().toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
      <PageUI
        finished={finished}
        handleEnter={handleEnter}
        valid={valid}
        addWord={checkIfCanAdd}
        usedLetters={usedLetters}
        usedWords={usedWords}
        currentWord={currentWord}
        handleWordChange={handleWordChange}
        rulesOpen={rulesOpen}
        setRulesOpen={setRulesOpen}
        notMobile={notMobile}
        timeTaken={timeTaken}
        newlyUsedLetters={newlyUsedLetters}
        shareLink={notMobile ? handleCreateImageDesktop : copyToClipboard}
        copied={copied}
        missedGuesses={missedGuesses}
      />
    </>
  );
};

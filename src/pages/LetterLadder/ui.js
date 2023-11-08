import React from 'react';
import { Alphabet, RulesModal, CompleteModal } from '../../Components';
import { styles } from './styles';

export const LetterLadderUI = ({
  handleWordChange,
  currentWord,
  usedWords,
  addWord,
  usedLetters,
  valid,
  handleEnter,
  finished,
  rulesOpen,
  setRulesOpen,
  notMobile,
  timeTaken,
  newlyUsedLetters,
  shareLink,
  copied,
  missedGuesses
}) => {
  return (
    <div style={notMobile ? styles.page : styles.mobilePage}>
      <div style={styles.header}>
        <p style={notMobile ? styles.letterLadder : styles.mobileLetterLadder}>LETTER LADDER</p>
        <div style={styles.headerButtons}>
          <button
            style={notMobile ? styles.rulesButton : styles.mobileRulesButton}
            onClick={() => setRulesOpen(true)}>
            RULES
          </button>
        </div>
      </div>
      <Alphabet
        newlyUsedLetters={newlyUsedLetters}
        usedLetters={usedLetters}
        notMobile={notMobile}
      />
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          spellCheck={true}
          onKeyDown={handleEnter}
          autoFocus="autoFocus"
          onChange={handleWordChange}
          value={currentWord}
          id="textInput"
        />
        <button
          style={!valid ? styles.disabledAddButton : styles.addButton}
          disabled={!valid}
          onClick={addWord}>
          ADD WORD
        </button>
      </div>
      <div style={styles.levelContainer}>
        <p style={styles.score}>{`LEVEL: ${usedLetters.length}`}</p>
        <p style={styles.score}>{`MISSES LEFT: ${3 - missedGuesses}`}</p>
      </div>
      {usedWords.map((word, index) => {
        return (
          <div style={styles.wordsContainer} key={word}>
            <p
              style={
                index === 0
                  ? styles.lastWord
                  : notMobile
                  ? styles.usedWords
                  : styles.mobileUsedWords
              }
              key={word}>
              {word.toUpperCase()}
            </p>
          </div>
        );
      })}

      {finished && (
        <CompleteModal
          copied={copied}
          usedLetters={usedLetters}
          usedWords={usedWords}
          timeTaken={timeTaken}
          notMobile={notMobile}
          shareLink={shareLink}
        />
      )}
      {rulesOpen && <RulesModal notMobile={notMobile} setRulesOpen={setRulesOpen} />}
    </div>
  );
};

import React from 'react';
import { Alphabet, RulesModal, CompleteModal } from '../';
import { styles } from './styles';

export const PageUI = ({
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
  finishGame
}) => {
  return (
    <div style={notMobile ? styles.page : styles.mobilePage}>
      <div style={styles.header}>
        <p style={styles.letterLadder}>LETTER LADDER</p>
        <div style={styles.headerButtons}>
          <button style={styles.rulesButton} onClick={() => setRulesOpen(true)}>
            RULES
          </button>
          <button style={styles.rulesButton} onClick={finishGame}>
            GIVE UP
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
          onBlur={({ target }) => target.focus()}
        />
        <button
          style={!valid ? styles.disabledAddButton : styles.addButton}
          disabled={!valid}
          onClick={addWord}>
          ADD WORD
        </button>
      </div>
      <p style={styles.score}>{`LEVEL: ${usedLetters.length}`}</p>

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
          usedLetters={usedLetters}
          usedWords={usedWords}
          timeTaken={timeTaken}
          notMobile={notMobile}
        />
      )}
      {rulesOpen && <RulesModal notMobile={notMobile} setRulesOpen={setRulesOpen} />}
    </div>
  );
};

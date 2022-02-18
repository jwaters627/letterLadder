import { Alphabet } from '../';
import { RulesModal } from '../';
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
  mobile,
  timeTaken,
  newlyUsedLetters,
  finishGame
}) => {
  return (
    <div style={mobile ? styles.mobilePage : styles.page}>
      <div style={styles.header}>
        <button style={styles.rulesButton} onClick={() => setRulesOpen(true)}>
          RULES
        </button>
        <button style={styles.rulesButton} onClick={finishGame}>
          GIVE UP
        </button>
      </div>
      <Alphabet newlyUsedLetters={newlyUsedLetters} usedLetters={usedLetters} mobile={mobile} />
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
      <div style={styles.ladderSection}>
        <p style={styles.score}>{`LEVEL: ${usedLetters.length}`}</p>
        <div style={styles.wordContainer}>
          {usedWords.map((word, index) => {
            return (
              <div key={word}>
                <p style={index === 0 ? styles.lastWord : styles.usedWords} key={word}>
                  {word.toUpperCase()}
                </p>
              </div>
            );
          })}
        </div>
        <div style={styles.placeholder}></div>
      </div>
      {finished && (
        <div style={styles.overlay}>
          <p>SCORE: {usedLetters.length}</p>
          <p>TIME TAKEN: {timeTaken}</p>
          {usedWords.map((word) => {
            return <p key={word}>{word}</p>;
          })}
        </div>
      )}
      {rulesOpen && <RulesModal mobile={mobile} setRulesOpen={setRulesOpen} />}
    </div>
  );
};

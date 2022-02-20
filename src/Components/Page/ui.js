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
      <p style={styles.score}>{`LEVEL: ${usedLetters.length}`}</p>

      {usedWords.map((word, index) => {
        return (
          <div key={word}>
            <p
              style={
                index === 0 ? styles.lastWord : mobile ? styles.mobileUsedWords : styles.usedWords
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
          mobile={mobile}
        />
      )}
      {rulesOpen && <RulesModal mobile={mobile} setRulesOpen={setRulesOpen} />}
    </div>
  );
};

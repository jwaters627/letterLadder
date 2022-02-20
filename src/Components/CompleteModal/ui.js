import { styles } from './styles';

export const CompleteModalUI = ({ mobile, usedLetters, usedWords, timeTaken }) => {
  return (
    <div style={styles.fullPage}>
      <div style={mobile ? styles.mobileModalContainer : styles.modalContainer}>
        <p style={styles.score}>LEVEL: {usedLetters.length}</p>
        <p style={styles.time}>TIME TAKEN: {timeTaken}</p>
        {usedWords.map((word) => {
          return (
            <p style={styles.usedWords} key={word}>
              {word}
            </p>
          );
        })}
      </div>
    </div>
  );
};

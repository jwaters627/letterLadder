import { alphabet } from '../../Constants/alphabet';
import { styles } from './styles';

export const AlphabetUI = ({ usedLetters, mobile, newlyUsedLetters }) => {
  return (
    <div style={styles.container}>
      {alphabet.map((letter) => {
        return !usedLetters.includes(letter) ? (
          <p
            style={
              (newlyUsedLetters || []).includes(letter) && mobile
                ? styles.redLetterMobile
                : mobile
                ? styles.mobileLetters
                : (newlyUsedLetters || []).includes(letter)
                ? styles.redLetter
                : styles.letters
            }>
            {letter}
          </p>
        ) : (
          <p style={mobile ? styles.mobileUsedLetters : styles.usedLetters}>{letter}</p>
        );
      })}
    </div>
  );
};

import React from 'react';
import { alphabet } from '../../Constants/alphabet';
import { styles } from './styles';

export const AlphabetUI = ({ usedLetters, mobile, newlyUsedLetters }) => {
  return (
    <div style={styles.container}>
      {alphabet.map((letter) => {
        return !usedLetters.includes(letter) ? (
          <p
            key={letter}
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
          <p key={letter} style={mobile ? styles.mobileUsedLetters : styles.usedLetters}>
            {letter}
          </p>
        );
      })}
    </div>
  );
};

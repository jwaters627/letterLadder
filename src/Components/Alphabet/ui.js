import React from 'react';
import { alphabet } from '../../Constants/alphabet';
import { styles } from './styles';

export const AlphabetUI = ({ usedLetters, notMobile, newlyUsedLetters }) => {
  return (
    <div style={styles.container}>
      {alphabet.map((letter) => {
        return !usedLetters.includes(letter) ? (
          <p
            key={letter}
            style={
              (newlyUsedLetters || []).includes(letter) && notMobile
                ? styles.redLetter
                : notMobile
                ? styles.letters
                : (newlyUsedLetters || []).includes(letter)
                ? styles.redLetterMobile
                : styles.mobileLetters
            }>
            {letter}
          </p>
        ) : (
          <p key={letter} style={notMobile ? styles.usedLetters : styles.mobileUsedLetters}>
            {letter}
          </p>
        );
      })}
    </div>
  );
};

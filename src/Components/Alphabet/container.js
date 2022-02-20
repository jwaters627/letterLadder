import React from 'react';
import { AlphabetUI } from './ui';

export const Alphabet = ({ usedLetters, notMobile, newlyUsedLetters }) => {
  return (
    <AlphabetUI
      usedLetters={usedLetters}
      newlyUsedLetters={newlyUsedLetters}
      notMobile={notMobile}
    />
  );
};

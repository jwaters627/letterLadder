import React from 'react';
import { CompleteModalUI } from './ui';

export const CompleteModal = ({ timeTaken, usedLetters, usedWords, notMobile }) => {
  return (
    <CompleteModalUI
      notMobile={notMobile}
      usedLetters={usedLetters}
      usedWords={usedWords}
      timeTaken={timeTaken}
    />
  );
};

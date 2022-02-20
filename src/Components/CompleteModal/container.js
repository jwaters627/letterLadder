import React from 'react';
import { CompleteModalUI } from './ui';

export const CompleteModal = ({ timeTaken, usedLetters, usedWords, mobile }) => {
  return (
    <CompleteModalUI
      mobile={mobile}
      usedLetters={usedLetters}
      usedWords={usedWords}
      timeTaken={timeTaken}
    />
  );
};

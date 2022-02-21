import React from 'react';
import { CompleteModalUI } from './ui';

export const CompleteModal = ({
  copied,
  timeTaken,
  usedLetters,
  usedWords,
  notMobile,
  shareLink
}) => {
  return (
    <CompleteModalUI
      copied={copied}
      notMobile={notMobile}
      usedLetters={usedLetters}
      usedWords={usedWords}
      timeTaken={timeTaken}
      shareLink={shareLink}
    />
  );
};

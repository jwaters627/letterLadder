import React from 'react';
import { styles } from './styles';

export const CompleteModalUI = ({
  copied,
  notMobile,
  usedLetters,
  usedWords,
  timeTaken,
  shareLink
}) => {
  return (
    <div style={styles.fullPage}>
      <div style={notMobile ? styles.modalContainer : styles.mobileModalContainer}>
        <div style={{ height: '36px' }}>
          {copied ? (
            <p style={styles.copiedText}>Copied!</p>
          ) : (
            <button style={styles.shareButton} onClick={shareLink}>
              <svg
                color={'#fff'}
                height={'18px'}
                width={'18px'}
                viewBox={`0 0 ${'24px'} ${'24px'}`}>
                <path
                  d="M13.25 1.35a2.65 2.65 0 11-2.06 4.319L7.36 8.542a2.669 2.669 0 010 .916l3.83 2.873a2.65 2.65 0 11-.552 1.211L6.81 10.67a2.65 2.65 0 110-3.337l3.83-2.874a2.65 2.65 0 012.61-3.108zm0 11.3a1.35 1.35 0 10-.001 2.699 1.35 1.35 0 00.001-2.699zm-8.5-5a1.35 1.35 0 10-.001 2.699A1.35 1.35 0 004.75 7.65zm8.5-5a1.35 1.35 0 10-.001 2.699 1.35 1.35 0 00.001-2.699z"
                  fill={'#fff'}
                  fillRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
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

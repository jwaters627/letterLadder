import React from 'react';
import { styles } from './styles';

export const RulesModalUI = ({ setRulesOpen, notMobile }) => {
  return (
    <div style={styles.fullPage}>
      <div style={notMobile ? styles.modalContainer : styles.mobileModalContainer}>
        <button
          style={notMobile ? styles.closeButton : styles.closeButtonMobile}
          onClick={() => setRulesOpen(false)}>
          x
        </button>
        <p style={styles.objectiveText}>
          Objective: Get to level 26 by creating new words from the letters in the previous word
          plus one new letter in each move. Each letter used counts as a level (you will start at
          the level of number of unique letters in the starting word).
        </p>
        <ul style={styles.list}>
          <li>
            <p>Create a new word using the letters from the previous word plus one new letter</p>
          </li>
          <li>
            <p>You MUST use one and only one new letter</p>
          </li>
          <li>
            <p>You do not need to use all the letters from the previous word</p>
          </li>
          <li>
            <p>Once you drop a letter it is gone</p>
          </li>
          <li>
            <p>Words must be at least 3 letters long</p>
          </li>
          <li>
            <p>
              You must add real words. If you try to add something that is not a valid word 3 times
              then your game is over
            </p>
          </li>
        </ul>
        <p style={styles.objectiveText}>
          Send any questions, concerns or found bugs to{' '}
          <a style={styles.emailLink} href="mailto: letterladdergame@gmail.com">
            letterladdergame@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

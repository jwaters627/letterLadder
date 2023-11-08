import React from 'react';
import { styles } from './styles';

export const StartModal = ({ startGame }) => {
  return (
    <div style={styles.fullPage}>
      <div style={styles.modalContainer}>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

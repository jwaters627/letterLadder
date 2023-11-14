import React from 'react';
import { styles } from './styles';

export const StartModal = ({ startGame, resetGame, totalScore, words, timeLeft }) => {
  console.log(timeLeft, words, totalScore);
  return (
    <div style={styles.fullPage}>
      <div style={styles.modalContainer}>
        {timeLeft === 0 ? (
          <button style={styles.actionButton} onClick={resetGame}>
            Reset Game
          </button>
        ) : (
          <button style={styles.actionButton} onClick={startGame}>
            Start Game
          </button>
        )}
        {words.length > 0 && (
          <div>
            <p style={styles.totalText}>Total: {totalScore}</p>
            <p style={styles.wordsHeadingText}>Words</p>
            {words.map((word) => {
              return <p style={styles.words} key={word.word}>{`${word.word} (${word.score})`}</p>;
            })}
          </div>
        )}
        <p style={styles.rulesText}>RULES:</p>
        <ul>
          <li>Make as many words as you can by using the letters around the edge</li>
          <li>You cannot use two letters in a row from the same side</li>
          <li>
            The score for each word is determined by the number of intersections created by your
            word
          </li>
          <li>
            You gain time as you get words. The more intersections in a word the more time you gain
            (1 second for 1 intersection, 2 seconds for 2 intersections, 3 seconds for 3
            intersections, 5 seconds for 4 intersections, and 10 seconds for any word with more than
            4 intersections)
          </li>
        </ul>
      </div>
    </div>
  );
};

import { AlphabetUI } from './ui';

export const Alphabet = ({ usedLetters, mobile, newlyUsedLetters }) => {
  return (
    <AlphabetUI usedLetters={usedLetters} newlyUsedLetters={newlyUsedLetters} mobile={mobile} />
  );
};

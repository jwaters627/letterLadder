import { styles } from './styles';

export const RulesModalUI = ({ setRulesOpen, mobile }) => {
  return (
    <div style={styles.fullPage}>
      <div style={mobile ? styles.mobileModalContainer : styles.modalContainer}>
        <button style={styles.closeButton} onClick={() => setRulesOpen(false)}>
          x
        </button>
        <ul style={styles.list}>
          <li>
            <p>Create a new word using the previous word plus one new letter</p>
          </li>
          <li>
            <p>You MUST use one and only one new letter</p>
          </li>
          <li>
            <p>You do not need to use all the letters from the previous word</p>
          </li>
          <li>
            <p>Words must be at least 3 letters long</p>
          </li>
          <li>
            <p>Try to eliminate all letters of the alphabet</p>
          </li>
          <li>
            <p>Your score will be the number of letters you have been able to use</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

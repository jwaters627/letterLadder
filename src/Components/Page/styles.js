export const styles = {
  body: {
    fontFamily: 'Helvetica'
  },
  page: {
    width: '60%',
    marginLeft: '20%',
    backgroundColor: '#002f5b',
    height: '100vh',
    verticalAlign: 'center'
  },
  mobilePage: {
    width: '100vw',
    backgroundColor: '#002f5b',
    minHeight: '100vh',
    marginLeft: '0'
  },
  input: {
    fontSize: '18px',
    height: '24px',
    outline: 'none'
  },
  header: {
    backgroundColor: '#89cff0',
    paddingLeft: '18px',
    paddingRight: '18px',
    marginBottom: '18px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  wordsContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  letterLadder: { fontSize: '18px', fontWeight: '700', color: '#002f5b' },
  mobileLetterLadder: { fontSize: '12px', fontWeight: '700', color: '#002f5b' },
  headerButtons: {
    display: 'flex'
  },
  rulesButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '700',
    color: '#002f5b',
    textDecoration: 'underline'
  },
  mobileRulesButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '700',
    color: '#002f5b',
    textDecoration: 'underline'
  },
  usedWords: {
    color: '#fff',
    fontSize: '14px',
    marginBottom: '4px',
    marginTop: '4px'
  },
  mobileUsedWords: {
    color: '#fff',
    fontSize: '12px',
    marginTop: '4px',
    marginBottom: '4px'
  },
  lastWord: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '32px',
    marginTop: 0,
    marginBottom: '8px'
  },
  addButton: {
    borderRadius: '0',
    backgroundColor: '#fff',
    height: '28px',
    border: 'none',
    fontWeight: '700',
    color: '#002f5b',
    cursor: 'pointer'
  },
  disabledAddButton: {
    borderRadius: '0',
    backgroundColor: '#fff',
    height: '28px',
    border: 'none',
    fontWeight: '700',
    opacity: '0.3'
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '12px'
  },
  score: {
    color: '#fff',
    alignItems: 'start',
    textAlign: 'left',
    paddingLeft: '18px',
    marginBottom: 0
  },
  levelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    paddingRight: '30px',
    marginBottom: '24px'
  }
};

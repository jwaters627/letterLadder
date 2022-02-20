export const styles = {
  fullPage: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    backgroundColor: `rgba(0,0,0,0.7)`
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '50%',
    height: '92vh',
    marginLeft: '25%',
    marginTop: '18px',
    position: 'absolute',
    padding: '18px',
    overFlow: 'scroll'
  },
  mobileModalContainer: {
    backgroundColor: '#fff',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    padding: '8px',
    paddingTop: '24px'
  },
  score: {
    color: '#002f5b',
    fontWeight: '700'
  },
  time: {
    color: '#002f5b',
    fontWeight: '700',
    paddingBottom: '18px',
    borderBottom: `1px solid ${'#002f5b'}`
  },
  usedWords: {
    fontSize: '14px',
    marginTop: '4px',
    marginBottom: '4px'
  }
};

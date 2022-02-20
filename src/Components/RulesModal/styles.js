export const styles = {
  fullPage: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    backgroundColor: `rgba(0,0,0,0.7)`,
    zIndex: '9999999'
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '50%',
    height: '400px',
    marginLeft: '25%',
    marginTop: '100px',
    position: 'absolute',
    padding: '18px'
  },
  mobileModalContainer: {
    backgroundColor: '#fff',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    padding: '8px',
    paddingTop: '24px'
  },
  list: {
    textAlign: 'left',
    marginTop: '48px',
    wordWrap: 'break-word',
    paddingLeft: '18px',
    paddingRight: '18px'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontWeight: 700,
    fontSize: '24px',
    position: 'absolute',
    top: '8px',
    right: '8px',
    cursor: 'pointer'
  },
  closeButtonMobile: {
    background: 'none',
    border: 'none',
    fontWeight: 700,
    fontSize: '18px',
    position: 'absolute',
    top: '18px',
    right: '24px',
    cursor: 'pointer'
  }
};

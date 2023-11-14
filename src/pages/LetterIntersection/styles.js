export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px'
  },
  grid: {
    marginBottom: '20px',
    position: 'relative'
  },
  wordSubmit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    marginTop: '10px',
    cursor: 'pointer'
  },

  buttonsContainer: {
    display: 'flex',
    marginTop: '12px'
  },
  gameButtons: {
    marginLeft: '4px',
    marginRight: '4px',
    backgroundColor: 'lightblue',
    color: 'slategray',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  timer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '100px',
    color: 'rgb(65, 105, 225, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '10px',
    borderRadius: '10px'
  },
  submitButton: {
    backgroundColor: 'royalblue',
    color: 'white',
    padding: '12px 40px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%'
  },
  disabledButton: {
    backgroundColor: 'lightgrey',
    color: 'grey',
    padding: '12px 40px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'unset',
    width: '100%'
  },
  totalScoreText: {
    margin: '0',
    marginTop: '8px'
  }
};

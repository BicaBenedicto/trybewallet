const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_EMAIL':
    return (
      {
        email: action.value,
      }
    );
  default:
    return state;
  }
};

export default user;

// Esse reducer será responsável por tratar as informações da pessoa usuária

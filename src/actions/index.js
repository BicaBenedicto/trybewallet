// Coloque aqui suas actions
const LOGIN_EMAIL = 'LOGIN_EMAIL';
const ADD_WALLET_ITEM = 'ADD_WALLET_ITEM';

export const loginEnter = (value) => (
  {
    type: LOGIN_EMAIL,
    value,
  });

export const addWalletItem = (item) => (
  {
    type: ADD_WALLET_ITEM,
    item,
  }
);

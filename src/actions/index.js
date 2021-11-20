// Coloque aqui suas actions
const LOGIN_EMAIL = 'LOGIN_EMAIL';
const ADD_WALLET_ITEM = 'ADD_WALLET_ITEM';
const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const loginEnter = (value) => (
  {
    type: LOGIN_EMAIL,
    value,
  });

export const addWalletItem = (expense) => (
  {
    type: ADD_WALLET_ITEM,
    expense,
  }
);

export const addCurrencies = (items) => (
  {
    type: ADD_CURRENCIES,
    items,
  }
);

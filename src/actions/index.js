// Coloque aqui suas actions
const LOGIN_EMAIL = 'LOGIN_EMAIL';
const ADD_WALLET_ITEM = 'ADD_WALLET_ITEM';
const ADD_CURRENCIES = 'ADD_CURRENCIES';
const CHANGE_WALLET_ITEM = 'CHANGE_WALLET_ITEM';

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

export const changeWalletItem = (expenses) => (
  {
    type: CHANGE_WALLET_ITEM,
    expenses,
  }
);

export const addCurrencies = (items) => (
  {
    type: ADD_CURRENCIES,
    items,
  }
);

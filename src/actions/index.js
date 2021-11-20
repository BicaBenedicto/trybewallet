// Coloque aqui suas actions
const LOGIN_EMAIL = 'LOGIN_EMAIL';
const ADD_WALLET_ITEM = 'ADD_WALLET_ITEM';
const ADD_CURRENCIES = 'ADD_CURRENCIES';
const DEL_WALLET_ITEM = 'DEL_WALLET_ITEM';

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

export const delWalletItem = (id) => (
  {
    type: DEL_WALLET_ITEM,
    id,
  }
);

export const addCurrencies = (items) => (
  {
    type: ADD_CURRENCIES,
    items,
  }
);

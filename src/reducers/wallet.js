const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_WALLET_ITEM':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case 'ADD_CURRENCIES':
    return {
      ...state,
      currencies: Object.keys(action.items),
    };
  case 'CHANGE_WALLET_ITEM':
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default walletReducer;

// Esse reducer será responsável por tratar as informações da pessoa usuária
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

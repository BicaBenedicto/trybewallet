const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_WALLET_ITEM':
    return {
      currencies: [...state.currencies, action.item],
    };
  default:
    return state;
  }
};

export default walletReducer;

// Esse reducer será responsável por tratar as informações da pessoa usuária
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

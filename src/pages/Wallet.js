import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletEditInfo from './WalletEdit/WalletEditInfo';
import ExpensesTable from './ExpensesTable';
import fetchAPI from '../fetchAPI';
import { delWalletItem, addCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      hasEditMode: false,
      currenctActual: 'BRL',
      expenseActualObject: {
        id: 0,
        value: '0',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: {},
      },
    };

    this.getCurrencyTypes = this.getCurrencyTypes.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.verifyExchangeRates = this.verifyExchangeRates.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderWalletInfo = this.renderWalletInfo.bind(this);
    this.addStateIdNumber = this.addStateIdNumber.bind(this);
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
    this.addStateEditable = this.addStateEditable.bind(this);
  }

  getInitialState() {
    this.setState((prevState) => ({
      expenseActualObject: {
        ...prevState.expenseActualObject,
        value: '0',
        description: '',
      },
    }));
  }

  componentDidMount() {
    this.verifyExchangeRates();
  }

  onEditButtonClick() {
    const { expenseActualObject } = this.state;
    const { removeItem, expenses } = this.props;
    const newExpenses = expenses
      .map((exp) => (Number(exp.id !== expenseActualObject.id)
        ? exp : expenseActualObject));
    removeItem(newExpenses);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState((prevState) => ({
      expenseActualObject: {
        ...prevState.expenseActualObject,
        [name]: value,
      },
    }));
  }

  getCurrencyTypes() {
    const { currencies } = this.props;
    return currencies.filter((currency) => currency !== 'USDT')
      .concat('BRL').map((currency, index) => (
        <option key={ index } value={ currency } data-testid={ currency }>
          {currency}
        </option>));
  }

  addStateIdNumber(id) {
    this.setState((prevState) => ({
      expenseActualObject: {
        ...prevState.expenseActualObject,
        id: Number(id),
      },
    }));
  }

  toggleEditMode(e) {
    e.preventDefault();
    const { name } = e.target;
    this.addStateEditable(name);
    const { hasEditMode } = this.state;
    if (!hasEditMode) {
      this.setState((prevState) => ({
        hasEditMode: !prevState.hasEditMode,
      }));
    } else {
      this.onEditButtonClick(name);
      this.setState((prevState) => ({
        hasEditMode: !prevState.hasEditMode,
      }));
    }
    this.verifyExchangeRates();
  }

  addStateEditable(id) { // Ideia dada por Carolina Pereira, OBRIGADUUUUUUUU
    const { expenses } = this.props;
    const restoreExpense = expenses.find((expense) => expense.id === Number(id));
    this.setState((prevState) => ({
      expenseActualObject: {
        ...prevState.expenseActualObject,
        ...restoreExpense,
      },
    }));
  }

  async verifyExchangeRates() {
    const { saveCurrencies } = this.props;
    const response = await fetchAPI();
    this.setState((prevState) => ({
      expenseActualObject: {
        ...prevState.expenseActualObject,
        exchangeRates: response,
      },
    }));
    const currenciesType = response;
    saveCurrencies(currenciesType);
  }

  renderWalletInfo() {
    const { hasEditMode, expenseActualObject } = this.state;

    return (
      <WalletEditInfo
        hasEditMode={ hasEditMode }
        toggleEditMode={ this.toggleEditMode }
        getInitialState={ this.getInitialState }
        verifyExchangeRates={ this.verifyExchangeRates }
        onInputChange={ this.onInputChange }
        expenseActualObject={ expenseActualObject }
        addStateIdNumber={ this.addStateIdNumber }
      />
    );
  }

  render() {
    const { email, expenses } = this.props;
    const { currenctActual } = this.state;
    const DECIMAL_NUMBER = 2;
    let totalField = 0;
    expenses.forEach((exp) => {
      totalField += Number(exp.value * (exp.exchangeRates[exp.currency].ask));
    });
    return (
      <section>
        <header>
          <h1>
            TrybeWallet
          </h1>
          <h3 data-testid="email-field">
            {email}
          </h3>
        </header>
        { this.renderWalletInfo() }
        <div>
          <div>
            <span>Valor:</span>
            <span data-testid="total-field">{ totalField.toFixed(DECIMAL_NUMBER) }</span>
          </div>
          <div>
            <label htmlFor="currency-convert">
              Cambio:
              <select
                id="currency-convert"
                data-testid="header-currency-field"
                value={ currenctActual }
              >
                { this.getCurrencyTypes() }
              </select>
            </label>
          </div>
        </div>
        <ExpensesTable
          currency={ currenctActual }
          toggleEditMode={ this.toggleEditMode }
        />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: (items) => dispatch(addCurrencies(items)),
  removeItem: (expenses) => dispatch(delWalletItem(expenses)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletEditInfo from './WalletEdit/WalletEditInfo';
import ExpensesTable from './ExpensesTable';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      currenctActual: 'BRL',
    };

    this.getCurrencyTypes = this.getCurrencyTypes.bind(this);
  }

  getCurrencyTypes() {
    const { currencies } = this.props;
    return currencies.filter((currency) => currency !== 'USDT')
      .concat('BRL').map((currency, index) => (
        <option key={ index } value={ currency } data-testid={ currency }>
          {currency}
        </option>));
  }

  render() {
    const { email, expenses } = this.props;
    const { currenctActual } = this.state;
    const DECIMAL_NUMBER = 2;
    let totalField = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      totalField += Number(value * (exchangeRates[currency].ask));
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
        <WalletEditInfo />
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
        <ExpensesTable currency={ currenctActual } />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Wallet);

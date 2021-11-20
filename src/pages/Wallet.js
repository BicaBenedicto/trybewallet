import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletEditInfo from './WalletEdit/WalletEditInfo';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: 'BRL',
      value: 0,
    };

    this.checkActualValue = this.checkActualValue.bind(this);
  }

  checkActualValue() {
    const { expenses } = this.props;
    const sumValue = ((expenses.length !== 0) ? expenses
      .map(({ value, currency, exchangeRates }) => (
        Number(value * (exchangeRates[currency].ask))
      )) : 0).reduce((acc, value) => acc + value);

    this.setState({
      value: sumValue,
    });
  }

  render() {
    const { email } = this.props;
    const { currency, value } = this.state;
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
        <WalletEditInfo checkActualValue={ this.checkActualValue } />
        <div>
          <div>
            <span>Valor:</span>
            <span data-testid="total-field">{value}</span>
          </div>
          <div>
            <span>Cambio:</span>
            <span data-testid="header-currency-field">{currency}</span>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Wallet);

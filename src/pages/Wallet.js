import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: 'BRL',
      value: 0,
    };
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
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);

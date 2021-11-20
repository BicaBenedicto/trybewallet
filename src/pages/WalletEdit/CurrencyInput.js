import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CurrencyInput extends React.Component {
  constructor() {
    super();

    this.getCurrencyTypes = this.getCurrencyTypes.bind(this);
  }

  getCurrencyTypes() {
    const { currencies } = this.props;
    return currencies.map((currency, index) => (
      <option key={ index } value={ currency }>
        {currency}
      </option>));
  }

  render() {
    const { currency, onInputChange } = this.props;
    return (
      <label htmlFor="currency-input">
        Cambio:
        <select
          id="currency-input"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ onInputChange }
        >
          {this.getCurrencyTypes()}
        </select>
      </label>
    );
  }
}

CurrencyInput.propTypes = {
  currency: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(CurrencyInput);

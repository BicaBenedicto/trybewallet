import React from 'react';
import PropTypes from 'prop-types';

class CurrencyInput extends React.Component {
  render() {
    const { currency, onInputChange } = this.props;
    return (
      <label htmlFor="currency-input">
        Cambio:
        <input
          id="currency-input"
          data-testid="currency-input"
          type="text"
          name="currency"
          value={ currency }
          onChange={ onInputChange }
        />
      </label>
    );
  }
}

CurrencyInput.propTypes = {
  currency: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default CurrencyInput;

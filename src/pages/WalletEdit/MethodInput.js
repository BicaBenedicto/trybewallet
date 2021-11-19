import React from 'react';
import PropTypes from 'prop-types';

class MethodInput extends React.Component {
  render() {
    const { method, onInputChange } = this.props;
    return (
      <label htmlFor="method-input">
        Forma de pagamento:
        <select
          id="method-input"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ onInputChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

MethodInput.propTypes = {
  method: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default MethodInput;

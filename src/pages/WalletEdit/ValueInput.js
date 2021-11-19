import React from 'react';
import PropTypes from 'prop-types';

class ValueInput extends React.Component {
  render() {
    const { value, onInputChange } = this.props;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          id="value-input"
          data-testid="value-input"
          type="text"
          name="value"
          value={ value }
          onChange={ onInputChange }
        />
      </label>
    );
  }
}

ValueInput.propTypes = {
  value: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
};

ValueInput.defaultProps = {
  value: '0',
};

export default ValueInput;

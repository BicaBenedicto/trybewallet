import React from 'react';
import PropTypes from 'prop-types';

class DescriptionInput extends React.Component {
  render() {
    const { description, onInputChange } = this.props;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          id="description-input"
          data-testid="description-input"
          type="text"
          name="description"
          value={ description }
          onChange={ onInputChange }
        />
      </label>
    );
  }
}

DescriptionInput.propTypes = {
  description: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default DescriptionInput;

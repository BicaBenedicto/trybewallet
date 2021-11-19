import React from 'react';
import PropTypes from 'prop-types';

class TagInput extends React.Component {
  render() {
    const { tag, onInputChange } = this.props;
    return (
      <label htmlFor="tag-input">
        Categoria:
        <select
          id="tag-input"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ onInputChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

TagInput.propTypes = {
  tag: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default TagInput;

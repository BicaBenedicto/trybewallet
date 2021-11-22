import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWalletItem } from '../../actions';
import CurrencyInput from './CurrencyInput';
import DescriptionInput from './DescriptionInput';
import MethodInput from './MethodInput';
import TagInput from './TagInput';
import ValueInput from './ValueInput';

class WalletEditInfo extends React.Component {
  constructor() {
    super();

    this.onButtonClick = this.onButtonClick.bind(this);
    this.saveWalletItemInStore = this.saveWalletItemInStore.bind(this);
  }

  async onButtonClick(e) {
    e.preventDefault();
    const { expenses, verifyExchangeRates, getInitialState,
      addStateIdNumber } = this.props;
    await verifyExchangeRates();
    if (expenses.length !== 0) {
      const idList = expenses.map((expense) => expense.id);
      const biggerId = Math.max(...idList) + 1;
      addStateIdNumber(biggerId);
    }
    this.saveWalletItemInStore();
    getInitialState();
  }

  saveWalletItemInStore() {
    const { saveWalletItem, expenseActualObject } = this.props;
    saveWalletItem(expenseActualObject);
  }

  render() {
    const { expenseActualObject, onInputChange,
      toggleEditMode, hasEditMode } = this.props;
    const { value, description, currency, method, tag, id } = expenseActualObject;
    return (
      <form>
        <ValueInput
          value={ value }
          onInputChange={ onInputChange }
        />
        <DescriptionInput
          description={ description }
          onInputChange={ onInputChange }
        />
        <CurrencyInput
          currency={ currency }
          onInputChange={ onInputChange }
        />
        <MethodInput
          method={ method }
          onInputChange={ onInputChange }
        />
        <TagInput
          tag={ tag }
          onInputChange={ onInputChange }
        />
        {hasEditMode
          ? (
            <button name={ id } type="submit" onClick={ toggleEditMode }>
              Editar despesas
            </button>
          )
          : (
            <button type="submit" onClick={ this.onButtonClick }>
              Adicionar despesa
            </button>
          )}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveWalletItem: (item) => dispatch(addWalletItem(item)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletEditInfo.propTypes = {
  saveWalletItem: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  verifyExchangeRates: PropTypes.func.isRequired,
  getInitialState: PropTypes.func.isRequired,
  addStateIdNumber: PropTypes.func.isRequired,
  expenseActualObject: PropTypes.shape({
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  hasEditMode: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletEditInfo);

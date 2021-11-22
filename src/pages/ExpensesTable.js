import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delWalletItem } from '../actions';

const INFO_TABLE = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
  'Editar/Excluir'];

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.getItemTable = this.getItemTable.bind(this);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
  }

  onDeleteButtonClick(e) {
    e.preventDefault();
    const { name } = e.target;
    const { removeItem, expenses } = this.props;

    const newExpenses = expenses.filter(({ id }) => id !== Number(name));

    removeItem(newExpenses);
  }

  onEditButtonClick(expense) {
    const { removeItem, expenses } = this.props;
    const newExpenses = expenses.filter((exp) => (expense.id === exp.id ? expense : exp));
    removeItem(newExpenses);
  }

  getTitleTable() {
    return INFO_TABLE.map((item, index) => (
      <th key={ index }>
        {item}
      </th>
    ));
  }

  getItemTable() {
    const { expenses, currency, toggleEditMode } = this.props;
    const DECIMAL_NUMBER = 2;
    return expenses.map((expense) => (
      <tr key={ expense.id }>
        { this.getValuesItems(expense) }
        <td>
          { (expense.currency === 'USD' ? 'Dólar Comercial'
            : expense.exchangeRates[expense.currency].name.split('/')[0]) }
        </td>
        <td>
          { Number(expense.exchangeRates[expense.currency].ask).toFixed(DECIMAL_NUMBER) }
        </td>
        <td>
          { Number(expense.exchangeRates[expense.currency].ask * expense.value)
            .toFixed(DECIMAL_NUMBER) }
        </td>
        <td>
          { (currency === 'BRL' ? 'Real'
            : expense.exchangeRates[currency].name.split('/')[0]) }
        </td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            id="edit-button"
            onClick={ toggleEditMode }
            name={ expense.id }
          >
            Editar
          </button>
          <button
            data-testid="delete-btn"
            type="submit"
            id="delete-button"
            onClick={ this.onDeleteButtonClick }
            name={ expense.id }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  }

  getValuesItems(expense) {
    return (
      <>
        <td>
          { expense.description }
        </td>
        <td>
          { expense.tag }
        </td>
        <td>
          { expense.method }
        </td>
        <td>
          { expense.value }
        </td>
      </>
    );
  }

  render() {
    return (
      <table>
        <tr>
          { this.getTitleTable() }
        </tr>
        { this.getItemTable() }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  expenseItemChange: state.wallet.expenseItemChange,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => dispatch(delWalletItem(id)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.string.isRequired,
  expenseItemChange: PropTypes.shape({
    description: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
  }),
  removeItem: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
};

ExpensesTable.defaultProps = {
  expenses: [],
  expenseItemChange: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

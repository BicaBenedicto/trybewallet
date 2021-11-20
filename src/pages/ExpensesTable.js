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
  }

  onDeleteButtonClick(e) {
    e.preventDefault();
    const { name } = e.target;
    const { removeItem, checkActualValue } = this.props;
    removeItem(name);
    checkActualValue();
  }

  getTitleTable() {
    return INFO_TABLE.map((item, index) => (
      <th key={ index }>
        {item}
      </th>
    ));
  }

  getItemTable() {
    const { expenses, currency } = this.props;
    const DECIMAL_NUMBER = 2;
    return expenses.map((expense) => (
      <tr key={ expense.id } name={ expense.id }>
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
          <button type="button">Editar</button>
          <button
            data-testid="delete-btn"
            type="submit"
            onClick={ this.onDeleteButtonClick }
            name={ expense.id }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table>
        { this.getTitleTable() }
        { this.getItemTable() }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => dispatch(delWalletItem(id)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  checkActualValue: PropTypes.func.isRequired,
};

ExpensesTable.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

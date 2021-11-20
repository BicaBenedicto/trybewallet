import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const INFO_TABLE = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
  'Editar/Excluir'];

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.getItemTable = this.getItemTable.bind(this);
  }

  getTitleTable() {
    return INFO_TABLE.map((item, index) => (
      <th key={ index }>
        {item}
      </th>
    ));
  }

  getItemTable() {
    const { expenses } = this.props;
    return expenses.map((expense) => (
      <tr key={ expense.id }>
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
          { expense.currency }
        </td>
        <td>
          { expense.askCurrency }
        </td>
        <td>
          { expense.valueCoverted }
        </td>
        <td>
          { expense.currencyCoverted }
        </td>
        <td>
          <button type="button">Editar</button>
          <button type="button">Excluir</button>
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

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
};

ExpensesTable.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps)(ExpensesTable);

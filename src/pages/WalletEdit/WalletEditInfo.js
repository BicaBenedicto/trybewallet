import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWalletItem } from '../../actions';
import CurrencyInput from './CurrencyInput';
import DescriptionInput from './DescriptionInput';
import MethodInput from './MethodInput';
import TagInput from './TagInput';
import ValueInput from './ValueInput';
import fetchAPI from '../../fetchAPI';

class WalletEditInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Lazer',
      exchangeRates: {},
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.saveWalletItemInStore = this.saveWalletItemInStore.bind(this);
    this.verifyExchangeRates = this.verifyExchangeRates.bind(this);
  }

  componentDidMount() {
    this.verifyExchangeRates();
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onButtonClick(e) {
    e.preventDefault();
    this.verifyExchangeRates();
    const { currencies, checkActualValue } = this.props;
    checkActualValue();
    if (currencies.length !== 0) {
      const idList = currencies.map((currencie) => currencie.id);
      const biggerId = Math.max(...idList);
      this.setState({
        id: biggerId + 1,
      }, this.saveWalletItemInStore);
    } else {
      this.saveWalletItemInStore();
    }
  }

  saveWalletItemInStore() {
    const { saveWalletItem } = this.props;
    saveWalletItem(this.state);
  }

  async verifyExchangeRates() {
    const rates = await fetchAPI();
    this.setState({
      exchangeRates: rates,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <ValueInput
          value={ value }
          onInputChange={ this.onInputChange }
        />
        <DescriptionInput
          description={ description }
          onInputChange={ this.onInputChange }
        />
        <CurrencyInput
          currency={ currency }
          onInputChange={ this.onInputChange }
        />
        <MethodInput
          method={ method }
          onInputChange={ this.onInputChange }
        />
        <TagInput
          tag={ tag }
          onInputChange={ this.onInputChange }
        />
        <button type="submit" onClick={ this.onButtonClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveWalletItem: (item) => dispatch(addWalletItem(item)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletEditInfo.propTypes = {
  saveWalletItem: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkActualValue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletEditInfo);

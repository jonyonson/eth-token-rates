import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Token from './components/Token';
import ExchangeRate from './components/ExchangeRate';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';

// import DEXAG from 'dexag-sdk';
// const sdk = DEXAG.fromProvider(window.ethereum);

class App extends Component {
  state = {
    inputAmount: '',
    outputAmount: '',
    inputToken: 'ETH',
    outputToken: 'MKR',
    price: null,
    loadingPrice: false,
  };

  getPrice = async (source) => {
    const { inputToken, outputToken, inputAmount, outputAmount } = this.state;
    const amount = source === 'input' ? +inputAmount : +outputAmount;
    const apiUrl = `https://api.dex.ag/price?from=${inputToken}&to=${outputToken}&fromAmount=${amount}&dex=all`;

    try {
      const response = await axios.get(apiUrl);
      const price = Number(response.data[0].price).toFixed(4);
      const outputAmount = (response.data[0].price * amount).toFixed(4);

      // Find the best price
      // const best = await response.data.reduce((prev, curr) =>
      //   prev.price < curr.price ? prev : curr,
      // );

      if (source === 'input') {
        this.setState({
          outputAmount,
          price,
          loadingPrice: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleInputChange = (e) => {
    this.setState(
      {
        inputAmount: e.target.value,
        loadingPrice: true,
      },
      () => {
        if (this.state.inputAmount.length) {
          this.getPrice('input');
        } else {
          this.setState({ outputAmount: '' });
        }
      },
    );
  };

  handleOutputChange = (e) => {
    this.setState({ outputAmount: e.target.value }, () =>
      this.getPrice('output'),
    );
  };

  handleInputTokenChange = (token) => {
    this.setState({ inputToken: token }, () => {
      if (this.state.inputAmount.length) {
        this.getPrice('input');
      }
    });
  };

  handleOutputTokenChange = (token) => {
    this.setState({ outputToken: token }, () => this.getPrice('input'));
  };

  render() {
    const {
      inputToken,
      outputToken,
      inputAmount,
      outputAmount,
      price,
    } = this.state;

    return (
      <React.StrictMode>
        <div>
          <div className="form-wrapper">
            <form className="swap-form">
              <div className="input-label">I want to trade</div>
              <div className="token-row">
                <input
                  className="amount-field"
                  type="number"
                  value={inputAmount}
                  placeholder="0.0"
                  onChange={this.handleInputChange}
                  min="0"
                />
                <Token
                  className="token-select"
                  defaultToken={inputToken}
                  changeToken={this.handleInputTokenChange}
                />
              </div>
              <div className="input-label">in exchange for</div>
              <div className="token-row ">
                <input
                  className="amount-field"
                  type="number"
                  value={outputAmount}
                  placeholder="0.0"
                  onChange={this.handleOutputChange}
                />
                {this.state.loadingPrice && (
                  <div className="loading-price">
                    <BeatLoader color={'#007cb2'} />
                  </div>
                )}

                <Token
                  className="token-select"
                  defaultToken={outputToken}
                  changeToken={this.handleOutputTokenChange}
                />
              </div>
              {this.state.price && (
                <ExchangeRate
                  inputToken={inputToken}
                  outputToken={outputToken}
                  price={price}
                />
              )}
            </form>
          </div>
        </div>
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

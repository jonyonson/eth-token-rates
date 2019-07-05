import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Token from './components/Token';
import axios from 'axios';

// import DEXAG from 'dexag-sdk';
// const sdk = DEXAG.fromProvider(window.ethereum);

// const App = () => {
// useEffect(() => {});

// const [inputAmount, setInputAmount] = useState('');
// const [outputAmount, setOutputAmount] = useState('');
// const [inputToken, setInputToken] = useState('ETH');
// const [outputToken, setOutputToken] = useState('MKR');

class App extends Component {
  state = {
    inputAmount: '',
    outputAmount: '',
    inputToken: 'ETH',
    outputToken: 'MKR',
    loadingPrice: false,
  };

  getPrice = async from => {
    const { inputToken, outputToken, inputAmount, outputAmount } = this.state;
    const amount = from === 'input' ? +inputAmount : +outputAmount;
    const apiUrl = `https://api.dex.ag/price?from=${inputToken}&to=${outputToken}&fromAmount=${amount}&dex=all`;

    try {
      const response = await axios.get(apiUrl);
      const price = (response.data[0].price * amount).toFixed(4);
      if (from === 'input') {
        this.setState({ outputAmount: price });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleInputChange = e => {
    this.setState(
      {
        inputAmount: e.target.value,
      },
      () => this.getPrice('input'),
    );
  };

  handleOutputChange = e => {
    this.setState({ outputAmount: e.target.value }, () =>
      this.getPrice('output'),
    );
  };

  handleInputTokenChange = token => {
    this.setState({ inputToken: token }, () => this.getPrice('input'));
  };

  handleOutputTokenChange = token => {
    this.setState({ outputToken: token }, () => this.getPrice('input'));
  };

  render() {
    return (
      <React.StrictMode>
        <div>
          <div className="form-wrapper">
            <form className="swap-form">
              <div className="token-row">
                <input
                  className="amount-field"
                  type="number"
                  value={this.state.inputAmount}
                  placeholder="0.0"
                  onChange={this.handleInputChange}
                  min="0"
                />
                <Token
                  className="token-select"
                  defaultToken={this.state.inputToken}
                  changeToken={this.handleInputTokenChange}
                />
              </div>
              <div className="token-row">
                <input
                  className="amount-field"
                  type="number"
                  value={this.state.outputAmount}
                  placeholder="0.0"
                  onChange={this.handleOutputChange}
                />
                <Token
                  className="token-select"
                  defaultToken={this.state.outputToken}
                  changeToken={this.handleOutputTokenChange}
                />
              </div>
            </form>
          </div>
        </div>
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

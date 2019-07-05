import React from 'react';

const Exchange = props => {
  const { inputToken, outputToken, price } = props;
  return (
    <div className="exchange-rate">
      <span>Exchange Rate</span>
      <div>
        1 {inputToken} = {price} {outputToken}
      </div>
    </div>
  );
};

export default Exchange;

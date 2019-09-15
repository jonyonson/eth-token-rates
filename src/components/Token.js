import React from 'react';

import tokens from '../data/tokens';

const Token = (props) => {
  const { defaultToken, changeToken, className } = props;

  return (
    <select
      defaultValue={defaultToken}
      onChange={(e) => changeToken(e.target.value)}
      onBlur={(e) => changeToken(e.target.value)}
      className={className}
    >
      {tokens.map((token) => (
        <option key={token} value={token}>
          {token}
        </option>
      ))}
    </select>
  );
};

export default Token;

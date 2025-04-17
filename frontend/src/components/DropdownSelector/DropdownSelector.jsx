import React from "react";

const DropdownSelector = ({ coinList, selectedCoin, onChange }) => (
  <select value={selectedCoin} onChange={(e) => onChange(e.target.value)}>
    <option value="">Select a cryptocurrency</option>
    {coinList.map((coin) => (
      <option key={coin.id} value={coin.id}>
        {coin.name}
      </option>
    ))}
  </select>
);

export default DropdownSelector;

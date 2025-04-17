import React from "react";

const Panel2Stats = ({ gainer, loser }) => (
  <div style={{ display: "flex", gap: "20px" }}>
    <div style={{ padding: "10px", border: "1px solid green" }}>
      <h4>Top Gainer</h4>
      <p>{gainer?.name}</p>
      <p>${gainer?.current_price}</p>
      <p>{gainer?.price_change_percentage_24h.toFixed(2)}%</p>
    </div>
    <div style={{ padding: "10px", border: "1px solid red" }}>
      <h4>Top Loser</h4>
      <p>{loser?.name}</p>
      <p>${loser?.current_price}</p>
      <p>{loser?.price_change_percentage_24h.toFixed(2)}%</p>
    </div>
  </div>
);

export default Panel2Stats;
import React from 'react';
import './TopCard.scss';

const TopCard = ({ title, data }) => {
  return (
    <div className="top-card">
      <h4>{title}</h4>
      <p><strong>{data?.name}</strong></p>
      <p>Price: ${data?.current_price?.toFixed(2)}</p>
      <p>Change: {data?.price_change_percentage_24h?.toFixed(2)}%</p>
    </div>
  );
};

export default TopCard;
import React from 'react';
import './TopCard.scss';

const TopCard = ({ title, data }) => {
  const priceChange = data?.price_change_percentage_24h;

  return (
    <div className="top-card">
      <div className="card-content">
        <h4 className="top-card-title">{title}</h4>
        <h2 className="top-card-name">{data?.name}</h2>
        <p className="top-card-price">Price: ${data?.current_price?.toFixed(2)}</p>
        <p className={`top-card-change ${priceChange > 0 ? 'positive' : 'negative'}`}>
          Change: {priceChange?.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default TopCard;
import React from 'react';
import './TopCard.scss';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TopCard = ({ title, data }) => {
  const priceChange = data?.price_change_percentage_24h;
  const isPositive = priceChange > 0;

  return (
    <div className={`top-card ${isPositive ? 'positive' : 'negative'}`}>
      <div className="card-content">
        <h4 className="top-card-title">{title}</h4>
        <h2 className="top-card-name">
          {data?.name} ({data?.symbol})
        </h2>
        <p className="top-card-price">Price: ${data?.current_price?.toFixed(2)}</p>
        <p className={`top-card-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? (
            <ArrowUpRight className="arrow-icon green" size={16} />
          ) : (
            <ArrowDownRight className="arrow-icon red" size={16} />
          )}
          Change: {priceChange?.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default TopCard;

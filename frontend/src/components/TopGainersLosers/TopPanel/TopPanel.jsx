import React from 'react';
import './TopPanel.scss';
import TopCard from '../TopCard/TopCard';

const TopPanel = ({ gainer, loser }) => {
  return (
    <div className="top-panel">
      <TopCard title="Top Gainer" data={gainer} />
      <TopCard title="Top Loser" data={loser} />
    </div>
  );
};

export default TopPanel;
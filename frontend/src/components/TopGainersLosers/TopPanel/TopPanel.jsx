import React, { useEffect } from 'react';
import './TopPanel.scss';
import TopCard from '../TopCard/TopCard';
import { fetchTopGainer, fetchTopLoser } from '../../../service/api.service';

const TopPanel = ({ gainer, loser }) => {

  useEffect(() => {
    const getTopGainerLoser = async () => {
      try {
        const gainerRes = await fetchTopGainer();
        const loserRes = await fetchTopLoser();

        if(gainerRes.ok && loserRes.ok){
          const gainerData = await gainerRes.json();
          const loserRes = await loserRes.json();
          console.log(gainerData, loserRes)
        }
      } catch (err) {
        console.log(err);
      }
    };

    getTopGainerLoser();
  }, []);

  return (
    <div className="top-panel">
      <TopCard title="Top Gainer" data={gainer} />
      <TopCard title="Top Loser" data={loser} />
    </div>
  );
};

export default TopPanel;
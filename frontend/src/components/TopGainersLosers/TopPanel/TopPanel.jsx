import React, { useEffect, useState } from 'react';
import './TopPanel.scss';
import TopCard from '../TopCard/TopCard';
import { fetchTopGainer, fetchTopLoser } from '../../../service/api.service';

const TopPanel = () => {

  const [top, setTop] = useState({
    topGainer : null,
    topLoser : null
  });

  useEffect(() => {
    const getTopGainerLoser = async () => {
      try {
        const gainerRes = await fetchTopGainer();
        const loserRes = await fetchTopLoser();


        if(gainerRes.status === 200 && loserRes.status === 200){

          const gainerData = await gainerRes.json();
          const loserData = await loserRes.json();
          setTop({
            topGainer : gainerData,
            topLoser : loserData
          })
        }
      } catch (err) {
        console.log(err);
      }
    };

    getTopGainerLoser();

    const interval = setInterval(() => {
      getTopGainerLoser();
    }, 60000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="top-panel">
      <TopCard title="Top Gainer" data={top.topGainer} />
      <TopCard title="Top Loser" data={top.topLoser} />
    </div>
  );
};

export default TopPanel;
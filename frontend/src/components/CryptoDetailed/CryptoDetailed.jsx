import React, { useEffect, useState } from 'react';
import CoinDropdown from './CoinDropDown/CoinDropDown';
import DaysDropdown from './DaysDropDown/DaysDropdown';
import { useSelector } from 'react-redux';
import { fetchMarketChart } from '../../service/api.service';
import CryptoDetailedGraph from './CryptoDetailedGraph/CryptoDetailedGraph'
import "./CryptoDetailed.scss";

function CryptoDetailed() {

  const selectedCoin = useSelector((state) => state.coins.selectedCoin);
  const selectedDays = useSelector((state) => state.coins.selectedDays);

  const [chartData, setChartData] = useState({
    ohlc : [],
    volume : [],
  });

  useEffect(() => {
    const loadMarketChart = async () => {
      if (!selectedCoin) return;
      

      try{
        const res = await fetchMarketChart(selectedCoin, selectedDays);
        console.log(res);

        if (res.status === 200) {
          console.log("object")
          const data = await res.json();
          const analysis = data.analysis;

          const ohlc = analysis.ohlc;
          const volume = analysis.volume;

          setChartData({ ohlc, volume });
        }

      } catch (err) {
        console.error(err);
      }
    };

    loadMarketChart();

  }, [selectedCoin, selectedDays]);

  return (
    <div className='crypto-detailed-container'>
      <div className='selectCoinDay'>
        <CoinDropdown /> 
        <DaysDropdown />
      </div>

      <div className="crypto-detail-graph">
        <CryptoDetailedGraph ohlc={chartData.ohlc} volumeData={chartData.volume} />
      </div>
    </div>
  )
}

export default CryptoDetailed;

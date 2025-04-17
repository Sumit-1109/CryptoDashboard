import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoinList,
  getMarketChart,
  getTopGainer,
  getTopLoser,
  setSelectedCoin,
  setDays,
} from "./redux/slices/coinSlice";
import DropdownSelector from "./components/DropdownSelector/DropdownSelector";
import DaysSlider from "./components/DaysSlider/DaysSlider";
import Panel1Chart from "./components/Panel1Chart/Panel1Chart";
import Panel2Stats from "./components/Panel2Chart/Panel2Chart";

const App = () => {
  const dispatch = useDispatch();
  const {
    coinList,
    selectedCoin,
    days,
    marketChart,
    topGainer,
    topLoser,
  } = useSelector((state) => state.coins);

  useEffect(() => {
    dispatch(getCoinList());
    dispatch(getTopGainer());
    dispatch(getTopLoser());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCoin) {
      dispatch(getMarketChart({ id: selectedCoin, days }));
    }
  }, [selectedCoin, days, dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Crypto Dashboard</h2>
      <DropdownSelector
        coinList={coinList.slice(0, 100)}
        selectedCoin={selectedCoin}
        onChange={(e) => dispatch(setSelectedCoin(e.target.value))}
      />
      <DaysSlider days={days} setDays={(d) => dispatch(setDays(d))} />
      {selectedCoin && marketChart && <Panel1Chart data={marketChart} />}
      {topGainer && topLoser && <Panel2Stats gainer={topGainer} loser={topLoser} />}
    </div>
  );
};

export default App;
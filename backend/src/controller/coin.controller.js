const { getMarketChart, getTopGainer, getTopLoser, getCoinList, getCoinDetails, searchCoins, getOHLCChart } = require("../services/coin.service");
const { getCache, setCache } = require("../utils/cache");

const handleMarketChart = async (req, res) => {
  const { id } = req.params;
  const { vs_currency = 'usd', days = '7' } = req.query;
  const cacheKey = `marketChart-${id}-${vs_currency}-${days}`;

  const cached = getCache(cacheKey);
  
  if (cached) {
    return res.status(200).json(cached);
  }

  try {
    const apiRes = await getMarketChart(id, vs_currency, days);
    const ohlcRes = await getOHLCChart(id, vs_currency, days);
    const analysis = {
      volume : apiRes.data.total_volumes,
      ohlc : ohlcRes.data
    }
    setCache(cacheKey, analysis, 60); 
    return res.status(200).json({analysis});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handleTopGainer = async (req, res) => {
  const cached = getCache('topGainer');
  if (cached) return res.json(cached);

  try {
    const { data } = await getTopGainer();
    const topGainer = data.reduce((max, curr) => 
      curr.price_change_percentage_24h > max.price_change_percentage_24h ? curr : max
    );
    setCache('topGainer', topGainer, 60);
    return res.status(200).json(topGainer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleTopLoser = async (req, res) => {
  const cached = getCache('topLoser');
  if (cached) return res.json(cached);

  try {
    const { data } = await getTopLoser();
    const topLoser = data.reduce((min, curr) => 
      curr.price_change_percentage_24h < min.price_change_percentage_24h ? curr : min
    );
    setCache('topLoser', topLoser, 60);
    return res.status(200).json(topLoser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleCoinList = async (req, res) => {
  try {
    const { data } = await getCoinList();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleSearchCoins = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const { data } = await searchCoins(query);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const handleCoinDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await getCoinDetails(id);
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const handleGlobalData = async (req, res) => {
  try {
    const { data } = await getGlobalData();
    return res.json(data.data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
} 

module.exports = {
  handleMarketChart,
  handleTopGainer,
  handleTopLoser,
  handleCoinDetails,
  handleCoinList,
  handleSearchCoins,
  handleGlobalData
};
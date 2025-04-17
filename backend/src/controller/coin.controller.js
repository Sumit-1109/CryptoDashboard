const { getMarketChart, getTopGainer, getTopLoser } = require("../services/coin.service");
const { getCache, setCache } = require("../utils/cache");

const handleMarketChart = async (req, res) => {
    const {id} = req.params;
    const { vs_currency = 'usd', days = '7' } = req.query;
  const cacheKey = `marketChart-${id}-${vs_currency}-${days}`;

  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

    try {
        const apiRes = await getMarketChart(id, vs_currency, days);
        setCache(cacheKey, apiRes.data, 60);
return res.json(apiRes.data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const handleTopGainer = async (req, res) => {

    const cached = getCache('topGainer');
    if(cached) return res.json(cached);

    try {
      const { data } = await getTopGainer();
      const topGainer = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)[0];
      setCache('topGainer', topGainer, 60);
      res.json(topGainer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const handleTopLoser = async (req, res) => {

    const cached = getCache('topLoser');
    if(cached) return res.json(cached);

    try {
      const { data } = await getTopLoser();
      const topLoser = data.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)[0];
      setCache('topLoser', topLoser, 60);
      res.json(topLoser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  module.exports = {
    handleMarketChart,
    handleTopGainer,
    handleTopLoser
  }
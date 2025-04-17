const axios = require('axios');

const API_BASE = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY;

const getHeaders = () => ({
  headers: {
    'x-cg-demo-api-key': API_KEY,
  },
});

const getTopGainer = () => {
  return axios.get(`${API_BASE}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'price_change_percentage_24h_desc',
      per_page: 1,
      page: 1,
    },
    ...getHeaders(),
  });
};

const getTopLoser = () => {
  return axios.get(`${API_BASE}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'price_change_percentage_24h_asc',
      per_page: 1,
      page: 1,
    },
    ...getHeaders(),
  });
};

const getMarketChart = (id, vs_currency, days) => {
  return axios.get(`${API_BASE}/coins/${id}/market_chart`, {
    params: {
      vs_currency,
      days,
    },
    ...getHeaders(),
  });
};

module.exports = {
  getMarketChart,
  getTopGainer,
  getTopLoser,
};

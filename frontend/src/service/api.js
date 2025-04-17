const BASE_URL = "https://cryptodashboard-production-527f.up.railway.app/api";

export const fetchCoinList = async () => {
  const res = await fetch(`${BASE_URL}/list`);
  return await res.json();
};

export const fetchMarketChart = async (id, days = 7) => {
  const res = await fetch(`${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`);
  return await res.json();
};

export const fetchTopGainer = async () => {
  const res = await fetch(`${BASE_URL}/top-gainer`);
  return await res.json();
};

export const fetchTopLoser = async () => {
  const res = await fetch(`${BASE_URL}/top-loser`);
  return await res.json();
};

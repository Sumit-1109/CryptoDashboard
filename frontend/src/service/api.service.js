const BASE_URL = "https://cryptodashboard-production-527f.up.railway.app/api";

export const fetchCoinList = async () => {
  return await fetch(`${BASE_URL}/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchMarketChart = async (id, days = 7) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );
  const data = await response.json();
  return data;
};

export const fetchTopGainer = async () => {
  const response = await fetch(`${BASE_URL}/top-gainer`);
  const data = await response.json();
  return data;
};

export const fetchTopLoser = async () => {
  const response = await fetch(`${BASE_URL}/top-loser`);
  const data = await response.json();
  return data;
};

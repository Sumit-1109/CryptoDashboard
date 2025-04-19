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
  return await fetch(`${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
};

export const fetchTopGainer = async () => {
  return await fetch(`${BASE_URL}/top-gainer`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  
};

export const fetchTopLoser = async () => {
  return await fetch(`${BASE_URL}/top-loser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
};

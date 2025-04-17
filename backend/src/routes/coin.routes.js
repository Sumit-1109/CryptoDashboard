const express = require("express");
const {
  handleMarketChart,
  handleTopGainer,
  handleTopLoser,
  handleCoinList,
  handleCoinDetails,
  handleSearchCoins,
  handleGlobalData
} = require("../controller/coin.controller");

const router = express.Router();

router.get('/coins/:id/market_chart', handleMarketChart);
router.get('/top-gainer', handleTopGainer);
router.get('/top-loser', handleTopLoser);
router.get('/list', handleCoinList);
router.get('/details/:id', handleCoinDetails);
router.get('/search', handleSearchCoins); 
router.get("/global", handleGlobalData);

module.exports = router;
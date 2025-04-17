const express = require("express");
const { handleMarketChart, handleTopGainer, handleTopLoser } = require("../controller/coin.controller");
const router = express.Router();

router.get('/coins/:id/market_chart', handleMarketChart);
router.get('/top-gainer', handleTopGainer);
router.get('/top-loser', handleTopLoser);

module.exports = router;
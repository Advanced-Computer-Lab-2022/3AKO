const express = require("express");
const router = express.Router();
const { getCountry,exchangeFromUSD } = require("../controllers/utilityController");

router.get("/country", getCountry);
router.get("/exchangeFromUSD", exchangeFromUSD);


module.exports = router;

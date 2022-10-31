const { getCountryUtil, exchangeFromUSDUtil } = require("../utils/countyUtils");

const getCountry = async (req, res, next) => {
  try {
    res.json(await getCountryUtil());
  } catch (error) {
    next(error);
  }
};

const exchangeFromUSD = async (req, res, next) => {
  try {
    res.json(await exchangeFromUSDUtil(req.query.country));
  } catch (error) {
    next(error);
  }
};

module.exports = { getCountry, exchangeFromUSD };

const { getCountryUtil } = require("../utils/countyUtils");

const getCountry = async (req, res, next) => {
  try {
    res.json(await getCountryUtil());
  } catch (error) {
    next(error);
  }
};

module.exports = { getCountry };

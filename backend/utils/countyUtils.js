const iso2ToCountry = require("../data/iso2ToCountry.json");
const iso2ToCurrency = require("../data/iso2ToCurrency.json");

async function getCountryUtil() {
  let response = await fetch("https://api.country.is/");
  let data = await response.json();
  return data.country;
}

async function countryToCurrencyUtil() {
  currency = iso2ToCurrency[await getCountryUtil()];
  return currency;
}

async function exchangeFromUSDUtil() {
  let response = await fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/" +
      (await countryToCurrencyUtil()).toLowerCase() +
      ".json"
  );
  let data = await response.json();
  return data[Object.keys(data)[1]];
}

module.exports = {
  getCountryUtil,
  countryToCurrencyUtil,
  exchangeFromUSDUtil,
};

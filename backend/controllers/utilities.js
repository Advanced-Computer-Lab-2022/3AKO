
async function getCountry(){

    
    let response = await fetch('http://ip-api.com/json');
    let data = await response.json();
    return   "Switzerland"
}

async function countryToCurrency(){
    let response = await fetch('https://restcountries.com/v3.1/name/'+await getCountry());
    let data = await response.json();
    return  Object.keys(data[0].currencies)[0]
}

async function exchangeFromUSD(){
    let response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/'+(await countryToCurrency()).toLowerCase()+'.json');
    let data = await response.json();
    return  data[Object.keys(data)[1]]
}

module.exports = {countryToCurrency}

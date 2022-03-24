var axios = require("axios").default;
const fs = require('fs')
const translateData = require('./googleTranslate')
const config = require('../config')
const { newsapiKey, isCache } = config

let getStockUpdate = async (req, res) => {
  var options = {
    method: 'GET',
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demoHLB3Q3W9V15UL52W`
  };


  axios.request(options).then(function (response) {
    if(response && response.data && response.data['Time Series (5min)']){
      let key = Object.keys(response.data['Time Series (5min)'])[0]
      let data =response.data['Time Series (5min)'][key]
      return res.send({
       "open": data["1. open"],
        "high": data["2. high"],
        "low": data["3. low"],
        "close": data["4. close"],
        "volume": data["5. volume"]
      }) 
    }else{
      return res.send({
        "open": '000',
         "high": "000",
         "low": '000',
         "close": '000',
         "volume": '000'
       }) 
    }
  }).catch(function (error) {
    res.status(400).send({ error: error })
  });
};

module.exports = { getStockUpdate }
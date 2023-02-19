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
        "stockName":'IBM',
       "open": data["1. open"],
        "high": data["2. high"],
        "low": data["3. low"],
        "close": data["4. close"],
        "volume": data["5. volume"]
      }) 
    }else{
      return res.send({
        "stockName":'IBM',
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

let getMIndex = async (req, res) => {

  try{
    let data = fs.readFileSync(`./stockRSI.json`, 'utf8')
    data = JSON.parse(data)
    return res.send(data)
  }catch(e){
    return  res.status(400).send({msg:'invalid request'})
  }
  
 
}

let setMIndex = async (req, res) => {

  try{
    if(req && req.query && req.query.source==='rohit' && req.query.mmi_index){
      let mmi_index = req.query.mmi_index
  
      if(!isNaN(req.query.mmi_index)){
  
        let data = JSON.stringify({index:req.query.mmi_index})
        if (fs.existsSync(`./stockRSI.json`)) await fs.unlinkSync(`./stockRSI.json`)
        fs.writeFileSync(`./stockRSI.json`, data, { flag: 'wx' })
        return res.send({msg:'success'})
      } 
  
    }
  
    return  res.status(400).send({msg:'invalid request'})
  }catch(e){
    return  res.status(400).send({msg:`invalid request, ${e}`})
  }
};

module.exports = { getStockUpdate, getMIndex, setMIndex }
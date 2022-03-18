var axios = require("axios").default;
const fs = require('fs')
const translateData = require('./googleTranslate')
const config = require('../config')
const { newsapiKey, isCache } = config

const getCategoryNewsCached = async (req, res) => {

  // CHECK FOR NEWS LANGUAGE 
  const lang = req.query.lang
    let dateFilename = 'getCategoryNews_lastTime.json'
    let newsDataFilename = 'getCategoryNews.json'
    if (lang === 'hi'){
       dateFilename = 'getCategoryNewsHindi_lastTime.json'
     newsDataFilename = 'getCategoryNewsHindi.json'
    }

  // CHECK FILES EXIST
  if (fs.existsSync(`./${dateFilename}`) && fs.existsSync(`./${newsDataFilename}`)) {
    // READ DATE-FILE
    let fileTimeData = fs.readFileSync(`./${dateFilename}`, 'utf8')
    fileTimeData = JSON.parse(fileTimeData)

    // CHECK FILE CREATED DATE WHETHER EXPIRED OR NOT
    var savedDate = new Date(fileTimeData.date);
    var currentDate = new Date();
    var Difference_In_Time = currentDate.getTime() - savedDate.getTime();
    let diffhours = (Difference_In_Time / (1000 * 60 * 60))
    if (diffhours > 8) { // CHECK FILE DATA EXPIRE 
      let finalResult = await handleNewRequest(dateFilename, newsDataFilename, lang)
      return res.send(finalResult)
    } else { // NOT EXPIRED

      let newDatafromfile = fs.readFileSync(`./${newsDataFilename}`, 'utf8')

      // SEND RESPONSE
      return res.send(newDatafromfile)
    }

  }// FILE NOT EXIST
  else {
    let finalResult = await handleNewRequest(dateFilename, newsDataFilename,lang)
    return res.send(finalResult)
  }

};

const handleNewRequest = async (dateFilename, newsDataFilename, lang) => {
  // CALL API AND UPDATE RESPONSE IN FILE
  let apiData = await callCategoryApi(lang)

  let apiDataForFile = JSON.stringify(apiData)
  if (fs.existsSync(`./${newsDataFilename}`)) fs.unlinkSync(`./${newsDataFilename}`)
  fs.writeFileSync(`./${newsDataFilename}`, apiDataForFile, { flag: 'wx' })

  // CREATE FILE
  let date = JSON.stringify({ date: new Date() })
  if (fs.existsSync(`./${dateFilename}`)) fs.unlinkSync(`./${dateFilename}`)
  fs.writeFileSync(`./${dateFilename}`, date, { flag: 'wx' })
  // SEND RESPONSE
  return apiData
}

const callCategoryApi = async (lang) => {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@", lang)
  var options = {
    method: 'GET',
    url: `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=30`
  };

  let response = await axios.request(options);

  let newsData = response.data.articles.map(news => {
    let { title = '', url = '', urlToImage = '', description = '' } = news
    return {
      name: title,
      url: urlToImage,
      description,
      link: url
    }
  });

  if (lang === 'hi') {
    return await translateData(newsData)
  }
  return newsData
}

const getCategoryNews_api = async (req, res) => {
  var options = {
    method: 'GET',
    url: `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=30`
  };


  axios.request(options).then(function (response) {
    let db = response.data.articles.map(news => {
      let { title = '', url = '', urlToImage = '', description = '' } = news
      return {
        name: title,
        url: urlToImage,
        description,
        link: url
      }
    });



    // -------------------rnd------------------------
    const fs = require('fs')
    let content = JSON.stringify(db)
    // const content = 'Some hguguy content!'
    fs.unlink('./testresponse.json', (err) => {
      if (err) throw err;
      console.log('path/file.txt was deleted');
    });

    // condition end for language support
  }).catch(function (error) {
    res.status(400).send({ error: error })
  });
};

let getCategoryNews = async (req, res) => {
  var options = {
    method: 'GET',
    url: `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=30`
  };


  axios.request(options).then(function (response) {
    let db = response.data.articles.map(news => {
      let { title = '', url = '', urlToImage = '', description = '' } = news
      return {
        name: title,
        url: urlToImage,
        description,
        link: url
      }
    });

    // condition for language support
    const lang = req.query.lang

    if (lang === 'hi') {
      translateData(db).then(result => {
        return res.send(result);
      }).catch(reason => {
        console.log('reason:', reason)
      })
    } else {
      return res.send(db);
    }

    // condition end for language support
  }).catch(function (error) {
    res.status(400).send({ error: error })
  });
};

const getSearchedNews = async (req, res) => {
  const { q } = req.query

  var options = {
    method: 'GET',
    url: `https://newsapi.org/v2/everything?q=sport&apiKey=${newsapiKey}&pageSize=30`
  };

  axios.request(options).then(function (response) {

    let db = response.data.articles.map(news => {
      let { title = '', url = '', urlToImage = '', description = '' } = news
      return {
        name: title,
        url: urlToImage,
        description,
        link: url
      }
    });


    // condition for language support
    const lang = req.query.lang

    if (lang === 'hi') {
      translateData(db).then(result => {
        return res.send(result);
      }).catch(reason => {
        console.log('reason:', reason)
      })
    } else {
      return res.send(db);
    }

    // condition end for language support
  }).catch(function (error) {
    res.status(400).send({ error: error })
  });
};

const getTrendingNews = async (req, res) => {

  var options = {
    method: 'GET',
    url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsapiKey}&pageSize=30`,
  };

  axios.request(options).then(function (response) {


    let db = response.data.articles.map(news => {
      let { title = '', url = '', urlToImage = '', description = '' } = news
      return {
        name: title,
        url: urlToImage,
        description,
        link: url
      }
    });


    // condition for language support
    const lang = req.query.lang

    if (lang === 'hi') {
      translateData(db).then(result => {
        return res.send(result);
      }).catch(reason => {
        console.log('reason:', reason)
      })
    } else {
      return res.send(db);
    }

    // condition end for language support
  }).catch(function (error) {
    res.status(400).send({ error: error })
  });
};

if(isCache){
  console.log('isCache:',isCache)
  getCategoryNews = getCategoryNewsCached;
}

module.exports = { getCategoryNews, getSearchedNews, getTrendingNews }
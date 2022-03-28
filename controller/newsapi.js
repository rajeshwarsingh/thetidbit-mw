var axios = require("axios").default;
const fs = require('fs')
const translateData = require('./googleTranslate')
const config = require('../config')
const { newsapiKey, isCache } = config

// -----------------getCategoryNews------------

const getCategoryNewsCached = async (req, res) => {
  // CHECK FOR NEWS LANGUAGE 
  return await handleCachedMethod(req, res,'category')

};

const getSearchedNewsCached = async (req, res) => {

  // CHECK FOR NEWS LANGUAGE 
  return await handleCachedMethod(req, res, 'search')

};

const getTrendingNewsCached = async (req, res) => {

  // CHECK FOR NEWS LANGUAGE 
  return await handleCachedMethod(req, res, 'trending')

};

// -----------------getCategoryNews------------
const getFileName= (apiType, fileType, lang, category)=>{
  let file = ''
  
  if (apiType === 'category' && fileType === 'datefile' && category==='general') { //category
    file = 'getCategoryNews_general_lastTime.json'
  } else if (apiType === 'category' && fileType === 'datefile' && category==='business') {
    file = 'getCategoryNews_business_lastTime.json'
  }
  else if (apiType === 'category' && fileType === 'datefile' && category==='technology') {
    file = 'getCategoryNews_technology_lastTime.json'
  }
  else if (apiType === 'category' && fileType === 'datefile' && category==='entertainment') {
    file = 'getCategoryNews_entertainment_lastTime.json'
  }
  else if (apiType === 'category' && fileType === 'datefile' && category==='sports') {
    file = 'getCategoryNews_sports_lastTime.json'
  }
  else if (apiType === 'category' && fileType === 'datafile' && category==='general') {
    file = 'getCategoryNewsGeneral.json'
  }
  else if (apiType === 'category' && fileType === 'datafile' && category==='business') {
    file = 'getCategoryNewsBusiness.json'
  }
  else if (apiType === 'category' && fileType === 'datafile' && category==='technology') {
    file = 'getCategoryNewsTechnology.json'
  }
  else if (apiType === 'category' && fileType === 'datafile' && category==='entertainment') {
    file = 'getCategoryNewsEntertainment.json'
  }
  else if (apiType === 'category' && fileType === 'datafile' && category==='sports') {
    file = 'getCategoryNewsSports.json'
  }
  else if (apiType === 'category' && fileType === 'datefile' && lang!=='hi') { //category
    file = 'getCategoryNews_lastTime.json'
  } else if (apiType === 'category' && fileType === 'datefile' && lang==='hi') {
    file = 'getCategoryNews_hi_lastTime.json'
  } else if (apiType === 'category' && fileType === 'datafile' && lang!=='hi') {
    file = 'getCategoryNews.json'
  } else if (apiType === 'category' && fileType === 'datafile' && lang==='hi') {
    file = 'getCategoryNews_hi.json'
  } else if (apiType === 'search' && fileType === 'datefile' && lang!=='hi') { // search
    file = 'getSearchNews_lastTime.json'
  } else if (apiType === 'search' && fileType === 'datefile' && lang==='hi') {
    file = 'getSearchNews_hi_lastTime.json'
  } else if (apiType === 'search' && fileType === 'datafile' && lang!=='hi') {
    file = 'getSearchNews.json'
  } else if (apiType === 'search' && fileType === 'datafile' && lang==='hi') {
    file = 'getSearchNews_hi.json'
  } else if (apiType === 'trending' && fileType === 'datefile' && lang!=='hi') {// trending
    file = 'getTrendingNews_lastTime.json'
  } else if (apiType === 'trending' && fileType === 'datefile' && lang==='hi') {
    file = 'getTrendingNews_hi_lastTime.json'
  } else if (apiType === 'trending' && fileType === 'datafile' && lang!=='hi') {
    file = 'getTrendingNews.json'
  } else if (apiType === 'trending' && fileType === 'datafile' && lang==='hi') {
    file = 'getTrendingNews_hi.json'
  } else {
    console.log('type fot available:')
  }
  return file
}
const handleCachedMethod = async (req, res, apiType) => {

  // CHECK FOR NEWS LANGUAGE 
  const lang = req.query.lang
  const category = req.query.q
    let dateFilename = getFileName(apiType, 'datefile', lang, category)
    let newsDataFilename = getFileName(apiType, 'datafile', lang, category)

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
    if (diffhours > 12) { // CHECK FILE DATA EXPIRE 
      let finalResult = await handleNewRequest(dateFilename, newsDataFilename, lang,apiType, category)
      return res.send(finalResult)
    } else { // NOT EXPIRED

      let newDatafromfile = fs.readFileSync(`./${newsDataFilename}`, 'utf8')

      // SEND RESPONSE
      return res.send(newDatafromfile)
    }

  }// FILE NOT EXIST
  else {
    let finalResult = await handleNewRequest(dateFilename, newsDataFilename,lang, apiType, category)
    return res.send(finalResult)
  }

};

// ---------------new Request----------------------------------
const handleNewRequest = async (dateFilename, newsDataFilename, lang, apiType, category) => {
  // CALL API AND UPDATE RESPONSE IN FILE
  let apiData;
  if(apiType==='category'){
    apiData = await callCategoryApi(lang, category)
  }else if(apiType==='search'){
    apiData = await callSearchedApi(lang)
  }else if(apiType==='trending'){
    apiData = await callTrendingApi(lang)
  }else{
    console.log('*************************************: api type not found')
  }

  let apiDataForFile = JSON.stringify(apiData)
  if (fs.existsSync(`./${newsDataFilename}`)) await fs.unlinkSync(`./${newsDataFilename}`)
  fs.writeFileSync(`./${newsDataFilename}`, apiDataForFile, { flag: 'wx' })

  // CREATE FILE
  let date = JSON.stringify({ date: new Date() })
  if (fs.existsSync(`./${dateFilename}`)) fs.unlinkSync(`./${dateFilename}`)
  fs.writeFileSync(`./${dateFilename}`, date, { flag: 'wx' })
  // SEND RESPONSE
  return apiData
}

// -------------------------------------------------------

// --------------------api----------------------------
const callCategoryApi = async (lang,category) => {
  let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=30`
  if(category){
    url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=30&category=${category}`
  }
  var options = {
    method: 'GET',
    url: url
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

const callSearchedApi = async (lang) => {
  // const { q } = req.query

  var options = {
    method: 'GET',
    url: `https://newsapi.org/v2/everything?q=sport&apiKey=${newsapiKey}&pageSize=30`
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

const callTrendingApi = async (lang) => {
  var options = {
    method: 'GET',
    url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsapiKey}&pageSize=30`,
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


// --------------------------------------------
// -----------------getCategoryNews------------
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

let getSearchedNews = async (req, res) => {
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

let getTrendingNews = async (req, res) => {

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
  getCategoryNews = getCategoryNewsCached;
  getSearchedNews = getSearchedNewsCached;
  getTrendingNews = getTrendingNewsCached;
}

module.exports = { getCategoryNews, getSearchedNews, getTrendingNews }
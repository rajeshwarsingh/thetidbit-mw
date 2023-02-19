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
  // 4 2 2 4 
  
  if (apiType === 'category' && fileType === 'datefile' && category==='general' ) { //category
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
  } 
  else if (apiType === 'category' && fileType === 'datefile' && lang==='hi') {
    file = 'getCategoryNews_hi_lastTime.json'
  } 
  else if (apiType === 'category' && fileType === 'datafile' && lang!=='hi') {
    file = 'getCategoryNews.json'
  } 
  else if (apiType === 'category' && fileType === 'datafile' && lang==='hi') {
    file = 'getCategoryNews_hi.json'
  } 
  else if (apiType === 'search' && fileType === 'datefile' && lang!=='hi') { // search
    file = 'getSearchNews_lastTime.json'
  } 
  else if (apiType === 'search' && fileType === 'datefile' && lang==='hi') {
    file = 'getSearchNews_hi_lastTime.json'
  } 
  else if (apiType === 'search' && fileType === 'datafile' && lang!=='hi') {
    file = 'getSearchNews.json'
  } 
  else if (apiType === 'search' && fileType === 'datafile' && lang==='hi') {
    file = 'getSearchNews_hi.json'
  } 
  else if (apiType === 'trending' && fileType === 'datefile' && lang!=='hi') {// trending
    file = 'getTrendingNews_lastTime.json'
  } 
  else if (apiType === 'trending' && fileType === 'datefile' && lang==='hi') {
    file = 'getTrendingNews_hi_lastTime.json'
  } 
  else if (apiType === 'trending' && fileType === 'datafile' && lang!=='hi') {
    file = 'getTrendingNews.json'
  } 
  else if (apiType === 'trending' && fileType === 'datafile' && lang==='hi') {
    file = 'getTrendingNews_hi.json'
  } 
  else {
    console.log('type fot available:')
  }
  return file
}

// ------------------For Category TIME API Only-------------
const getFileDateName = (apiType, fileType, lang, category) => {
  let file = ''

  // FOR ENGLISH CATEGORY NEWS
  if (apiType === 'category' && category === 'general' && lang !== 'hi') {
    file = 'getCategoryNews_general_lastTime.json'
  }
  else if (apiType === 'category' && category === 'business' && lang !== 'hi') {
    file = 'getCategoryNews_business_lastTime.json'
  }
  else if (apiType === 'category' && category === 'technology' && lang !== 'hi') {
    file = 'getCategoryNews_technology_lastTime.json'
  }
  else if (apiType === 'category' && category === 'entertainment' && lang !== 'hi') {
    file = 'getCategoryNews_entertainment_lastTime.json'
  }
  else if (apiType === 'category' && category === 'sports' && lang !== 'hi') {
    file = 'getCategoryNews_sports_lastTime.json'
  }

  // FOR HINDI CATEGORY NEWS
  else if (apiType === 'category' && category === 'general' && lang === 'hi') {
    file = 'getCategoryNews_general_lastTime_hi.json'
  }
  else if (apiType === 'category' && category === 'business' && lang === 'hi') {
    file = 'getCategoryNews_business_lastTime_hi.json'
  }
  else if (apiType === 'category' && category === 'technology' && lang === 'hi') {
    file = 'getCategoryNews_technology_lastTime_hi.json'
  }
  else if (apiType === 'category' && category === 'entertainment' && lang === 'hi') {
    file = 'getCategoryNews_entertainment_lastTime_hi.json'
  }
  else if (apiType === 'category' && category === 'sports' && lang === 'hi') {
    file = 'getCategoryNews_sports_lastTime_hi.json'
  }

  // FOR ENGLISH TRENDING NEWS
  // --FUTURE SCOPE

  // FOR HINDI TRENDING NEWS
  // --FUTURE SCOPE

  // FOR ENGLISH SEARCH NEWS
  else if (apiType === 'search' && lang !== 'hi') {
    file = 'getSearchNews.json'
  }
  // FOR HINDI SEARCH NEWS
  else if (apiType === 'search' && lang === 'hi') {
    file = 'getSearchNews_hi.json'
  } else {
    console.log('type not available: sending general one')
    file = 'getCategoryNews_general_lastTime.json'
  }
  // ------------------------------------------------------------------------------------------------

  return file
}

// ------------------For Category Data API Only-------------
const getnNewsDataFilename = (apiType, fileType, lang, category) => {
  let file = ''

  // FOR ENGLISH CATEGORY NEWS
  if (apiType === 'category' && category === 'general' && lang !== 'hi') {
    file = 'getCategoryNewsGeneral.json'
  }
  else if (apiType === 'category' && category === 'business' && lang !== 'hi') {
    file = 'getCategoryNewsBusiness.json'
  }
  else if (apiType === 'category' && category === 'technology' && lang !== 'hi') {
    file = 'getCategoryNewsTechnology.json'
  }
  else if (apiType === 'category' && category === 'entertainment' && lang !== 'hi') {
    file = 'getCategoryNewsEntertainment.json'
  }
  else if (apiType === 'category' && category === 'sports' && lang !== 'hi') {
    file = 'getCategoryNewsSports.json'
  }

  // FOR HINDI CATEGORY NEWS
  else if (apiType === 'category' && category === 'general' && lang === 'hi') {
    file = 'getCategoryNewsGeneral_hi.json'
  }
  else if (apiType === 'category' && category === 'business' && lang === 'hi') {
    file = 'getCategoryNewsBusiness_hi.json'
  }
  else if (apiType === 'category' && category === 'technology' && lang === 'hi') {
    file = 'getCategoryNewsTechnology_hi.json'
  }
  else if (apiType === 'category' && category === 'entertainment' && lang === 'hi') {
    file = 'getCategoryNewsEntertainment_hi.json'
  }
  else if (apiType === 'category' && category === 'sports' && lang === 'hi') {
    file = 'getCategoryNewsSports_hi.json'
  }

  // FOR ENGLISH TRENDING NEWS
  // --FUTURE SCOPE

  // FOR HINDI TRENDING NEWS
  // --FUTURE SCOPE

  // FOR ENGLISH SEARCH NEWS
  else if (apiType === 'search' && lang !== 'hi') {
    file = 'getSearchNews.json'
  }
  // FOR HINDI SEARCH NEWS
  else if (apiType === 'search' && lang === 'hi') {
    file = 'getSearchNews_hi.json'
  } else {
    console.log('type fot available:')
    file = 'getCategoryNewsGeneral.json'
  }
  // ------------------------------------------------------------------------------------------------

  return file
}


const handleCachedMethod = async (req, res, apiType) => {
try{


  // CHECK FOR NEWS LANGUAGE 
  const lang = req && req.query && req.query.lang?req.query.lang:''
  const category = req && req.query && req.query.q?req.query.q:''
  // console.log("check :",apiType, 'datefile', lang, category)
    let dateFilename = getFileDateName(apiType, 'datefile', lang, category)
    let newsDataFilename = getnNewsDataFilename(apiType, 'datafile', lang, category)

    // console.log("&&&&&&&&&&&&&:",dateFilename,newsDataFilename)
    // console.log("step 1",fs.existsSync(`./${newsDataFilename}`))
    // return;
  // CHECK FILES EXIST
  if (fs.existsSync(`./${dateFilename}`) && fs.existsSync(`./${newsDataFilename}`)) {
    // console.log("instide &&&&&&&&&&&&&:",dateFilename,newsDataFilename)
    // READ DATE-FILE
    let fileTimeData = fs.readFileSync(`./${dateFilename}`, 'utf8')
    // console.log("step 1")
    fileTimeData = JSON.parse(fileTimeData)
    // console.log("step 2")
    // CHECK FILE CREATED DATE WHETHER EXPIRED OR NOT
    var savedDate = new Date(fileTimeData.date);
    var currentDate = new Date();
    // console.log("step 3")
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
    let finalResult = await handleNewRequest(dateFilename, newsDataFilename,lang, apiType, category,req)
    return res.send(finalResult)
  }
  
}catch(err){
  console.log('error in :handleCachedMethod', err)
}
};

// ---------------new Request----------------------------------
const handleNewRequest = async (dateFilename, newsDataFilename, lang, apiType, category,req) => {
  // CALL API AND UPDATE RESPONSE IN FILE
  let apiData;
  if(apiType==='category'){
    apiData = await callCategoryApi(lang, category,req)
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
const callCategoryApi = async (lang,category,req) => {
  // console.log("req.query****************",req)
  
  let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=60`
  if(category==='entertainment'){
    // url = `https://newsapi.org/v2/everything?q=fashion&from=2022-04-03&sortBy=publishedAt&apiKey=${newsapiKey}&pageSize=60`
    // url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=60&category=${category}`
    url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=60&category=${category}`
  }
  else if(category){
    url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=60&category=${category}`
  }
  var options = {
    method: 'GET',
    url: url
  };

  let response = await axios.request(options);

  let newsData = response.data.articles.map(news => {
    let { title = '', url = '', urlToImage = '', description = '',author='',publishedAt='' } = news
    return {
      name: title,
      url: urlToImage,
      description,
      link: url,
      author:author,
        publishedAt:publishedAt
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
    url: `https://newsapi.org/v2/everything?q=sport&apiKey=${newsapiKey}&pageSize=60`
  };

  let response = await axios.request(options);

  let newsData = response.data.articles.map(news => {
    let { title = '', url = '', urlToImage = '', description = '', author='', publishedAt='' } = news
    return {
      name: title,
      url: urlToImage,
      description,
      link: url,
      author:author,
      publishedAt:publishedAt
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
    url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsapiKey}&pageSize=60`,
  };

  let response = await axios.request(options);

  let newsData = response.data.articles.map(news => {
    let { title = '', url = '', urlToImage = '', description = '',author='',publishedAt='' } = news
    return {
      name: title,
      url: urlToImage,
      description,
      link: url,
      publishedAt:publishedAt,
      author:author
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
    url: `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=60`
  };


  axios.request(options).then(function (response) {
    let db = response.data.articles.map(news => {
      let { title = '', url = '', urlToImage = '', description = '',author='', publishedAt='' } = news
      return {
        name: title,
        url: urlToImage,
        description,
        link: url,
        author:author,
        publishedAt:publishedAt
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
    url: `https://newsapi.org/v2/everything?q=sport&apiKey=${newsapiKey}&pageSize=60`
  };

  axios.request(options).then(function (response) {

    let db = response.data.articles.map(news => {
      let { title = '', url = '', urlToImage = '', description = '', author='', publishedAt=''} = news
      return {
        name: title,
        url: urlToImage,
        description,
        link: url,
        author:author,
      publishedAt:publishedAt
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
    url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsapiKey}&pageSize=60`,
  };

  axios.request(options).then(function (response) {


    let db = response.data.articles.map(news => {
      let { title = '', url = '', urlToImage = '', description = '',author='',publishedAt='' } = news
      return {
        name: title,
        url: urlToImage,
        description,
        link: url,
        author:author,
        publishedAt:publishedAt
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
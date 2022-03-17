var axios = require("axios").default;
const translateData = require('./googleTranslate')

const getCategoryNews = async (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/top-headlines?country=in&apiKey=dee373b831964dfdb34259a56efbf20b&pageSize=5'
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
    url: `https://newsapi.org/v2/everything?q=sport&apiKey=dee373b831964dfdb34259a56efbf20b&pageSize=5`
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
    url: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=dee373b831964dfdb34259a56efbf20b&pageSize=5',
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

module.exports = { getCategoryNews, getSearchedNews, getTrendingNews }
var axios = require("axios").default;

const getCategoryNews = async (req, res) => {

    var options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: {safeSearch: 'Off', textFormat: 'Raw'},
        headers: {
          'x-bingapis-sdk': 'true',
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
          'x-rapidapi-key': 'e278301744msh1c99c69b72ab917p149b25jsn246205d45abb'
        }
      };
      
      axios.request(options).then(function (response) {
        let db = response.data.value.map(news => {
            let { name = '', url = '', description = '' } = news
            let thumbnailUrl = news.provider.length && news.provider[0].image && news.provider[0].image.thumbnail ? news.provider[0].image.thumbnail.contentUrl : ''
            return {
              name,
              url: thumbnailUrl,
              description,
              link: url
            }
          });
          
          return res.send(db);
      }).catch(function (error) {
        res.status(400).send({error: error})
      });
};

const getSearchedNews = async (req, res) => {

    var options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: {safeSearch: 'Off', textFormat: 'Raw'},
        headers: {
          'x-bingapis-sdk': 'true',
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
          'x-rapidapi-key': 'e278301744msh1c99c69b72ab917p149b25jsn246205d45abb'
        }
      };
      
      axios.request(options).then(function (response) {
        let db = response.data.value.map(news => {
            let { name = '', url = '', description = '' } = news
            let thumbnailUrl = news.provider.length && news.provider[0].image && news.provider[0].image.thumbnail ? news.provider[0].image.thumbnail.contentUrl : ''
            return {
              name,
              url: thumbnailUrl,
              description,
              link: url
            }
          });

          

          return res.send(db);
      }).catch(function (error) {
        res.status(400).send({error: error})
      });
};

const getTrendingNews = async (req, res) => {

    var options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: {safeSearch: 'Off', textFormat: 'Raw'},
        headers: {
          'x-bingapis-sdk': 'true',
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
          'x-rapidapi-key': 'e278301744msh1c99c69b72ab917p149b25jsn246205d45abb'
        }
      };
      
      axios.request(options).then(function (response) {
        let db = response.data.value.map(news => {
            let { name = '', url = '', description = '' } = news
            let thumbnailUrl = news.provider.length && news.provider[0].image && news.provider[0].image.thumbnail ? news.provider[0].image.thumbnail.contentUrl : ''
            return {
              name,
              url: thumbnailUrl,
              description,
              link: url
            }
          });

          

          return res.send(db);
      }).catch(function (error) {
        res.status(400).send({error: error})
      });
};

module.exports = {getCategoryNews, getSearchedNews, getTrendingNews }
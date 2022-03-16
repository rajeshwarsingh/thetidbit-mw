var axios = require("axios").default;

const getCategoryNews = async (req, res) => {
    alert(1)

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
        //   console.log(response.data);
          return res.send(response.data);
      }).catch(function (error) {
        res.status(400).send({error: response.error})
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
        //   console.log(response.data);
          return res.send(response.data);
      }).catch(function (error) {
        res.status(400).send({error: response.error})
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
        //   console.log(response.data);
          return res.send(response.data);
      }).catch(function (error) {
        res.status(400).send({error: response.error})
      });
};

module.exports = {getCategoryNews, getSearchedNews, getTrendingNews }
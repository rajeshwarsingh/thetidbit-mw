const webpushController = require('./webpush')
var axios = require("axios").default;
const fs = require('fs')
const translateData = require('./googleTranslate')
const config = require('../config')
const { newsapiKey, isCache } = config

const notifyData = [
  {
    startTime: "2:30:00",
    endTime: '3:00:00',
    newsIndex: 0
  },
  {
    startTime: "5:30:00",
    endTime: '6:00:00',
    newsIndex: 1
  },
  {
    startTime: "7:30:00",
    endTime: '8:00:00',
    newsIndex: 2
  },
  {
    startTime: "13:00:00",
    endTime: '13:30:00',
    newsIndex: 3
  },
  {
    startTime: "15:30:10",
    endTime: '16:00:00',
    newsIndex: 4
  },
  {
    startTime: "21:00:10",
    endTime: '23:00:00',
    newsIndex: 5
  },]

const getNewsDataForNotification = async (newsIndex) => {
  var options = {
    method: 'GET',
    // url: `https://newsapi.org/v2/everything?q=sport&apiKey=${newsapiKey}&pageSize=60`
    url:`https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapiKey}&pageSize=60`
  };

  let response = await axios.request(options);
 
  let newsData = response.data.articles
  // console.log('newsData :',newsIndex,newsData[newsIndex])
  if(!newsData){
    return
  }
  const { title = '', urlToImage = '', description = '' } = newsData[newsIndex]
  return {
    title,
    "body": (description && description.length>=25?description.substr(0,25):description),
    "image": urlToImage,
    newsIndex:newsIndex
  }
}

const matchNotificationTime = (notifydata) => {
  // console.log("matchNotificationTime method data:", notifydata)
  const { startTime = '', endTime = '' } = notifydata
  // var startTime = '15:10:10';
  //   var endTime = '15:15:00';

  let currentDate = new Date()
  
  startDate = new Date(currentDate.getTime());
  startDate.setHours(startTime.split(":")[0]);
  startDate.setMinutes(startTime.split(":")[1]);
  startDate.setSeconds(startTime.split(":")[2]);

  endDate = new Date(currentDate.getTime());
  endDate.setHours(endTime.split(":")[0]);
  endDate.setMinutes(endTime.split(":")[1]);
  endDate.setSeconds(endTime.split(":")[2]);


  valid = startDate < currentDate && endDate > currentDate
  return valid
}

const shouldSendNotificationWeb = () => {
  // CHECK NOTIFICATION TIME
  notifyData.map(async (data) => {
    if (matchNotificationTime(data)) {
      // console.log('send notification to mathch data:', data)

      
      // send notification
      let body = {
        "title": "This is a Notification",
        "body": "This is the body of the notification message.",
        "image": "https://fdn.gsmarena.com/imgroot/news/21/08/samsung-galaxy-watch4-series-ofic/-952x498w6/gsmarena_001.jpg"
      }

      body = await getNewsDataForNotification(data['newsIndex'])
      // console.log('body:',body)

      let res = webpushController._sendWPToWeb(body)
      console.log(` status is : ${res.statusCode} and msg :${res.msg}`)
    }
  })
}

const shouldSendNotificationAndroid = () => {
  // CHECK NOTIFICATION TIME
  notifyData.map(async (data) => {
    if (matchNotificationTime(data)) {
      // console.log('send notification to mathch data:', data)

      
      // send notification
      let body = {
        "title": "This is a Notification",
        "body": "This is the body of the notification message.",
        "image": "https://fdn.gsmarena.com/imgroot/news/21/08/samsung-galaxy-watch4-series-ofic/-952x498w6/gsmarena_001.jpg"
      }

      body = await getNewsDataForNotification(data['newsIndex'])
      // console.log('body:',body)

      let res = webpushController._sendWPToAndroid(body)
      console.log(` status is : ${res.statusCode} and msg :${res.msg}`)
    }
  })
}


const notificationWebCron = () => {
  setInterval(() => {
    shouldSendNotificationWeb()
  }, 1000*60*30);

}


const notificationAndroidCron = () => {
  setInterval(() => {
    shouldSendNotificationAndroid()
  }, 1000*60*30);

}


function clearWebCron() {
  
  clearInterval(myInterval);
}

function clearAndroidCron() {
  clearInterval(myInterval);
}


module.exports = {
  notificationWebCron,
  notificationAndroidCron,
  clearWebCron,
  clearAndroidCron
};
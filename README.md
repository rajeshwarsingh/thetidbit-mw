

# COMMAND TO DEPLOY ON HEROKU
git push heroku main

# Web fcm push notification API
BASE URL : https://thetidbit-mw.herokuapp.com

# Web fcm push notification API
http://localhost:3001/sendWPToWeb

{
   
        "title": "This is a Notification",
        "body": "This is the body of the notification message.",
        "image":"https://fdn.gsmarena.com/imgroot/news/21/08/samsung-galaxy-watch4-series-ofic/-952x498w6/gsmarena_001.jpg"
    
  }

# Android fcm push notification API
http://localhost:3000/sendPushNotiAndroid

{
    "to": "",
    "sound": "default",
    "title": "Sanjay Dutt thought doing drugs",
    "body": "Actor Sanjay Dutt remembers the time when people used to call him ‘charsi (junkie)' and how he worked hard on himself to remove the tag.",
    "data": { "imageUrl":"https://tinyjpg.com/images/social/website.jpg","someData": "goes here" }
  }
const { info } = require('console');
const fs = require('fs')
var axios = require("axios").default;
var admin = require("firebase-admin");
var serviceAccount = require("../firebase-admin/thetidbit-project-firebase-adminsdk-t92yf-fbe09796e3.json");
const AndroidToken = require('../model/android_notification')
const WebToken = require('../model/web_notification')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const getToken = async (req, res) => {
    let platform = req.query.platform
    // console.log('step1 ')
    if (platform === 'android') {
        AndroidToken.find().exec((err, token) => {
            if (err) { return next(err); }
            if (!token) { return res.status(400).send({ error: "Cant get feedbacks of non-existing employee" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ token });
        })

    } else if (platform === 'web') {
        WebToken.find().exec((err, token) => {
            if (err) { return next(err); }
            if (!token) { return res.status(400).send({ error: "Cant get feedbacks of non-existing employee" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ token });
        })

    } else {
        // CHECK FILES EXIST
        if (fs.existsSync(`./webpushData.json`)) {
            let fileData = fs.readFileSync(`./webpushData.json`, 'utf8')
            fileData = JSON.parse(fileData)
            return res.send(fileData)
        } else {
            res.status(400).send({ msg: 'data not available' })
        }
    }


}

const setToken = async (req, res) => {
    let platform = req.query.platform

    // console.log('platform:', platform, req.query.token)
    if (platform === 'android') {
        let token = req.query.token

        // CHECK TOKEN ALREADY EXIST
        AndroidToken.findOne({ token }).exec((err, tokenDoc) => {
            if (err) { return next(err); }
            // if (!tokenDoc) { return res.status(400).send({ error: "Cant get feedbacks of non-existing employee" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            if (tokenDoc) {
                return res.json({ msg: `already exist ${tokenDoc}` })
            }
            // Save the token
            var SaveToken = new AndroidToken({ token });
            SaveToken.save(function (err, book) {
                if (err) return console.error(err);
                console.log(book.name + " saved to bookstore collection.");
                return res.send({ msg: "Token Saved in android" })
            });
        })



    } else if (platform === 'web') {
        // console.log('platform 2:', platform, req.query.token)
        let token = req.query.token

        // CHECK TOKEN ALREADY EXIST
        WebToken.findOne({ token }).exec((err, tokenDoc) => {
            if (err) { return next(err); }
            if (!token) { return res.status(400).send({ error: "Cant get feedbacks of non-existing employee" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            if (tokenDoc) {
                return res.json({ msg: `already exist ${tokenDoc}` })
            }
            // Save token
            var SaveTokenWeb = new WebToken({ token });
            SaveTokenWeb.save(function (err, book) {
                if (err) return console.error(err);
                console.log(book.name + " saved to web token collection.");
                return res.send({ msg: "Token Saved in web" })
            });
        })

    } else {
        let token = req.query.token
        if (token) {
            if (fs.existsSync(`./webpushData.json`)) {
                let fileData = fs.readFileSync(`./webpushData.json`, 'utf8')
                fileData = JSON.parse(fileData)

                // check token alrady exist
                // console.log(fileData.filter(item=>(item.token===token)).length )
                if ((fileData.filter(item => (item.token === token))).length > 0) {
                    return res.send('token already exist')
                } else {
                    fileData.push({ token: token })

                }

                await fs.unlinkSync(`./webpushData.json`)
                fs.writeFileSync(`./webpushData.json`, JSON.stringify(fileData), { flag: 'wx' })
                return res.send({ msg: 'ok' })
            } else {
                let fileData = [{ token }]
                if (fs.existsSync(`./webpushData.json`)) await fs.unlinkSync(`./webpushData.json`)
                fs.writeFileSync(`./webpushData.json`, JSON.stringify(fileData), { flag: 'wx' })


            }

            return res.send({ msg: 'ok' })
        } else {
            return res.status(400).send({ msg: 'token not found!' })
        }
    }


};

const sendWPToAndroid = async (req, res) => {

    let notification =  {}

    if(!req.body.title) return res.status(400).send({msg:"tital can't be blank"})
    if(!req.body.body) return res.status(400).send({msg:"body can't be blank"})

    if(req.body.title) notification.title = req.body.title
    if(req.body.body) notification.body = req.body.body
    if(req.body.image) notification.image = req.body.image
    if(req.body.newsIndex) notification.newsIndex = req.body.newsIndex

    const handleData = await _sendWPToAndroid(notification)
    // console.log('step1',handleData)
    const {statusCode='', msg=''} = handleData
    return res.status(statusCode).send({msg})




    AndroidToken.find().exec((err, token) => {
        if (err) { return next(err); }
        if (!token) { return res.status(400).send({ error: "Cant get feedbacks of non-existing employee" }); }

        let tokenSet = new Set()

        token.forEach(tokenEl => tokenSet.add(tokenEl.token));

        tokenSet.forEach(async (item) => {
            _sendWPToAndroid(item, req.body)
        })
    })
}

const sendWPToWeb = async (req, res) => {
    let notification =  {}

    if(!req.body.title) return res.status(400).send({msg:"tital can't be blank"})
    if(!req.body.body) return res.status(400).send({msg:"body can't be blank"})

    if(req.body.title) notification.title = req.body.title
    if(req.body.body) notification.body = req.body.body
    if(req.body.image) notification.image = req.body.image

    const handleData = await _sendWPToWeb(notification)
    // console.log('step1',handleData)
    const {statusCode='', msg=''} = handleData
    return res.status(statusCode).send({msg})
}

const _sendWPToAndroidold = async (notification) => {
    try{
        const token =  await AndroidToken.find()
        // console.log('step3')
        if (!token) { return  {statusCode:400, msg:`Can't get the token from mongo web_toke` }}
        // console.log("###########",token.length)
        if (token.length > 0) {
            let tokenSet = new Set()

            token.forEach(tokenEl => tokenSet.add(tokenEl.token));

            
            const registeredTokens =[]
            tokenSet.forEach(item=>registeredTokens.push(item))

            // console.log("registeredTokens :",registeredTokens)

            

            let response;
            try{
             const expoCallForAllNotiPromise =    registeredTokens.map(async(item)=>{
                    notification.to = item
                    // console.log("call expo:",notification)
                    return  axios.post('https://exp.host/--/api/v2/push/send', notification);
                })

                await Promise.all(expoCallForAllNotiPromise)
                return {statusCode:200, msg:`Successfully sent message` }
            // return {statusCode:200, msg:`Successfully sent message: ${response}` }
            }catch(ExpoErr){
                console.log("check errror blog:", ExpoErr)
                return {statusCode:400, msg:`Successfully sent message: ${ExpoErr}` } 
            }
        }
    }
    catch(err){
        return {statusCode:400, msg:`error in token returiving ${err}` }
    }










    // console.log('token:')
    // data.to = token

    // let payload = data

    // console.log('check expo noti payload:', payload)

    // await axios.post('https://exp.host/--/api/v2/push/send', payload);
}

const _sendWPToAndroid = async (notification) => {
    console.log("##############", notification)
    try{
        const token =  await AndroidToken.find()
        console.log('step3')
        if (!token) { return  {statusCode:400, msg:`Can't get the token from mongo web_toke` }}
        // console.log("###########",token.length)
        if (token.length > 0) {
            let tokenSet = new Set()

            token.forEach(tokenEl => tokenSet.add(tokenEl.token));

            // notification.icon ='https://thetidbit.in/tidbit.png'
            // notification.click_action = 'https://thetidbit.in'
            // notification.sound= 'default'
            // notification.badge = 'https://thetidbit.in/nintysix_tidbit.jpg'

            // var payload = { notification };

            let payload = {
                data: { newsInxShow: "true", newsInx: ((notification.newsIndex).toString()) },
                notification: { 
                    title: notification.title, 
                    body: notification.body,
                    image:notification.image
                 }
            };

            // console.log("check:",payload)


            // return {
            //     title:notification.title,
            //     "body": (description && description.length>=25?description.substr(0,25):description),
            //     "image": urlToImage,
            //     newsIndex:newsIndex
            //   }

            var options = {
                priority: "high",
                timeToLive: 60 * 60 * 24
            };
            
            const registeredTokens =[]
            tokenSet.forEach(item=>registeredTokens.push(item))

            // console.log("registeredTokens :",registeredTokens, payload, options)

            let response;
            try{
                // console.log("@@@@@@@@@@@@@",registeredTokens,payload)
                response = admin.messaging().sendToDevice(registeredTokens, payload, options)
            // console.log("Successfully sent message:", response);
            return {statusCode:200, msg:`Successfully sent message: ${response}` }
            }catch(firebaseErr){
                console.log("check errror blog:", firebaseErr)
                return {statusCode:400, msg:`Successfully sent message: ${firebaseErr}` } 
            }
        }
    }
    catch(err){
        return {statusCode:400, msg:`error in token returiving ${err}` }
    }




    //  console.log("check###########")
    // return await WebToken.find().exec((err, token) => {
    //     // if (err) return next(err)
    //     if (!token) { return  {statusCode:400, msg:`Can't get the token from mongo web_toke` }}
    //     console.log("###########",token.length)
    //     if (token.length > 0) {
    //         let tokenSet = new Set()

    //         token.forEach(tokenEl => tokenSet.add(tokenEl.token));

    //         admin.initializeApp({
    //             credential: admin.credential.cert(serviceAccount)
    //         });

    //         var payload = { notification };

    //         var options = {
    //             priority: "high",
    //             timeToLive: 60 * 60 * 24
    //         };
            
    //         const registeredTokens =[]
    //         tokenSet.forEach(item=>registeredTokens.push(item))

    //         console.log("registeredTokens :",registeredTokens, payload, options)

    //         admin.messaging().sendToDevice(registeredTokens, payload, options)
    //             .then(function (response) {
    //                 console.log("Successfully sent message:", response);
    //                 return {statusCode:200, msg:`Successfully sent message: ${response}` } 
    //             })
    //             .catch(function (error) {
    //                 console.log("check errror blog:", error)
    //                 return {statusCode:400, msg:`Successfully sent message: ${error}` } 
    //             });

    //     }

    //     // return res.send({msg:"token empty!"})        
    // })
}

const _sendWPToWeb = async (notification) => {
    try{
        const token =  await WebToken.find()
        console.log('step3')
        if (!token) { return  {statusCode:400, msg:`Can't get the token from mongo web_toke` }}
        // console.log("###########",token.length)
        if (token.length > 0) {
            let tokenSet = new Set()

            token.forEach(tokenEl => tokenSet.add(tokenEl.token));

            notification.icon ='https://thetidbit.in/tidbit.png'
            notification.click_action = 'https://thetidbit.in'
            // notification.sound= 'default'
            // notification.badge = 'https://thetidbit.in/nintysix_tidbit.jpg'

            var payload = { notification };

            var options = {
                priority: "high",
                timeToLive: 60 * 60 * 24
            };
            
            const registeredTokens =[]
            tokenSet.forEach(item=>registeredTokens.push(item))

            // console.log("registeredTokens :",registeredTokens, payload, options)

            let response;
            try{
                response = admin.messaging().sendToDevice(registeredTokens, payload, options)
            // console.log("Successfully sent message:", response);
            return {statusCode:200, msg:`Successfully sent message: ${response}` }
            }catch(firebaseErr){
                console.log("check errror blog:", firebaseErr)
                return {statusCode:400, msg:`Successfully sent message: ${firebaseErr}` } 
            }
        }
    }
    catch(err){
        return {statusCode:400, msg:`error in token returiving ${err}` }
    }




    //  console.log("check###########")
    // return await WebToken.find().exec((err, token) => {
    //     // if (err) return next(err)
    //     if (!token) { return  {statusCode:400, msg:`Can't get the token from mongo web_toke` }}
    //     console.log("###########",token.length)
    //     if (token.length > 0) {
    //         let tokenSet = new Set()

    //         token.forEach(tokenEl => tokenSet.add(tokenEl.token));

    //         admin.initializeApp({
    //             credential: admin.credential.cert(serviceAccount)
    //         });

    //         var payload = { notification };

    //         var options = {
    //             priority: "high",
    //             timeToLive: 60 * 60 * 24
    //         };
            
    //         const registeredTokens =[]
    //         tokenSet.forEach(item=>registeredTokens.push(item))

    //         console.log("registeredTokens :",registeredTokens, payload, options)

    //         admin.messaging().sendToDevice(registeredTokens, payload, options)
    //             .then(function (response) {
    //                 console.log("Successfully sent message:", response);
    //                 return {statusCode:200, msg:`Successfully sent message: ${response}` } 
    //             })
    //             .catch(function (error) {
    //                 console.log("check errror blog:", error)
    //                 return {statusCode:400, msg:`Successfully sent message: ${error}` } 
    //             });

    //     }

    //     // return res.send({msg:"token empty!"})        
    // })
}

module.exports = { setToken, getToken, sendWPToAndroid, sendWPToWeb,_sendWPToWeb,_sendWPToAndroid }


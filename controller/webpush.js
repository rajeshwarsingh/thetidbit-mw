const fs = require('fs')
var axios = require("axios").default;
const AndroidTOken =  require('../model/notification')

const getToken = async (req, res) => {
    let platform =req.query.platform
    console.log('step1 ')
    if(platform === 'android'){
        AndroidTOken.find().exec((err, token) => {
            if (err) { return next(err); }
            if (!token) { return res.status(400).send({ error: "Cant get feedbacks of non-existing employee"}); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ token });
        })

    }else{
        // CHECK FILES EXIST
    if (fs.existsSync(`./webpushData.json`)) {
        let fileData = fs.readFileSync(`./webpushData.json`, 'utf8')
        fileData = JSON.parse(fileData)
        return res.send(fileData)
    }else{
        res.status(400).send({msg:'data not available'})
    }
    }
    

}

const  setToken = async (req, res) => {
    let platform =req.query.platform
    if(platform === 'android'){
        let token =req.query.token
        var SaveToken = new AndroidTOken({ token });
        SaveToken.save(function (err, book) {
            if (err) return console.error(err);
            console.log(book.name + " saved to bookstore collection.");
            return res.send({msg:"Token Saved"})
          });

    }else{
    let token =req.query.token
    if(token){
        if (fs.existsSync(`./webpushData.json`)){
            let fileData = fs.readFileSync(`./webpushData.json`, 'utf8')
            fileData = JSON.parse(fileData)

            // check token alrady exist
            // console.log(fileData.filter(item=>(item.token===token)).length )
            if((fileData.filter(item=>(item.token===token))).length>0){
                return res.send('token already exist')
            }else{
                fileData.push({token:token})
                
            }
            
            await fs.unlinkSync(`./webpushData.json`)
             fs.writeFileSync(`./webpushData.json`, JSON.stringify(fileData), { flag: 'wx' })
             return res.send({msg:'ok'})
        }else{
            let fileData = [{token}]
            if (fs.existsSync(`./webpushData.json`)) await fs.unlinkSync(`./webpushData.json`)
            fs.writeFileSync(`./webpushData.json`, JSON.stringify(fileData), { flag: 'wx' })
            

        }
         
        return res.send({msg:'ok'})
    }else{
        return res.status(400).send({msg:'token not found!'})
    }
    }
    
    
};

const sendWPToAndroid = async(req, res)=>{
    AndroidTOken.find().exec((err, token) => {
        if (err) { return next(err); }
        if (!token) { return res.status(400).send({ error: "Cant get feedbacks of non-existing employee"}); }

        token.forEach(async(item)=>{
            _sendWPToAndroid(item.token, req.body)
        })

        const newTokenArr = []
        let arr = token.map((item)=>item.token)
        arr.forEach(item=>{
            if(!newTokenArr.includes(item)){
                newTokenArr.push(item)
            }
        })

        console.log('newTokenArr:',newTokenArr.length)
        console.log('token:',token.length)
        
        

        newTokenArr.forEach(async(item)=>{
            _sendWPToAndroid(item, req.body)
        })
        // const { requiringFeedbacks, submittedFeedbacks } = employee;
        // return res.json({ token });
    })
}


const _sendWPToAndroid = async(token, data)=>{
    console.log('token:')
    data.to = token

    let payload = data

    console.log('check expo noti payload:',payload)

    await axios.post('https://exp.host/--/api/v2/push/send', payload);
}

module.exports = { setToken, getToken, sendWPToAndroid }
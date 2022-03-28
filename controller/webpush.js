const fs = require('fs')

const getToken = async (req, res) => {
    // CHECK FILES EXIST
    if (fs.existsSync(`./webpushData.json`)) {
        let fileData = fs.readFileSync(`./webpushData.json`, 'utf8')
        fileData = JSON.parse(fileData)
        return res.send(fileData)
    }else{
        res.status(400).send({msg:'data not available'})
    }

}

const  setToken = async (req, res) => {
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
    
};


module.exports = { setToken, getToken }
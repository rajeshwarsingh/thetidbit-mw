const videosModel = require('../model/videos')
const { v4: uuidv4 } = require('uuid');

const getVideos = async (req, res) => {

    try{
        let videos = await videosModel.find()
        return res.send({videos})
    }catch(e){
        console.log('error in videos:',e)
        return res.status(400).send({videos:[]})
    }
}

const setVideos = async (req, res) => {

    let img=req.query.img,
    title=req.query.title,
    url=req.query.url,
    code=req.query.code,
    description=req.query.description,
    tags=req.query.tags,
    category=req.query.category;

let body ={
    img,
    title,
    url,
    code,
    description,
    tags,
    category
}

// console.log("&&&&&&&&&&",body)

// http://localhost:3001/setVideos?img=https://www.youtube.com/shorts/-KXRLIS0Kzg&title=stock&url=https://www.youtube.com/shorts/-KXRLIS0Kzg&code=-KXRLIS0Kzg&description=''

    try{
        var SaveToken = new videosModel(body);
            let data = await SaveToken.save()
        return res.send({data})
    }catch(e){
        console.log('error in videos:',e)
        return res.status(400).send({videos:[]})
    }


    
}

module.exports = { getVideos, setVideos }


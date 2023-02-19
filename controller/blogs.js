const BlogsModel = require('../model/blogs')
const CommentsModel = require('../model/comments')
const { v4: uuidv4 } = require('uuid');

const _getInvestmentGuru = async(req, res)=>{

    if(req.query.title){

        BlogsModel.findOne({title:req.query.title}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }else{

        BlogsModel.find({category:'investmentguru'}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }
    
}
const _getLabourAdvisor = async(req, res)=>{

    if(req.query.title){

        BlogsModel.findOne({title:req.query.title}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }else{

        BlogsModel.find({category:'labouradvisor'}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }

}
const _getBussiness = async(req, res)=>{
    if(req.query.title){

        BlogsModel.findOne({title:req.query.title}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }else{

        BlogsModel.find({category:'bussiness'}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }
}

const _getStockAnalysis = async(req, res)=>{

    if(req.query.title){

        BlogsModel.findOne({title:req.query.title}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }else{

        BlogsModel.find({category:'stockanalysis'}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }

    
}

const _getStartup = async(req, res)=>{
    if(req.query.title){

        BlogsModel.findOne({title:req.query.title}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }else{

        BlogsModel.find({category:'startup'}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }
}

const _getMiscellaneous = async(req, res)=>{
    if(req.query.title){

        BlogsModel.findOne({title:req.query.title}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }else{

        BlogsModel.find({category:'miscellaneous'}).exec((err, blogs) => {
            if (err) { return next(err); }
            if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
            // const { requiringFeedbacks, submittedFeedbacks } = employee;
            return res.json({ blogs });
        })

    }

    
}

const getBlogs = async (req, res) => {
    let category = req.params.id
    if(category=== 'investmentguru') return _getInvestmentGuru(req,res)
    if(category=== 'labouradvisor') return _getLabourAdvisor(req,res)
    if(category=== 'bussiness') return _getBussiness(req,res)
    if(category=== 'stockanalysis') return _getStockAnalysis(req,res)
    if(category=== 'startup') return _getStartup(req,res)
    if(category=== 'miscellaneous') return _getMiscellaneous(req,res)
    console.log('Category not matched!')
    // BlogsModel.find({}).exec((err, blogs) => {
    //     if (err) { return next(err); }
    //     if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
    //     // const { requiringFeedbacks, submittedFeedbacks } = employee;
    //     return res.json({ blogs });
    // })
}

const getBlogById = async (req, res) => {
    try {
        let blogId = req.params.blogId
        if(!blogId) return res.status(400).send({msg:'blogId not found'})
        const blog = await BlogsModel.findOne({ blogId });
        res.send({blog})
    } catch (e) {
        console.log('Error in getBlogById:', e)
        return res.status(400).send({msg:'Error in retriving blog'})
    }
}

const getFeaturedBlogs = async (req, res) => {
    
    BlogsModel.find({}).exec((err, blogs) => {
        if (err) { return next(err); }
        if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
        // const { requiringFeedbacks, submittedFeedbacks } = employee;
        return res.json({ blogs });
    })
}

const getTipsBlogs = async (req, res) => {
    
    BlogsModel.find({}).exec((err, blogs) => {
        if (err) { return next(err); }
        if (!blogs) { return res.status(400).send({ msg: "Data not found!" }); }
        // const { requiringFeedbacks, submittedFeedbacks } = employee;
        return res.json({ blogs });
    })
}

const getComments = async (req, res) => {
    
    let blogId = req.params.id
    // if(category=== 'investmentguru') return _getInvestmentGuru(req,res)
    // if(category=== 'labouradvisor') return _getLabourAdvisor(req,res)
    // if(category=== 'bussiness') return _getBussiness(req,res)
    // if(category=== 'stockanalysis') return _getStockAnalysis(req,res)
    // if(category=== 'startup') return _getStartup(req,res)
    // if(category=== 'miscellaneous') return _getMiscellaneous(req,res)
    // console.log('Category not matched!')
    CommentsModel.find({blogId:req.params.id}).exec((err, comments) => {
        if (err) { return next(err); }
        if (!comments) { return res.status(400).send({ msg: "Data not found!" }); }
        // const { requiringFeedbacks, submittedFeedbacks } = employee;
        return res.json({ comments });
    })
}

const createComment = async(req, res)=>{

    if(!req.body.blogId || !req.body.user || !req.body.comment || !req.body.category){
        return res.status(400).send({msg:"invalid request"})
    }
    let body = {
        commentId: uuidv4(),
        blogId: req.body.blogId,
        user: req.body.user,
        comment: req.body.comment,
        reply: [],
        datetime: new Date(),
        category:req.body.category
    }

    var SaveComment = new CommentsModel(body);
    SaveComment.save(function (err, comment) {
            if (err) return console.error(err);
            return res.send({ msg: "comment Saved" })
        });
}

const updateComment = async(req, res)=>{
    let reply = req.body.reply
    let commentId = req.body.commentId

    if(!commentId) return res.status(400).send({msg:"invalid request"})
    if(!reply.reply || !reply.user) return res.status(400).send({msg:"invalid request"})

    CommentsModel.findOne({ _id:commentId }).exec((err, commentDoc) => {
        if (err) { return next(err); }
        if (!commentDoc) { return res.status(400).send({ error: "Cant get feedbacks of non-existing employee" }); }
        // const { requiringFeedbacks, submittedFeedbacks } = employee;
        reply.replyId = uuidv4()
        reply.datetime = new Date()
        commentDoc.reply.push(reply)
        // Save the token
        var SaveDoc = new CommentsModel(commentDoc);
        SaveDoc.save(function (err, book) {
            if (err) return console.error(err);
            console.log(book.name + " saved to bookstore collection.");
            return res.send({ msg: "reply updated" })
        });
    })

}

module.exports = { getBlogs, getBlogById, getFeaturedBlogs, getTipsBlogs, getComments, createComment,updateComment }


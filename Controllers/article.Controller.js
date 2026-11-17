const Joi = require('joi');
const ArticleModel = require('../Models/article.Models')


//POST Article controller
const postArticle =async(req ,res ,next) => {

    const articleSchema = Joi.object({
        Title: Joi.string().min(5).required(),
        Content : Joi.string().min(20).required(),
        Author : Joi.string().optional().min(2).default('Guest'),
    });

    const {value ,error} = articleSchema.validate(req.body);

    if(error){
         return res.status(400).json('Please provide a valid Tilte and Content');}

    try {
        const articles = new ArticleModel(value);
        await articles.save();

        return res.status(200).json({
            message: "Article created",
            data: articles
        })

    } catch (error) {
        next(error)
    }
}


//GET All Articles Controller
const getAllArticles =async(req ,res ,next) => {

    try {
        const {limit = 10   ,page = 1} =   req.query;
        const skip = (page-1)*limit;

         const articles = await ArticleModel.find({}).
         sort({createdAt : -1})
         .limit(limit)
         .skip(skip)
         ;
    return res.status(200).json({
        message: "Data fetched successfully",
        data: articles
    })}
    catch (error) {
        console.error(error);
        next(error);
}
}

//GET Artcles by ID Controller
const getArticleById =async(req ,res ,next) => {

    const Id = req.params.id;

    try {
        const articles = await ArticleModel.findById(Id);

        if(!articles){
            res.status(404).json(`Article with ${Id} does not exist`)
        } 
        else return res.status(200).json({
            message: `Article with Id: ${Id} successfully retrieved`,
            data: articles
        })

    } catch (error) {
        console.error(error);
        next(error);
    }
}




//Update Article by ID
const updateArticleById =async(req ,res ,next) => {

    const articleSchema = Joi.object({
        Title: Joi.string().min(5).optional(),
        Contet : Joi.string().min(20).optional(),
        Author : Joi.string().optional().min(2).default('Guest'),
    });

       const {error ,value} = articleSchema.validate({value});

    try {
        const Id = req.params.id ;

        const article = await ArticleModel.findByIdAndUpdate(
            Id,
            {...req.body},
            {
                new:true,
                runValidators :true,
            }
        );

       

        if(!article){
            res.status(404).json(`Article with ${Id} does not exist`)
        } 
        else {
            res.status(200).json({
               message: `Article with Id: ${Id} successfully updated`,
               data: article
            })
        }

    } catch (error) {
        console.error(error)
        next(error)
    }
}


//Delete Article by ID
   const deleteArticleById =async(req ,res ,next) => {

    try {
        const Id =req.params.id;

        const article = await ArticleModel.findByIdAndDelete(Id);

        if(!article){
            res.status(404).json(`Article with Id ${Id} does not exist`);
        }
        else{
            res.status(200).json({
              message: `Article with Id: ${Id} successfully updated`,
              data: article
            })
        }

    } catch (error) {
        next(NativeError)
    }
}

module.exports ={
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticleById,
    deleteArticleById
}
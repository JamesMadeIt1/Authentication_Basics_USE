const Joi = require('joi');
const ArticleModel = require('../Models/article.Models');

//POST Article controller
const postArticle =async(req ,res ,next) => {

    const articleSchema = Joi.object({
        Title: Joi.string().min(5).required(),
        Content : Joi.string().min(20).required(),
        Author : Joi.string().optional().min(2).default('Guest'),
    });

    const {value ,error} = articleSchema.validate(req.body);

    if(error){
         return res.status(400).json('Please provide a valid Title and Content');}

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

         const articles = await ArticleModel.find({})
             .sort({ createdAt: -1 })
             .limit(Number(limit))
             .skip(Number(skip));
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

        if (!articles) {
            return res.status(404).json(`Article with ${Id} does not exist`);
        }
        return res.status(200).json({
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
        Content: Joi.string().min(20).optional(),
        Author: Joi.string().min(2).optional()
    }).min(1).unknown(false);

    const { error, value } = articleSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message)
        });
    }

    try {
        const Id = req.params.id ;

        const article = await ArticleModel.findByIdAndUpdate(
            Id,
            value,
            {
                new:true,
                runValidators :true,
            }
        );

       

        if (!article) {
            return res.status(404).json(`Article with ${Id} does not exist`);
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

        if (!article) {
            return res.status(404).json(`Article with Id ${Id} does not exist`);
        }
        else{
            res.status(200).json({
              message: `Article with Id: ${Id} successfully deleted`,
              data: article
            })
        }

    } catch (error) {
        next(error);
    }
}

module.exports ={
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticleById,
    deleteArticleById
}
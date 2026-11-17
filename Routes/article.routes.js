const express =require('express')
const {
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticleById,
    deleteArticleById} = require('../Controllers/article.Controller')

const router = express.Router();

//POST articles Endpoint
router.post('/articles' ,postArticle)


//GET all articles
router.get('/articles',getAllArticles)


//Get article By Id
router.get('/article/:id',getArticleById)


//Update article By Id
router.put('/article/:id',updateArticleById)


//Delete article By Id
router.delete('/article/:id',deleteArticleById)

module.exports = router;
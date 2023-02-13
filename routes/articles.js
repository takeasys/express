var express = require("express");
var router = express.Router();
const ArticleService = require("../services/article")

/* GET users listing. */
router.get("/", async function (req, res, next) {
    const articles = await ArticleService.getAllArticles();
    res.send(articles)
});

router.get("/add", async function(req, res, next) {
    const createdArticle =  await ArticleService.createArticle({
        title: "Demo Article",
        body: `The time now is :${new Date().toLocaleString()}.`,
    });
    res.json(createdArticle);
})

module.exports = router;

var express = require("express");
var router = express.Router();
const ArticleService = require("../services/article")
const connectMongoDb = require("../db/mongodb");

/* GET users listing. */
router.get("/", async function (req, res, next) {
    // const articles = await ArticleService.getAllArticles();

    await connectMongoDb("demo", async (db) => {
        const articleConnection = await db.collection("articles");

        const cursor = articleConnection.find({});
        // await cursor.forEach(doc => console.log(doc));
        
        res.send(await cursor.toArray());

        cursor.close();
    });
    
});

router.get("/add", async function(req, res, next) {
    const createdArticle =  await ArticleService.createArticle({
        title: "Demo Article",
        body: `The time now is :${new Date().toLocaleString()}.`,
    });
    res.json(createdArticle);
})

module.exports = router;

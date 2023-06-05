const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const urlencoded = bodyParser.urlencoded({extended:false})
const nlp = require("compromise")
const Sentiment = require("sentiment")
const sentiment = new Sentiment();
const natural = require("natural")

router.get("/", (req,res)=>
{
    res.render('predict')
})

router.get("/people",(req,res)=>{
    res.render('people')
})

router.post("/people",urlencoded,(req,res)=>{
    var doc = nlp(req.body.message)
    var sentences = doc.topics().organizations().text()
    res.render('result',{result:sentences})
})

router.get("/predict", (req,res)=>{
    res.render('predict')
})
router.post("/predict", urlencoded, (req, res) => {
    var doc = nlp(req.body.message);
    var sentences = doc.sentences().toPastTense().out('text'); // Extract the text of each sentence
    res.render('result', { result: sentences }); // Join sentences and pass as result
});

router.get("/sentiments",(req,res)=>{
    res.render('sentiment')
})

router.post("/sentiments", urlencoded, (req, res) => {
    const x = sentiment.analyze(req.body.message);
    const lowercaseResult = JSON.stringify(x); // Convert result to lowercase
    res.render('result', { result: lowercaseResult });
});

router.get("/stem",(req,res)=>{
    res.render('stem')
})

router.post("/stem", urlencoded, (req, res) => {
    const x = natural.PorterStemmer.stem(req.body.message);
    const lowercaseResult = JSON.stringify(x); // Convert result to lowercase
    res.render('result', { result: lowercaseResult });
});

module.exports = router;
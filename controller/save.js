const express = require('express');
const router = express.Router();
const Submissions = require("../model/submissions");
const { savePDF } = require("../services/savePDF");

router.get("/", function(req, res) {
    Submissions.find({}, function(err, allDetails) {
        if(err) {
            console.log(err);
        } else {
            res.render("main", { details: allDetails })
        }
    })
});

router.post("/save", (req, res) => {
    const url = req.body.url
    var myData = new Submissions(req.body);
    myData
        .save(function(err){
            if(err){
                console.log(err)
            }
            const submissionID = myData.id
            savePDF(submissionID,url);
            res.redirect("/")
        })
        // //.then(savePDF(url))
        // .then(item => {
        //     res.redirect("/")
        // })
        // .catch(err => {
        //     res.status(400).send("Unable to save to database");
        // });
})

module.exports = router;
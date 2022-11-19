const express = require('express');
const router = express.Router();
const Submissions = require("../model/submissions");
const { savePDF } = require("../services/savePDF");

router.get("/", function(req, res) {
    Submissions.find({}, function(err, allDetails) {
        if(err) {
            console.log(err);
        } else {
            res
            .json(allDetails)
            .status(200);
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
        })
    res.sendStatus(200);
})

module.exports = router;
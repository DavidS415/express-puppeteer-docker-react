const puppeteer = require('puppeteer');
const Submissions = require("../model/submissions");

const savePDF = async(submissionID,url) => {
    console.log(submissionID)
    console.log(url)
    const baseURL = process.env.BASE_URL
    const saveURL = baseURL + submissionID + '.pdf'
    const savePath = './files/' + submissionID + '.pdf'
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});
    const pageTitle = await page.title();
    const pdf = await page.pdf({ 
        path: savePath,
        format: 'A4'
    });
    await browser.close();
    const data = await Submissions.findByIdAndUpdate(submissionID, { filePath: saveURL, title: pageTitle }, function (err){

        if(err){
        
            console.log(err);
        }
    })
    .then(function(result) {
        result = result;
    })
    .catch(complete => {
        return complete;
    })
    return data + pdf;
}

module.exports = {
    savePDF,
  };
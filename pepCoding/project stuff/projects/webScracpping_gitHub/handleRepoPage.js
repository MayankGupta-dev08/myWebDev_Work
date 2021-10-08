const fs = require('fs');
const path = require('path');
const pdfkit = require('pdfkit');
const request = require('request');
const cheerio = require('cheerio');

function handleRepoLinks(fullRepoLink, dirPath) {
    request(fullRepoLink, function (err, resp, htmlData) {
        if (err) {
            console.log(err);
        } else if (resp.statusCode == 404) {
            console.log("Page not found!");
        } else {
            // console.log("Response:", resp && resp.statusCode);
            getIssuePageOfRepo(htmlData, dirPath);
        }
    })
}

function getIssuePageOfRepo(htmlData, dirPath) {
    let $ = cheerio.load(htmlData);
    let fileName = $(".mr-2.flex-self-stretch a").text().trim();
    let jsonFilePath = path.join(dirPath, fileName + ".json");

    console.log("```````````````````````````````");
    console.log(path.basename(dirPath));
    console.log("```````````````````````````````");

    let JSObj = [];
    let issuesElems = $(".flex-auto.min-width-0.p-2.pr-3.pr-md-2 a");
    for (let i = 0; i < issuesElems.length; i++) {
        let issueName = $(issuesElems[i]).text().trim();
        let issueLink = $(issuesElems[i]).attr("href");
        issueLink = `https://www.github.com${issueLink}`;

        let issueObj = {
            issueName: issueName,
            issueLink: issueLink
        }
        JSObj.push(issueObj);
    }
    console.log(JSObj); // to write it in file we need to stringfy JSO

    let JSOstr = JSON.stringify(JSObj);
    fs.writeFileSync(jsonFilePath, JSOstr, 'utf-8');

    let pdfFilePath = path.join(dirPath, fileName + ".pdf");
    // create a pdf file using pdfkit module
    let newPdfFile = new pdfkit();
    newPdfFile.pipe(fs.createWriteStream(pdfFilePath));
    newPdfFile.text(JSOstr);
    newPdfFile.end();
}

module.exports = handleRepoLinks;
const fs = require('fs');
const path = require('path');
const pdfkit = require('pdfkit');
const request = require('request');
const cheerio = require('cheerio');

const url = "https://github.com/topics";

request(url, function (err, resp, html) {
    if (err) {
        console.log(err);
    } else if (resp.statusCode == 404) {
        console.log("Page not found!");
    } else {
        // console.log("Response:", resp && resp.statusCode);
        extractLinks(html);
    }
})

function extractLinks(html) {
    let $ = cheerio.load(html);
    let top3Elems = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < top3Elems.length; i++) {
        const link = $(top3Elems[i]).attr("href");
        fullLink = `https://github.com${link}`;
        console.log(fullLink);
        handlePageLink(fullLink);
    }
}

function handlePageLink(fullLink) {
    request(fullLink, function (err, resp, htmlData) {
        if (err) {
            console.log(err);
        } else if (resp.statusCode == 404) {
            console.log("Page not found!");
        } else {
            // console.log("Response:", resp && resp.statusCode);
            extractT8RepoOfPage(htmlData);
        }
    })
}

function extractT8RepoOfPage(html) {
    let $ = cheerio.load(html);
    
    let mainDirPath = path.join(__dirname, "githubTopics");
    createDir(mainDirPath);
    
    let NameElem = $(".col-sm-10.d-flex.flex-items-center.mb-3.mb-sm-0 h1");
    let dirName = $(NameElem).text().trim();
    let dirPath = path.join(mainDirPath, dirName);
    createDir(dirPath);

    let top8RepoElem = $(".f3.color-text-secondary.text-normal.lh-condensed");
    for (let i = 0; i < 8; i++) {
        let anchorElems = $(top8RepoElem[i]).find("a");
        let repoLink = $(anchorElems[1]).attr("href")
        let fullRepoLink = "https://github.com" + repoLink + "/issues";
        console.log(fullRepoLink);
        handleRepoLinks(fullRepoLink, dirPath);
    }
}

function createDir(dirPath) {
    if (fs.existsSync(dirPath) == false) {
        fs.mkdirSync(dirPath)
    }
}

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
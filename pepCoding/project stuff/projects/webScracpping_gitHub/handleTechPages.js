const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

const handleRepoLinks = require("./handleRepoPage");

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

module.exports = handlePageLink;
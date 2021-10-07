const request = require('request');
const cheerio = require('cheerio');

const handleMLObj = require('./oneMatchDetail');

// requesting for mainPageLink and calling extractMainHtml(mainHtml)
function getAllMatchesLinks(mainPageLink) {
    request(mainPageLink, function (err, resp, mainHtml) {
        if (err) {
            console.log(err);
        } else {
            // console.log("response: ", resp && resp.statusCode);
            extractMainHtml(mainHtml);
        }
    })
}

// extracting links of all scoreCards of every match
function extractMainHtml(mainHtml) {
    let $ = cheerio.load(mainHtml);
    let scoreCardElems = $('a[data-hover="Scorecard"]');
    for (let i = 0; i < scoreCardElems.length; i++) {
        let link = $(scoreCardElems[i]).attr("href");
        let oneMatchLink = "https://www.espncricinfo.com" + link;
        console.log(oneMatchLink);

        handleMLObj.handleMLKey(oneMatchLink);
    }
}

module.exports = {
    getAMLKey: getAllMatchesLinks,
}
const request = require('request');
const cheerio = require('cheerio');

const handlePageLink = require('./handleTechPages');

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
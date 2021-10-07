/* mainDir --> IPL2020
   └──> teamDir(s)
   └──> playerExcelFile(s) (both for batsamn and bowler)
        ├──> for a match (same for both teams) --> match no., venue, date, team1, team2, result
            ├──> for a player --> name, ownteam, opponent
            ├──> for a batsman --> runs, dismissal balls, fours, sixes, sr.
            ├──> for a bowler --> overs, maiden, runs, wickets, economy
*/

const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

const getAMLObj = require('./getAllLinks')

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

// requesting for the given url and calling handleHtml(html)
request(url, function funcCB(err, resp, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log("response: ", resp && resp.statusCode);
        handleHtml(html);
    }
})

// extracting link of the mainPage from where we can get links to all matches
function handleHtml(html) {
    let $ = cheerio.load(html);
    let anchorElem = $('a[data-hover="View All Results"]');
    let link = anchorElem.attr("href");
    let fullLink = 'https://www.espncricinfo.com' + link;
    // console.log(fullLink);

    getAMLObj.getAMLKey(fullLink);
}
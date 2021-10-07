// npm init -y
// npm install request
// npm install cheerio
// npm install chalk

const fs = require('fs');
// const path = require('path');
// const chalk = require('chalk');
const request = require('request');
const cheerio = require('cheerio');

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

    getAllMatchesLinks(fullLink);
}

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
        // console.log(oneMatchLink);

        handleMatchLink(oneMatchLink);
    }
}

// requesting one matchLink at a time and further handling it
function handleMatchLink(matchLink) {
    request(matchLink, function (err, resp, matchHtml) {
        if (err) {
            console.log(err);
            console.log("response: ", resp && resp.statusCode);
        } else {
            getMatchDetails(matchHtml);
        }
    })
}

// getting matchDetails from the provided html
function getMatchDetails(matchHtml) {
    // match no, venue, date --> ".header-info .description"
    // result --> ".match-info.match-info-MATCH.match-info-MATCH-half-width .status-text"

    let $ = cheerio.load(matchHtml);
    let descrpElem = $(".header-info .description");
    let resultElem = $(".match-info.match-info-MATCH.match-info-MATCH-half-width .status-text");

    let descrpArray = descrpElem.text().split(",");
    let matchName = descrpArray[0].trim();
    let venue = descrpArray[1].trim();
    let date = descrpArray[2].trim();
    let result = resultElem.text().trim();

    console.log(`-----------------------------------------------------------------------`);
    console.log(`${matchName}, ${venue}, ${date}, ${result}`);
    console.log(`-----------------------------------------------------------------------`);

    let inningsElemArray = $(".card.content-block.match-scorecard-table > .Collapsible");
    for (let i = 0; i < inningsElemArray.length; i++) {
        let teamName = $(inningsElemArray[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        console.log(`~~~~~~~~~~~~~~~~~~~${teamName}~~~~~~~~~~~~~~~~~~~`);

        let iNot = (i == 0) ? 1 : 0;
        let oppTeamName = $(inningsElemArray[iNot]).find("h5").text();
        oppTeamName = oppTeamName.split("INNINGS")[0].trim();

        let allRowsBatsmanTable = $(inningsElemArray[i]).find(".table.batsman tbody tr");
        for (let j = 0; j < allRowsBatsmanTable.length; j++) {
            let allColsForARow = $(allRowsBatsmanTable[j]).find("td");
            let worthyRow = $(allColsForARow[0]).hasClass("batsman-cell");
            if (worthyRow == true) {
                let playerName = $(allColsForARow[0]).text().trim();
                let runsScored = $(allColsForARow[2]).text().trim();
                let ballsTaken = $(allColsForARow[3]).text().trim();
                let fours = $(allColsForARow[5]).text().trim();
                let sixes = $(allColsForARow[6]).text().trim();
                let strikeRate = $(allColsForARow[7]).text().trim();

                console.log(`${playerName}, ${oppTeamName}, ${runsScored}, ${ballsTaken}, ${fours}, ${sixes}, ${strikeRate}`);
            }
        }
    }
}

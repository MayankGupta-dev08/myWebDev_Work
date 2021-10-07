/* Highest wicket taker from winning team */

// npm init -y
// npm install request
// npm install cheerio
// npm install chalk

const request = require('request');
const cheerio = require('cheerio'); // for parsing the content and extracting data from html
const chalk = require('chalk'); // for colored text on console
const fs = require('fs');

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

// console.log("Before");
request(url, funcCB)
// console.log("After");

function funcCB(err, resp, html) {
    if (err) {
        console.log("error: ", err);
    } else {
        console.log("response: ", resp && resp.statusCode);
        handleHtml(html);
    }
}

function handleHtml(html) {
    let $ = cheerio.load(html);
    // $ -> searches in the whole page,  
    let teamNameArray = $(".match-info.match-info-MATCH.match-info-MATCH-half-width .teams .team");
    let winningTeamName, lossingTeamName;
    for (let i = 0; i < teamNameArray.length; i++) {
        let elemHasClass = $(teamNameArray[i]).hasClass("team-gray");
        // now we want ot search inside our element, for this we will use find()
        let teamNameElem = $(teamNameArray[i]).find(".name");
        if (elemHasClass) {
            lossingTeamName = teamNameElem.text().trim();
        } else {
            winningTeamName = teamNameElem.text().trim();
        }
    }
    console.log(chalk.blueBright.bold.underline("IPL2020 ->"), chalk.redBright.bold.underline(lossingTeamName), "vs", chalk.yellowBright.bold.underline(winningTeamName));
    console.log(chalk.blueBright.bold.underline("Winner:"), chalk.yellowBright.bold.underline(winningTeamName), "🥇\n");

    /* creating nickNames of the two teams */
    let wTeamNameArray = winningTeamName.split(" ");
    let lTeamNameArray = lossingTeamName.split(" ");
    let winTeamNickName = "", lossTeamNickName = "";
    for (let i = 0; i < wTeamNameArray.length; i++) {
        winTeamNickName += wTeamNameArray[i].charAt(0);
    }
    // console.log(winTeamNickName);

    for (let i = 0; i < lTeamNameArray.length; i++) {
        lossTeamNickName += lTeamNameArray[i].charAt(0);
    }
    // console.log(lossTeamNickName);

    let scorecardTableArr = $('.card.content-block.match-scorecard-table .Collapsible');
    // let htmlStr = "";
    for (let i = 0; i < scorecardTableArr.length; i++) {
        // let currHtml = $(scorecardTableArr[i]).html();
        // htmlStr += currHtml;

        /* team name */
        let teamNameElem = $(scorecardTableArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();

        let hwTaker, hWickets = 0;
        if (teamName == lossingTeamName) {
            let allOppBowlerArr = $(scorecardTableArr[i]).find("table.bowler tbody tr");
            for (let j = 0; j < allOppBowlerArr.length; j++) {
                let allColsOfaPlayerElem = $(allOppBowlerArr[j]).find("td");
                let isBowlerCol = $(allColsOfaPlayerElem[0]).hasClass("text-nowrap");
                if (isBowlerCol == true) {
                    let bowlerName = $(allColsOfaPlayerElem[0]).text().trim();
                    let bowlerWickets = $(allColsOfaPlayerElem[4]).text().trim();
                    if (bowlerWickets >= hWickets) {
                        hwTaker = bowlerName;
                        hWickets = bowlerWickets;
                    }
                }
            }
            console.log(chalk.greenBright(`Highest wicket taker of the match from winning team:-`));
            console.log(chalk.yellowBright(`${winTeamNickName}'s ${hwTaker}: ${hWickets} wickets.\n`));
        }

        let hRunScorer, hRuns = 0;
        if (teamName == winningTeamName) {
            let allBatsmanArray = $(scorecardTableArr[i]).find(".table.batsman tbody tr");
            for (let j = 0; j < allBatsmanArray.length; j++) {
                let allColsOfaPlayerElem = $(allBatsmanArray[j]).find("td");
                let isBatsmanCol = $(allColsOfaPlayerElem[0]).hasClass("batsman-cell");
                if (isBatsmanCol == true) {
                    let batsmanName = $(allColsOfaPlayerElem[0]).text().trim();
                    let runsOfBatter = $(allColsOfaPlayerElem[2]).text().trim();
                    if (runsOfBatter >= hRuns) {
                        hRunScorer = batsmanName;
                        hRuns = runsOfBatter;
                    }
                }
            }
            console.log(chalk.magentaBright(`Highest run scorer of the match from winning team:-`));
            console.log(chalk.yellowBright(`${winTeamNickName}'s ${hRunScorer}: ${hRuns} runs.`));
        }
    }
    // fs.appendFileSync("scoreCardTable.html", htmlStr, "utf-8");
}

/* 
IPL2020 -> Kings XI Punjab vs Chennai Super Kings
Winner: Chennai Super Kings 🥇

Highest wicket taker of the match from winning team:-
CSK's Lungi Ngidi: 3 wickets.

Highest run scorer of the match from winning team:-
CSK's Ruturaj Gaikwad: 62 runs.
*/
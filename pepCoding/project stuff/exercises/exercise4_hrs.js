/* Highest run scored by batsman from both the teams in the match */

// npm init -y
// npm install request
// npm install cheerio
// npm install chalk

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio'); // for parsing the content and extracting data from html
const chalk = require('chalk'); // for colored text on console

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
        let teamNameElem = $(teamNameArray[i]).find(".name");
        if (elemHasClass) {
            lossingTeamName = teamNameElem.text().trim();
        } else {
            winningTeamName = teamNameElem.text().trim();
        }
    }
    console.log(chalk.blueBright.bold.underline("IPL2020 ->"), chalk.redBright.bold.underline(lossingTeamName), "vs", chalk.yellowBright.bold.underline(winningTeamName));

    let scorecardTableArr = $('.card.content-block.match-scorecard-table .Collapsible');
    for (let i = 0; i < scorecardTableArr.length; i++) {
        /* team name */
        let teamNameElem = $(scorecardTableArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        console.log(chalk.whiteBright.bold.underline(`\nFrom team ${teamName}:-`));

        let hRunScorer, hRuns = 0, ballsTaken;
        let allBatsmanArray = $(scorecardTableArr[i]).find(".table.batsman tbody tr");
        for (let j = 0; j < allBatsmanArray.length; j++) {
            let allColsOfaPlayerElem = $(allBatsmanArray[j]).find("td");
            let isBatsmanCol = $(allColsOfaPlayerElem[0]).hasClass("batsman-cell");
            if (isBatsmanCol) {
                let batsmanName = $(allColsOfaPlayerElem[0]).text().trim();
                let runsOfBatter = $(allColsOfaPlayerElem[2]).text().trim();
                let ballsOfBatter = $(allColsOfaPlayerElem[3]).text().trim();
                if (runsOfBatter >= hRuns) {
                    hRunScorer = batsmanName;
                    hRuns = runsOfBatter;
                    ballsTaken = ballsOfBatter;
                }
                console.log(chalk.greenBright(`└──${batsmanName}: ${runsOfBatter} runs in ${ballsOfBatter} balls.`));
            }
        }
        console.log(chalk.cyanBright(`Highest run scorer from ${teamName}:-`));
        console.log(chalk.magentaBright(`${hRunScorer}: ${hRuns} runs in ${ballsTaken} balls.`));
    }
    console.log(chalk.blueBright.bold.underline("\nWinner:"), chalk.yellowBright.bold.underline(winningTeamName), "🥇");
}

/* 
IPL2020 -> Kings XI Punjab vs Chennai Super Kings

From team Kings XI Punjab:-└──KL Rahul (c)†: 29 runs in 27 balls.
└──Mayank Agarwal: 26 runs in 15 balls.
└──Chris Gayle: 12 runs in 19 balls.
└──Nicholas Pooran: 2 runs in 6 balls.
└──Mandeep Singh: 14 runs in 15 balls.
└──Deepak Hooda: 62 runs in 30 balls.
└──James Neesham: 2 runs in 3 balls.
└──Chris Jordan: 4 runs in 5 balls.
Highest run scorer from Kings XI Punjab:-
Deepak Hooda: 62 runs in 30 balls.

From team Chennai Super Kings:-
└──Ruturaj Gaikwad: 62 runs in 49 balls.
└──Faf du Plessis: 48 runs in 34 balls.
└──Ambati Rayudu: 30 runs in 30 balls.
Highest run scorer from Chennai Super Kings:-
Ruturaj Gaikwad: 62 runs in 49 balls.

Winner: Chennai Super Kings 🥇
*/
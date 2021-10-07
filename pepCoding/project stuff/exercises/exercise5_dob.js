/* Birthday of every batsman played in an innings in the match */

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

        let allBatsmanArray = $(scorecardTableArr[i]).find(".table.batsman tbody tr");
        for (let j = 0; j < allBatsmanArray.length; j++) {
            let allColsOfaPlayerElem = $(allBatsmanArray[j]).find("td");
            let isBatsmanCol = $(allColsOfaPlayerElem[0]).hasClass("batsman-cell");
            if (isBatsmanCol) {
                let hrefBatsman = $(allColsOfaPlayerElem[0]).find("a").attr("href");
                batsmanPageLink = "https://www.espncricinfo.com" + hrefBatsman;
                
                let batsmanName = $(allColsOfaPlayerElem[0]).text().trim();
                getBatsmanDOB(batsmanPageLink, batsmanName, teamName);
            }
        }
    }
}

function getBatsmanDOB(url, batsmanName, teamName) {
    
    request(url, function (err, resp, html) {
        if (err) {
            console.log("error: ", err);
        } else {
            // console.log("response: ", resp && resp.statusCode);
            getDobHelper(html, batsmanName, teamName);
        }
    })
}

function getDobHelper(html, batsmanName, teamName) {
    let $ = cheerio.load(html);
    let palyerCardArray = $(".player-card-description.gray-900");
    
    let dob = $(palyerCardArray[1]).text().trim();
    let age = $(palyerCardArray[2]).text().trim();
    
    console.log(chalk.greenBright(`${batsmanName} from team ${teamName}.`));
    console.log(chalk.cyanBright(` └──Date of bith: ${dob}`));
    console.log(chalk.magentaBright(` └──Age: ${age}`));
}

/* 
IPL2020 -> Kings XI Punjab vs Chennai Super Kings
KL Rahul (c)† from team Kings XI Punjab.
 └──Date of bith: April 18, 1992, Bangalore, Karnataka
 └──Age: 29y 171d
Nicholas Pooran from team Kings XI Punjab.
 └──Date of bith: October 02, 1995, Trinidad
 └──Age: 26y 4d
Ambati Rayudu from team Chennai Super Kings.
 └──Date of bith: September 23, 1985, Guntur, Andhra Pradesh
 └──Age: 36y 13d
Faf du Plessis from team Chennai Super Kings.
 └──Date of bith: July 13, 1984, Pretoria
 └──Age: 37y 85d
Mandeep Singh from team Kings XI Punjab.
 └──Date of bith: December 18, 1991, Jalandhar, Punjab
 └──Age: 29y 292d
James Neesham from team Kings XI Punjab.
 └──Date of bith: September 17, 1990, Auckland 
 └──Age: 31y 19d
Deepak Hooda from team Kings XI Punjab.
 └──Date of bith: April 19, 1995, Rohtak
 └──Age: 26y 170d
Ruturaj Gaikwad from team Chennai Super Kings.
 └──Date of bith: January 31, 1997, Pune, Maharashtra
 └──Age: 24y 248d
Chris Jordan from team Kings XI Punjab.
 └──Date of bith: October 04, 1988, Barbados
 └──Age: 33y 2d
Chris Gayle from team Kings XI Punjab.
 └──Date of bith: September 21, 1979, Kingston, Jamaica
 └──Age: 42y 15d
Mayank Agarwal from team Kings XI Punjab.
 └──Date of bith: February 16, 1991, Bangalore, Karnataka
 └──Age: 30y 232d
*/
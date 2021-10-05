// npm init -y
// npm install request
// npm install cheerio
// npm install chalk

const request = require('request');
const cheerio = require('cheerio'); // for parsing the content and extracting data from html
const chalk = require('chalk'); // for colored text on console

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

console.log("Before");
request(url, funcCB)
console.log("After");

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
    for (let i = 0; i < teamNameArray.length; i++) {
        let elemHasClass = $(teamNameArray[i]).hasClass("team-gray");
        if (elemHasClass == false) {
            // now we want ot search inside our element, for this we will use find()
            let winTeamName = $(teamNameArray[i]).find(".name");
            console.log(chalk.yellowBright.bgRed.bold.underline(winTeamName.text()));
        }

    }
}
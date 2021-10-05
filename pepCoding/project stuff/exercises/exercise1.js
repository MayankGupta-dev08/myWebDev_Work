// npm init -y
// npm install request
// npm install cheerio
// npm install chalk

const request = require('request');
const cheerio = require('cheerio'); // for parsing the content and extracting data from html
const chalk = require('chalk'); // for colored text on console

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

console.log("Before");
request(url, function cb(err, resp, html) {
    if (err) {
        console.log("error: ", err);
    } else {
        console.log("response: ", resp && resp.statusCode);
        handleHtml(html);
    }
})
console.log("After");

function handleHtml(html) {
    let selTool = cheerio.load(html);
    let PofIPL = selTool("span.playerofthematch-name");

    let mom = selTool(PofIPL[0]).text();
    let mos = selTool(PofIPL[1]).text();
    
    console.log(chalk.blue("For IPL2020 Final"));
    console.log(chalk.green("Man of the Match: ", mom));
    console.log(chalk.red("Player of Series: ", mos));
}

// Before
// After
// response:  200
// For IPL2020 Final
// Man of the Match:  Trent Boult
// Player of Series:  Jofra Archer
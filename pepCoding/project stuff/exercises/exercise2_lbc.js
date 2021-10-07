/* Last ball commentary */

// npm init -y
// npm install request
// npm install cheerio
// npm install chalk

const request = require('request');
const cheerio = require('cheerio'); // for parsing the content and extracting data from html
const chalk = require('chalk'); // for colored text on console

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";

console.log("Before");
request(url, funcCB)
console.log("After");

function funcCB(err, resp, html) {
    if(err){
        console.log("error: ", err);
    }else{
        console.log("response: ", resp && resp.statusCode);
        handleHtml(html);
    }
}

function handleHtml(html){
    let $ = cheerio.load(html);
    let elem1Array = $(".header-info .description");
    let matchTtl = $(elem1Array[0]).text();

    let elem2Array = $(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let lstBallCom = $(elem2Array[0]).text();
    let lstBallCom_html = $(elem2Array[0]).html();

    console.log(chalk.blueBright(matchTtl));
    console.log("last ball commentry: ", chalk.yellowBright(lstBallCom));
    console.log();
    console.log("html: ", chalk.redBright(lstBallCom_html));
}

/* Before
After
response:  200
53rd Match, Abu Dhabi, Nov 1 2020, Indian Premier League
last ball commentry:  misfield at cover and that is it for both teams this season. Full and just outside off, driven hurredly into the covers and it's past the dive

html:  <p><b>misfield at cover</b> and that is it for both teams this season. Full and just outside off, driven hurredly into the covers and it's past the dive</p> */
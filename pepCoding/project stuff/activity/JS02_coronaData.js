// npm init -y
// npm install request
// npm install cheerio
// npm install chalk

const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

let url = "https://www.worldometers.info/coronavirus/";

console.log("Before");
request(url, callBk);   //request consist of url and callBack function
console.log("After");

function callBk(error, response, html) {
    if (error == null) {
        console.log("response: ", response && response.statusCode);
        handleHtml(html);
    } else {
        console.log("error: ", error);
    }
}

function handleHtml(html) {
    let selTool = cheerio.load(html);
    // let h1s = selTool("h1");
    // console.log(h1s.length);

    let contentArray = selTool(".maincounter-number span");
    // for (let i = 0; i < contentArray.length; i++){
    // /* We always have to wrap [i] with selTool when we want to use */
    //     let data = selTool(contentArray[i]).text();
    //     console.log("Data: ", data);
    // }

    let total = selTool(contentArray[0]).text();
    let deaths = selTool(contentArray[1]).text();
    let recovered = selTool(contentArray[2]).text();

    console.log(chalk.blue("Total cases: ", total));
    console.log(chalk.red("Total deaths: ", deaths));
    console.log(chalk.green("Total recovered: ", recovered));
}

// Before
// After
// response:  200
// Total cases:  235,730,535 
// Total deaths:  4,816,145
// Total recovered:  212,609,370
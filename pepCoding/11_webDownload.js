// npm install axios
// node 11_webDownload.js --destfile='download.html' --url='https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results'

const minimist = require('minimist');
const fs = require('fs');
const axios = require('axios');

let args = minimist(process.argv);

let dwnldPromise = axios.get(args.url);
dwnldPromise.then(function(result){
    let html = result.data;
    fs.writeFileSync(args.destfile, html, "utf-8");
    console.log("Sucessfully downloaded data from web!");
}).catch((err) => {
    console.log("Something went wrong!");
});

/* 
PS D:\Mayank\Coding\WebDevelopment\myWebDev_work\pepCoding> node 11_webDownload.js --destfile='download.html' --url='https://www.espncricinfo.com/seriesicc-cricket-world-cup-2019-1144415/match-results'
Sucessfully downloaded data from web! 
*/
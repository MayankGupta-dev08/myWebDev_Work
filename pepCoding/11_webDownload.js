// npm install axios
// node 11_webDownload.js --destFile=dnldCricinfo.html --url="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results"

/* // Make a request for a user with a given ID
axios.get('https://www.google.com').then(function (response) {
    // handle success
    console.log(response);
}).catch(function (error) {
    // handle error
    console.log(error);
}).then(function () {
    // always executed
}); */

// including all the packages in our javascript
const minimist = require('minimist');
const fs = require('fs');
const axios = require('axios');

let args = minimist(process.argv);

let dwnldPromise = axios.get(args.url);
dwnldPromise.then(function (response) {
    console.log(resp && resp.statusCode);

    let html = response.data;
    // here the data will be in form of string, to work with it we need to make use of a npm module like jsdom or cheerio so that we can extract info from it.

    fs.writeFileSync(args.destFile, html, "utf-8");
    console.log("File created successfully!");
}).catch(function (err) {
    console.log("Something went wrong!");
    console.log(err);
})
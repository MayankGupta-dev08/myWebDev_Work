// npm install axios
// node 11_webDownload.js --destFile=dnldCricinfo.html --url="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results"

// including all the packages in our javascript
const minimist = require('minimist');
const fs = require('fs');
const axios = require('axios');

let args = minimist(process.argv);

let dwnldPromise = axios.get(args.url);
dwnldPromise.then(function (response) {
    let html = response.data;
    fs.writeFileSync(args.destFile, html, "utf-8");
    console.log("File created successfully!");
}).catch(function (err) {
    console.log("Something went wrong!");
    console.log(err);
})
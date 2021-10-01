// npm install minimist
// node 14_readingJsonFile.js --source=teams.json

const minimist = require('minimist');
const fs = require('fs');

let args = minimist(process.argv);

let teams;
/* using JSON.parse() we will convert the string (JSON) which was a jso ealier into jso again so that we can work on it or manipulate its data */
fs.readFile(args.source, "utf-8", function (err, jsonData) {
    if(err){
        console.log(err);
    }else{
        teams = JSON.parse(jsonData);
        console.log(teams);
        console.log(teams[0].matches);
    }
})

/* 
[
  { tName: 'India', rank: 1, matches: [ [Object], [Object] ] },
  { tName: 'Australia', rank: 3, matches: [ [Object], [Object] ] },
  { tName: 'England', rank: 2, matches: [ [Object], [Object] ] }
]
[
  { vs: 'Australia', result: 'win' },
  { vs: 'England', result: 'win' }
]
*/
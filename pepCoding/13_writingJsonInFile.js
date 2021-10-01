// npm install minimist
// node 13_writingJsonInFile.js --dest=teams.json

const minimist = require('minimist');
const fs = require('fs');

let args = minimist(process.argv);

// object is a JSO -> JavaScript Object
let teams = [
    {
        tName: "India",
        rank: 1,
        matches: [
            {
                vs: "Australia",
                result: "win"
            },
            {
                vs: "England",
                result: "win"
            }
        ]
    },
    {
        tName: "Australia",
        rank: 3,
        matches: [
            {
                vs: "India",
                result: "loss"
            },
            {
                vs: "England",
                result: "loss"
            }
        ]
    },
    {
        tName: "England",
        rank: 2,
        matches: [
            {
                vs: "Australia",
                result: "win"
            },
            {
                vs: "India",
                result: "loss"
            }
        ]
    },
]

// console.log(teams);
// console.log(typeof teams);
// console.log(teams[0].matches);
// console.log(teams[2].matches[1].vs);

/* now we can't write JSO in a file as we can write either a string or binary number
so we need to convert it into a string, for this we use stringify() function which we get from JSON
An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
we do so becoz if we want back our JSO, then we can easily convert JSON into JSO (for working with JSO) using parse() method */

let jsonData = JSON.stringify(teams);
fs.writeFile(args.dest, jsonData, "utf-8", function(err, res){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully created teams.json");
    }
})

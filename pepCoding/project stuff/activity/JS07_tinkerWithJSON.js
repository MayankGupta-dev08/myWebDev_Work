const fs = require('fs');

// geeting the data after reading in buffer format
let buffer = fs.readFileSync("./example.json");
console.log(buffer);
console.log("````````````````````````````````````````");

// before making any changes in it we need to make it a JSO
let JsoData = JSON.parse(buffer);
console.log(JsoData);
console.log("````````````````````````````````````````");

JsoData.push({
    "Avenger": "Black Widow",
    "Real name": "Natasha Romanoff",
    "age": 80,
    "isMainHero": true,
    "friends": [
        "Tony",
        "Bruce",
        "Thor",
        "Steve"
    ],
    "address": {
        "borough": "Manhatten",
        "state": "NY city",
        "Country": "USA"
    }
});

// before writing this changed/updated JSO we need to stringify it
let JSOstr = JSON.stringify(JsoData);
fs.writeFileSync("./example.json", JSOstr);

// reading json data in string format but to edit it we need to parse it once
let data = fs.readFileSync("./example.json", "utf-8");
console.log(data);
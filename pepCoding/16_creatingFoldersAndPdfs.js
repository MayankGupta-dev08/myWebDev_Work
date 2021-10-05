// npm install pdf-lib
// node 16_creatingFoldersAndPdfs.js --source=teams.json --dest=teamsWC19

const minimist = require('minimist');   //external
const fs = require('fs');   // internal
const path = require('path');   // internal
const pdf_lib = require('pdf-lib');   //external

let args = minimist(process.argv);

let teamsJSO;
fs.readFile(args.source, "utf-8", function (err, teamsStr) {
    if (err == null) {
        teamsJSO = JSON.parse(teamsStr);
        fs.mkdirSync(args.dest);
        for (let i = 0; i < teamsJSO.length; i++){
            let tmFoldrName = path.join(args.dest, teamsJSO[i].tName);
            fs.mkdirSync(tmFoldrName);
            for (let j = 0; j < teamsJSO[i].matches.length; j++) {
                const element = teamsJSO[i].matches[j].vs;
                let fileName = path.join(tmFoldrName, element + ".pdf");
                fs.writeFileSync(fileName, "", "utf-8");
            }
        }
    } else {
        console.log("Error while trying to read file!");
    }
})
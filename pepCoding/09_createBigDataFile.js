// creating a big data file

let parser = require('minimist');
let fs = require('fs');

// node 09_createBigDataFile.js --destFile=BigData.txt
let args = parser(process.argv);

let arr = [];
for(let i=0; i < 50000000; i++){
    arr.push(i);
}

let str = arr.join("\n");

fs.writeFileSync(args.destFile, str, "utf-8");
fs.appendFileSync(args.destFile, '\n', "utf-8");
fs.appendFileSync(args.destFile, str, "utf-8");
fs.appendFileSync(args.destFile, '\n', "utf-8");
fs.appendFileSync(args.destFile, str, "utf-8");
fs.appendFileSync(args.destFile, '\n', "utf-8");
fs.appendFileSync(args.destFile, str, "utf-8");

console.log("Finished creating the file");
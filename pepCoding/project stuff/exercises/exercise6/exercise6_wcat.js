#!/usr/bin/env node
// shebaang syntax⬆

const fs = require('fs');
const path = require('path');

let inputArray = process.argv.splice(2);

let optionsArray = [], filesPathArray = [];
for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].charAt(0) == '-') {
        optionsArray.push(inputArray[i]);
    } else {
        filesPathArray.push(inputArray[i]);
    }
}

if (filesPathArray.length == 0) {
    console.log("Please enter some file path to run the command.");
} else {
    if (optionsArray.includes("-n") && optionsArray.includes("-b")) {
        console.log(`Either use -n or -b at a time, both can;t be used together like others.`);
        return;
    }

    let contentOfFiles = "";
    for (let i = 0; i < filesPathArray.length; i++) {
        if (fs.existsSync(filesPathArray[i]) == false) {
            let fileName = path.basename(filesPathArray[i]);
            console.log(`File ${fileName} not found, check the path and try again!`);
            return;
        } else {
            let fileContent = fs.readFileSync(filesPathArray[i], "utf-8");
            contentOfFiles += fileContent;
        }
    }
    // console.log(contentOfFiles);
    let contentsArray = contentOfFiles.split("\n");
    // console.log(contentsArray);

    if (optionsArray.includes("-s")) {
        let i = 1;
        while (i < contentsArray.length) {
            if (contentsArray[i] == "" && contentsArray[i - 1] == "") {
                contentsArray.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    if (optionsArray.includes("-n")) {
        let counter = 1;
        for (let i = 0; i < contentsArray.length; i++) {
            contentsArray[i] = `${counter}  ${contentsArray[i]}`;
            counter++;
        }
    }

    if (optionsArray.includes("-b")) {
        let counter = 1;
        for (let i = 0; i < contentsArray.length; i++) {
            if (contentsArray[i] != "") {
                contentsArray[i] = `${counter}  ${contentsArray[i]}`;
                counter++;
            }
        }
    }

    console.log(contentsArray.join("\n"));
}
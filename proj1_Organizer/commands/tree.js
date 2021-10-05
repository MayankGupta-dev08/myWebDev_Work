const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// for printing the tree structure of a given directory on console
function treeFunc(dirPath) {
    if (dirPath == undefined) {
        mainTreeFunc(process.cwd(), "");
        // The process.cwd() method returns the current working directory of the Node.js process.
    } else {
        if (fs.existsSync(dirPath)) {
            mainTreeFunc(dirPath, "");
        } else {
            console.log(chalk.redBright.bold("Please, enter the correct path of the directory!"));
            return;
        }
    }
}

// ├──, └──
// main recurrsive function to print tree structure for given dir
function mainTreeFunc(dirPath, indentation) {
    if (fs.lstatSync(dirPath).isFile()) {
        let fileName = path.basename(dirPath);
        console.log(chalk.greenBright.bold(indentation + "├──" + fileName));
    } else {
        let dirName = path.basename(dirPath);
        console.log(chalk.greenBright.bold(indentation + "└──" + dirName));
        let childrensArray = fs.readdirSync(dirPath);
        for (let i = 0; i < childrensArray.length; i++) {
            let subDirOrFilePath = path.join(dirPath, childrensArray[i]);
            mainTreeFunc(subDirOrFilePath, indentation + "\t");
        }
    }
}

module.exports = {
    treeKey: treeFunc,
}
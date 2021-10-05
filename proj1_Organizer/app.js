#!/usr/bin/env node
/* the above is known as shebang syntax for node js, it is available for othe languages also, it is used if we want to make our code global and by this our os will get to know the env on which our script has to be ran. */

/* require npm modules */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/* require manually created modules */
const treeObj = require('./commands/tree'); 
const organizeObj = require('./commands/organize'); 
const helpObj = require('./commands/help'); 
// const utilityObj = require('./commands/utility'); 

/* taking input from the user */
const inputArray = process.argv.slice(2);
// console.log(inputArray);

let command = inputArray[0];
switch (command) {
    case "tree":
        console.log(chalk.yellowBright.bold("tree command is initiated."));
        treeObj.treeKey(inputArray[1]);
        break;

    case "organize":
        console.log(chalk.yellowBright.bold("organize command is initiated."));
        organizeObj.organizeKey(inputArray[1]);
        break;

    case "help":
        console.log(chalk.yellowBright.bold("help command is initiated!"));
        helpObj.helpKey();
        break;

    default:
        console.log(chalk.yellowBright.bold("please🙏, enter a correct command"));
        break;
}
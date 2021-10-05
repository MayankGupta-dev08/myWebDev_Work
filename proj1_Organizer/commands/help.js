const chalk = require('chalk');

// help function
function helpFunc() {
    console.log(chalk.greenBright.bold(`
#List of all the commands:
    1. forg tree "directoryPath"
    2. forg organize "directoryPath"
    3. forg help

Note:- "directoryPath" means that you have to enter complete path of the folder, you want to run command on.\n`));
}

module.exports = {
    helpKey: helpFunc,
}
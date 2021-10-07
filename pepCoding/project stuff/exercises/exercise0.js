// npm init -y
// npm install chalk
// npm install figlet

const chalk = require('chalk');
const figlet = require('figlet');

console.log(chalk.blueBright.bold.bgWhiteBright(figlet.textSync("#PEPCODER ")));

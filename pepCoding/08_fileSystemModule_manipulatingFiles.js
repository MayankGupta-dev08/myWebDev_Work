/* Question-
    Read a file, capitalize its every word and write it to another file 

    Requirement - 
        importing fs module (fs -> file system, it is an internal module, already installed)
*/

// additional to fs module, we will be using minimist module which we have already installed and used in previous question.

// require is the function which is used for importing modules which are installed
const parserr = require('minimist');
const fs = require('fs');
// we can give same name as well as some other name to them

// now we will take input from the terminal using minimist module
// node 08_fileSystemModule_manipulatingFiles.js --source=f1.txt --dest=f2.txt
let args = parserr(process.argv);

// now we will read the file and take its content in form of a string
let s_text = fs.readFileSync(args.source, "utf-8");
 
/* // now we will split the string at " " and put all substrings into an array
let words = s_text.split(" ");
for(let i=0; i<words.length; i++){
    words[i] = words[i].toUpperCase();
} */

// let d_text = words.join(" ");   //we are joining every element of the array which is a string using a space

let d_text = s_text.toUpperCase();
fs.writeFileSync(args.dest, d_text, 'utf-8'); 

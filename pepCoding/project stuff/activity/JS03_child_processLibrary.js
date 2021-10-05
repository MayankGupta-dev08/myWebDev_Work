// child_process --> inbuilt library
// we can open any application on with this module,
// for opening any application, we have to write that thing in execSync(), which we would have used if we were trying to to that using cmd

// Also, we could run any file of any format like .cpp, .js, .java or .py

const child_process = require('child_process');

console.log("Trying to open windows calculator");
child_process.execSync("calc");
console.log("Opened windows calculator");

console.log("------------------------------------");

console.log("Trying to open VS code");
child_process.execSync("code");
console.log("Opened VS code");

console.log("------------------------------------");

console.log("Trying to open google chrome 📶");
child_process.execSync("start chrome");
console.log("Opened google chrome 📶");

console.log("------------------------------------");

console.log("Trying to open a particular website on google chrome 🔍");
child_process.execSync("start chrome https://www.pepcoding.com");
console.log("Opened a website on google chrome 🔍");

console.log("------------------------------------");

console.log("Trying to open a particular file from pc 🔥");
let output = child_process.execSync("node sample.js");
console.log("output of the file 👇 \n"+ output);
console.log("Successfully ran and executed the JS file 🔥");

console.log("------------------------------------");

console.log("Trying to open a particular file from pc 🔥");
child_process.execSync("javac sample.java");
let output = child_process.execSync("java sample");
console.log("output of the file 👇 \n"+ output);
console.log("Successfully ran and executed the Java file 🔥");

console.log("------------------------------------");

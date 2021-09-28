// npm istall minimist
/* minimist is an extenral library which we have installed for our use*/

// node 07_firstModule.js -x 4 -y 7
// node 07_firstModule.js --name="Mayank Gupta" --age=34

let parser = require('minimist');   //after installing importing minimist
let args = parser(process.argv);

let age = args.age;
let name = args.name;

if(age<30){
    console.log("Hey, " + name + ". Where is the party tonight?");
}
else{
    console.log("Hello, " + name + ". You must go home.");
}

/* TERMINAL 
PS D:\Mayank\Coding\Web Devlopment\myWebDev_work\pepCoding> node .\07_firstModule.js --name="Mayank Gupta" --age=25
Hey, Mayank Gupta. Where is the party tonight? 
*/

/* TERMINAL 
PS D:\Mayank\Coding\Web Devlopment\myWebDev_work\pepCoding> node .\07_firstModule.js --name="Mayank Gupta" --age=35
Hello, Mayank Gupta. You must go home.
*/
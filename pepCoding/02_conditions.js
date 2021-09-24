let clargs = process.argv;
let n = clargs[2];  //by default input is string
n = parseInt(n);

if(n%2==0)
    console.log(n + " is even");
else
    console.log(n + " is odd");

/* 
PS D:\Mayank\Coding\Web Devlopment\myWebDev_work\pepCoding> node .\02_conditions.js 7
7 is odd
*/
// node 17_setInterval.js --n=10 --durn=1000

const minimist = require('minimist');

let args = minimist(process.argv);

let count = args.n;
let timeIntrvl = args.durn; // 1000 means 1000ms = 1sec

let id = setInterval(function () {
    console.log(count, "secs to go!");
    count--;

    if(count == 0){
        console.log("TimeOut!");
        clearInterval(id);
    }
}, timeIntrvl);

/* 
10 secs to go!
9 secs to go!
8 secs to go!
7 secs to go!
6 secs to go!
5 secs to go!
4 secs to go!
3 secs to go!
2 secs to go!
1 secs to go!
TimeOut!
*/
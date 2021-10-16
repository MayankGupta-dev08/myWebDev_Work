// t1 = Read a file (using disk)
// t2 = Calculate primes (using cpu)
// t2 is done in parallel with t1
// node 10_UseOfCallBack.js --source=file1.txt --n=50000

const parser = require('minimist');
const fs = require('fs');

function isPrime(n) {
    let flag = true;
    for (let div = 2; div < n; div++) {
        if (n % div == 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

let args = parser(process.argv);

// task1 will begin now
let t1 = Date.now();    //returns the milliseconds passed from 1970 june1
console.log("Starting task1 at: ", + (t1 % 100000));

// let data = fs.readFileSync(args.source);
// now we will read the file asynchronously using readFile() instead of using readFileSync('source', 'utf-8', data)

//here readFile() is a async function which will be doing its work in the background and when it is done it will call callback function which is an anonymous function(error, data) here
fs.readFile(args.source, function (err, data) {
    if (err == null) {
        let t2 = Date.now();
        console.log("Finishing task1 at: ", + (t2 % 100000));
        console.log("Time taken by task1: ", + t2 - t1);
    } else {
        console.log('error happened');
    }
})
// task1 ends here

// task2 starts here - storing all primes till n
let t3 = Date.now();
console.log("Starting task2 at: ", + (t3 % 100000));

let primes = [];
for (let i = 2; i <= args.n; i++) {
    let ans = isPrime(i);
    if (ans == true) {
        primes.push(i);
    }
}

let t4 = Date.now();
console.log("Finishing task2 at: ", + (t4 % 100000));
console.log("Time taken by task2: ", + t4 - t3);
// task2 ends here

// let ttlTime;
if ((t2 - t1) > (t4 - t3)) {
    console.log("Total time: ", t2 - t1);
} else {
    console.log("Total time: ", t4 - t3);
}

/*
PS D:\Mayank\Coding\Web Devlopment\myWebDev_work\pepCoding> node 09_UseOfCallBack.js --source=file1.txt --n=50000
Starting task1 at:  84864
Starting task2 at:  84903
Finishing task2 at:  85131
Time taken by task2: 228
Finishing task1 at:  85527
Time taken by task1: 663
*/
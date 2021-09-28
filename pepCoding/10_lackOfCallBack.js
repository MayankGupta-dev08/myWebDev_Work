// t1 = Read a file (using disk)
// t2 = Calculate primes (using cpu)
// t2 is done in series with t1
// node 10_lackOfCallBack.js --source=file1.txt --n=50000

const parser = require('minimist');
const fs = require('fs');

function isPrime(n){
    let flag = true;
    for(let div=2; div<n; div++){
        if(n % div == 0){
            flag = false;
            break;
        }
    }
    return flag;
}

let args = parser(process.argv);

// task1 will begin now
let t1 = Date.now();
console.log("Starting task1 at: ", + (t1 % 100000));

let data = fs.readFileSync(args.source);
// we have purpously not specified utf-8 as we dont want the contents of file and file is also very large

let t2 = Date.now();
console.log("Finishing task1 at: ", + (t2 % 100000));
console.log("Time taken by task1", + t2-t1);
// task1 ends here

// task2 starts here - storing all primes till n
let t3 = Date.now();
console.log("Starting task2 at: ", + (t3 % 100000));

let primes = [];
for (let i = 2; i <= args.n; i++) {
    let ans = isPrime(i);
    if(ans==true){
        primes.push(i);
    }
}

let t4 = Date.now();
console.log("Finishing task2 at: ", + (t4 % 100000));
console.log("Time taken by task2: ", + t4-t3);
// task2 ends here

console.log("Total time for both the tasks: ", + t4-t1);


/* 
PS D:\Mayank\Coding\Web Devlopment\myWebDev_work\pepCoding> node 09_lackOfCallBack.js --source=file1.txt --n=50000
Starting task1 at:  1455
Finishing task1 at:  4802
Time taken by task1: 3347
Starting task2 at:  4804
Finishing task2 at:  5076
Time taken by task2: 272
Total time for both the tasks:  3621
*/
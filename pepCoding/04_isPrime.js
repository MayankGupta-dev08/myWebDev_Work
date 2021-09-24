let clargs = process.argv;
let n = parseInt(clargs[2]);

function isPrime(n) {
    let isPrime = true;
    for(let i=2; i*i <= n; i++){
        if(n%i==0){
            isPrime = false;
            break;
        }
    }

    if(isPrime==true)
        console.log(n+" is Prime")
    else
        console.log(n+" is not Prime")
}

isPrime(n);

/* 
PS D:\Mayank\Coding\Web Devlopment\myWebDev_work\pepCoding> node .\04_isPrime.js 19
19 is Prime 
*/

/* 
PS D:\Mayank\Coding\Web Devlopment\myWebDev_work\pepCoding> node .\04_isPrime.js 12
12 is not Prime 
*/

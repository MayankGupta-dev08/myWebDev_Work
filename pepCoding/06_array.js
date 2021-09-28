// arrays are dynamic in nature in java and javascript
// javascript is dynamic programming language 

//we specify size and elements simultaneously using process.argv
let clargs = process.argv;    
// node 06_array.js 5 10 20 30 40 50
// 0    1           2 3  4  5  6  7         <-- index of clargs
let n = parseInt(clargs[2]);

let arr = [];   //no need to specify the size of the array initially
for(let i=0; i<n; i++){
    let val = parseInt(clargs[i+3]);    //we have to start from 3 as it index 2 was size
    arr.push(val);
    // arr[i] = val;    //can also be done
}

for(let j=0; j<arr.length; j++){
    console.log(arr[j]);
}

console.log(arr);
console.log(arr.length);


/* Terminal
PS D:\Mayank\Coding\Web Devlopment\myWebDev_work\pepCoding> node .\06_array.js 5 10 20 30 40 50
10
2030
40
50
[ 10, 20, 30, 40, 50 ]
5
*/
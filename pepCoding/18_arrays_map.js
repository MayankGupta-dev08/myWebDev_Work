// node 18_arrays_map.js

/* // Map is itself a fn
// Map takes as input a callback fn (with v and i)
// map will call the callback multiple times (once for each value)
// for each run of callback, map will pass v and i to callback
// callback will process the value and index and return a single value
// Single value returned by each run of callback will be collected in a new array
// Map returns that new array */

let arr = [2, 5, 9, 8, 15, 11, 6];
let sqarr = arr.map(function (v, i) {
    console.log(v + " @ " + i);
    return v * v;
});
console.log(sqarr);

let sqarr2 = arr.map(v => v * v);
console.log(sqarr2);


let namesArray = [
    "Ram Gupta",
    "Shyaam Gupta",
    "Radhaa Gupta",
    "Sita Gupta",
    "Karan Gupta",
    "Arjun Gupta"
];
let iarr = namesArray.map(function (name, i) {
    let partsofname = name.split(" ");
    let fname = partsofname[0];
    let lname = partsofname[1];
    let ffc = fname[0];
    let lfc = lname[0];
    return ffc + "." + lfc + ".";
});

console.log(iarr);


let nums = [2, 19, 34, 72, 11, 64, 55, 98];

let oearr = nums.map(function (v, i) {
    if (v % 2 == 0) {
        return true;
    } else {
        return false;
    }
});

console.log(oearr);

let oearr2 = nums.map(v => v % 2 == 0);
console.log(oearr2);
/* Example 1 */
let arr = [1, 2, 3, 4, 5];

// first way, here pv is not specified explicitly but it will be arr[0] and ci will start from 1 so 1st cv will be arr[1].
let res1 = arr.reduce(function (pv, cv, ci) {
    console.log(pv + "-" + cv + "-" + ci);
    return pv + cv;
})
console.log(res1);

let res2 = arr.reduce((pv, cv, ci) => pv + cv);
console.log(res2);

// 1 - 2 - 1
// 3 - 3 - 2
// 6 - 4 - 3
// 10 - 5 - 4
// 15

/* Example 2 */
// here we have specified tbe first pv
let res3 = arr.reduce(function (pv, cv, ci) {
    console.log(pv + "-" + cv + "-" + ci);
    return pv + cv;
}, 8);

console.log(res3);

let res4 = arr.reduce((pv, cv, ci) => (pv + cv), 8);
console.log(res4);

// 8 - 1 - 0
// 9 - 2 - 1
// 11 - 3 - 2
// 14 - 4 - 3
// 18 - 5 - 4


/* Example 3 */
let arr2d = [
    [10, 20, 30],
    [22, 17],
    [54, 58, 92, 34],
    [61, 31, 55, 92],
    [17]
]

let result = arr2d.reduce(function (pv, cv, ci) {
    let joined = pv.concat(cv); // for joining two arrays
    return joined;
}, []);
console.log(result);

// [], [10, 20, 30], 0
// [10, 20, 30], [22, 17], 1
// [10, 20, 30, 22, 17], [54, 58, 92, 34], 2
// [10, 20, 30, 22, 17, 54, 58, 92, 34], [61, 31, 55, 92], 3
// [10, 20, 30, 22, 17, 54, 58, 92, 34, 61, 31, 55, 92], [17], 4
// [10, 20, 30, 22, 17, 54, 58, 92, 34, 61, 31, 55, 92, 17]


/* Example 4 */
// h(g(f(5))) = h(g(25)) = h(250) = 50
function f(x) {
    return x * x;
}

function g(x) {
    return 10 * x;
}

function h(x) {
    return x / 5;
}

let arr = [f, g, h];
let val = arr.reduce((pv, cv, ci) => cv(pv), 5);
console.log(val);

// 5, f, 0
// f(5), g, 1 => 25, g, 1
// g(25), h, 2 => 250, h, 2
// 50
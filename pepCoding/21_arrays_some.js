// some returns true if someone in the array fullfills the criteria
// as soon as someone in the array fullfills it breaks the loop
let arr = [3, 9, 15, 18, 19, 21];
let isThereAnyEvenElement = arr.some(function (v, i) {
    console.log(v + "-" + i);
    if (v % 2 == 0) {
        return true;
    } else {
        return false;
    }
})

console.log(isThereAnyEvenElement)

// 3 - 0
// 9 - 1
// 15 - 2
// 18 - 3
// true
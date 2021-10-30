let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

let even = arr.filter(function (val) {
    if (val % 2 === 0) { return true; }
    else { return false; }
});

console.log(even);

let odd = arr.filter(function (val) {
    if (val % 2 === 1) { return true; }
    else { return false; }
});

console.log(odd);

let evenArr = arr.filter(x => x % 2 === 0);
console.log(evenArr);

let oddArr = arr.filter(x => x % 2 === 1);
console.log(oddArr);


let people = [
    { name: "A", age: 28, gender: "male" },
    { name: "B", age: 14, gender: "male" },
    { name: "C", age: 30, gender: "female" },
    { name: "D", age: 25, gender: "female" },
    { name: "E", age: 18, gender: "male" },
    { name: "F", age: 29, gender: "female" },
    { name: "G", age: 32, gender: "male" }
];

/* let mAge = people.filter(function (person) {
    if (person.gender === "male") { return true; }
    else { return false; }
})
let mName = mAge.map(function (v) {
    return v.name;
})
console.log(mName); */


let maleName = people.filter(p => p.gender == "male").map(p => p.name);
console.log(maleName);

let femaleName = people.filter(p => p.gender == "female").map(p => p.name);
console.log(femaleName);
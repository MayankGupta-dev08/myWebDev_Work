/* Oject Destructuring:-

The object destructuring is a useful feature of javascript to extract properties from objects and bind them to variables. An object destructuring is also capable of extracting multiple properties in one statement and can access properties from nested objects. It sets a default value if the property does not exist. Let us take a look at what problem JavaScript destructuring solves. Sometimes, we need top-level variables like: */

const person = {
  first: 'John',
  last: 'Addison',
  country: 'UK',
  twitter: '@john_adison'
};
const first = person.first;
const last = person.last;
console.log(first); // John
console.log(last); // Addison

const { fst, lst } = person;
console.log(fst, lst);

console.log('This is tutorial 60');
// Destructuring in JavaScript

let a0, b0;
[a0, b0] = [34, 564];
// console.log(a, b);

[a, b, c, ...d] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
console.log(a); //1
console.log(b); //2
console.log(c); //3
console.log(d); //[4, 5, 6, 7, 8, 9, 10, 11, 12, 13]


// Array Destructuring
({ a1, b1, c1, ...d1 } = { a: 34, b: 345, c: 67, d: 45, e: 34 })
console.log(a1, b1, c1, d1)

const fruits = ['Apple', 'Bananas', 'Mangoes'];
[a2, b2, c2] = fruits;
// console.log(a, b, c)


// Object Destructuring
const laptop = {
  model: "HP Pavilion",
  age: "23 days",
  gender: "Male",
  net: 1233,
  start: function () { console.log('started'); }
}

const { model, age, gender, net, start } = laptop;
console.log(model, age, gender, net, start);
start();
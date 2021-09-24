// Javascript is a dynamically typed language
// Java is a static language

// 1. Ways to print in JavaScript
console.log("Hello World");
console.log('CodeWithHarry');  
console.log(1); 
console.log(true); 
console.log(null); ;  
console.log([1, 2, 3]); // array inside log
console.log({name:"Harry", language:"JavaScript", tutorial:2}); // object inside log

/* Console.table ():-
To generate a table inside a console, we use console.table() method. The input must be an array or an object which will be displayed as a table. In the example, we provide the object as an input.
Example:- */
console.table({name:"Harry", language:"JavaScript", tutorial:2});

/* Console.assert():-
This method writes a message to the console that the assertion failed and the message we provide as a parameter, but only if an expression evaluates to false. If the expression is true, then nothing will happen.
Example:- */
console.assert(0>1, "Expression is false")




// alert function in JS
// alert("alert message!!");    //alert() will generate an in-browser modal window which will dissplay a message and the user can't do anything on that window untill it deals with that alert, by pressing ok.

// prompt function in JS
// let user = prompt("What is your name?","Guest");
// console.log(user);

// confirm function in JS
// let deletePost = confirm("Do you really want to delete this post?");
// if(deletePost)
//     console.log("Your post has been deleted!")
// else
    // console.log("Deletion terminated")

// write function in 
// document.write("this is document write")

// 2. Javascript console API
console.log("Hello World", 4 + 6, "Another log");
// console.warn("this is warning");
// console.error("This is an error");

// 3. JavaScript Variables
// What are Variables? - Containers to store data values

/*
multi line 
commment
*/

let number1 = 34;
let number2 = 56;
// console.log(number1 + number2);

// we can also reassign the variable with any value of any data type which is not the case in other languages
number1 = "abc";
number2 = 88.68

// Apart from var, we can define varibale by using let, var and also without using any keyword also
let n1 = true;
n1 = 2;
n2 = 5;

console.log("n1 = "+n1);
console.log("n2 = "+n2);
console.log(n1**n2);

console.log(n1++);
console.log(++n1);

console.log(n2--);
console.log(--n2);

// 4. Data types in JavaScript

// Numbers
let num1 = 455;
let num2 = 56.76;

// String
let str1 = "This is a string";
let str2 = 'This is also a string';
console.log(str1 +" "+ str2);
// We can use "" in str made using '' and '' in str made using " ".

let Name = "Harry";
let channel = "CodeWithHarry";
let temp = `${Name} is a 'good' boy and he has a "youtube" channel called ${channel}.`;
// we can use "" and '' inside a string made using ``
console.log(temp);

let len = channel.length;   //string len, just like arr.length in java
console.log(len);

console.log("hello world\nThis is a new day");
console.log("a\tDooriyaa\tb");
console.log("backspace\b");

let str3 = new String("This is a string");  // creating string using string constructor
console.log(str3);

// document.getElementById('firstContainer').innerHTML = '<h2>Heading 2 is inserted</h2>'


// Objects
let myDict = {
    yourName : 'harry',
    age : 15,
    youtube : "codeWithHarry",
    "channel 2" : 'programmingWithHarry',
}
console.log(myDict);
console.log(myDict.yourName);
console.log(myDict.age);
console.log(myDict['age']);
console.log(myDict['channel 2']);

// Booleans
let abb = true;
let baa = false;
console.log(abb, baa);

// var und = undefined;
var und;
console.log(und);

var n = null;
console.log(n);
/*
At a very high level, there are two types of data types in JavaScript
1. Primitive data types: undefined, null, number, string, boolean, symbol
2. Reference data types: Arrays and Objects
*/

var arr = [1, 2, "bablu", 4.4, 5]
console.log(arr)

// Operators in JavaScript
// Arithmetic Operators
var a = 100;
var b = 10;
// console.log("The value of a + b is ", a+b);
// console.log("The value of a - b is ", a-b);
// console.log("The value of a * b is ", a*b);
// console.log("The value of a / b is ", a/b);

// Assignment Operators
var c = b;
// c += 2;
// c -= 2; // c = c - 2;
// c *= 2;
// c /= 2;
// console.log(c);

// Comparison Operators
var x = 34;
var y = 56;
console.log(x == y);
// console.log(x >= y);
// console.log(x <= y);
// console.log(x > y);
// console.log(x < y);

// Logical Operators

// Logical and
// console.log(true && true)
// console.log(true && false)
console.log(false && true)
// console.log(false && false)

// Logical or
// console.log(true || true)
// console.log(true || false)
console.log(false || true)
// console.log(false || false)

// Logical not
// console.log(!false);
// console.log(!true);

// Function in JavaScript
function avg(a, b) {
    c = (a + b) / 2;
    return c;
}
// DRY = Do not repeat yourself
c1 = avg(4, 6);
c2 = avg(14, 16);
// console.log(c1, c2);

// Conditionals in JavaScript
/*
var age = 41;
// Single if statement
if(age > 18){
    console.log('You can drink rasna water');
}
// if - else statement
// if(age > 18){
//     console.log('You can drink rasna water');
// }
// else{
//     console.log('You cannot drink rasna water');
// }

age = 25;
// if-else Ladder
if(age > 32){
    console.log("You are not a kid");
}
else if(age >26){
    console.log("Bachhe nahi rahe");
}
else if(age >22){
    console.log("Yes Bachhe nahi rahe");
}
else if(age >18){
    console.log("18 Bachhe nahi rahe");
}
else{
    console.log("Bachhe rahe");
}
console.log("End of ladder");
*/

var arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr);
// for(var i=0;i<arr.length;i++){
//     if(i==2){
//         // break;
//         continue;
//     }
//     console.log(arr[i])
// }

// for loop of modern javascript
    //inside forEach we have to write a function 
arr.forEach(function(element){
    console.log(element);
});

// another type of for loop of modern javascript
for(ele of arr){
    console.log(ele);
}

let employee = {
    name : 'Sid',
    age : 25,
    Country : "US",
    Nationality : 'IN',
}
// traversing an object
for(key in employee){
    console.log(`${key} --> ${employee[key]}`)
}


const ac = 0;
// ac++;    //invalid as we can't change the constant once it is defined
// ac = ac +1;

// while and do while loops 
let j = 0;
while(j<4){
    console.log(`${j} is less than 4`);
    j ++;
}

// runs 1st time irrespective of condition and then checks the condition
do{
    console.log(`${j} is more than 0`);
    j--;
} while (j>0);



let myArr = ["Fan", "Camera", 34, 5, null, true, undefined];
let arr1 = new Array(34, 5, null, true, 'volvo', "dog");
// Array Methods
// console.log(myArr.length);
console.log(arr1);
let len1 = arr1.length;
console.log(len1);
let newarr = arr1.sort();
console.log(newarr);
newarr.pop();     //pops last element
console.log(newarr);
newarr.push("harry")  //get pushed at the end
console.log(newarr);
newarr.shift()
const newLen = newarr.unshift("Harry")
console.log(newLen);
console.log(newarr);

let arr2 = new Array(23);   //23 undefined elements
console.log(arr2.length);
arr2[1] = 5;
console.log(arr2[0]);
console.log(arr2[1]);
console.log(arr2);


// String Methods in JavaScript
let myLovelyString = "Harry is a good boy good good Harry";
// console.log(myLovelyString.length)
// console.log(myLovelyString.indexOf("good"))
// console.log(myLovelyString.firstIndexOf("good")) //find good from index 0 or start of string
// console.log(myLovelyString.lastIndexOf("good")) //find good from index n-1 or end of string

// console.log(myLovelyString.slice(1,4))   //slicing of string str.slice(m,n) means [m,n) ,where m and n are index values
var substr1 = myLovelyString.slice(1,7);
var substr2 = myLovelyString.substring(1,7);
//both of the above works in same way, but .slice() is better as we can give neagtive values in it also

var substr3 = myLovelyString.substr(2,3);   //also does the slicing but first arg is starting index and next argument is length of substring.
console.log(substr1);
console.log(substr2);
console.log(substr3);

d = myLovelyString.replace("Harry", "Rohan");
console.log(myLovelyString);
d = d.replace("good", "bad");
console.log(d);
// console.log(d, myLovelyString)

var str = "This is a string";
console.log(str);

console.log(str.toUpperCase());
console.log(str.toLowerCase());

var newStr = str.concat('and this also.');
console.log(newStr);

var strwithwhitespaces = "      this    and    that       ";
console.log(strwithwhitespaces);
console.log(strwithwhitespaces.trim()); //trims extra white spaces from start and end of the string but not from other areas

var char1 = str.charAt(2);  //returns char at index 2
var charcode = str.charCodeAt(2);  //returns ascii code of char at index 2
console.log(char1);
console.log(charcode);

console.log(str[3]);    //accessing a particular element of a string using index

// Date function
let myDate = new Date();
// console.log(myDate.getTime());
// console.log(myDate.getFullYear());
// console.log(myDate.getDay());
// console.log(myDate.getMinutes());
// console.log(myDate.getHours());
 
// DOM Manipulation
let elem = document.getElementById('click');
// console.log(elem);

let elemClass = document.getElementsByClassName("container")
// console.log(elemClass);
// elemClass[0].style.background = "yellow";
elemClass[0].classList.add("bg-primary")
elemClass[0].classList.add("text-success")
// console.log(elem.innerHTML);
// console.log(elem.innerText); 

// console.log(elemClass[0].innerHTML);
// console.log(elemClass[0].innerText); 
tn = document.getElementsByTagName('div')
// console.log(tn)
createdElement = document.createElement('p');
createdElement.innerText = "This is a created para";
tn[0].appendChild(createdElement);
createdElement2 = document.createElement('b');
createdElement2.innerText = "This is a created bold";
tn[0].replaceChild(createdElement2, createdElement);
// removeChild(element); ---> removes an element
 
// Selecting using Query
// sel = document.querySelector('.container')
// console.log(sel)
// sel = document.querySelectorAll('.container')
// console.log(sel)

// function clicked(){
//     console.log('The button was clicked')
// }
// window.onload = function(){
//     console.log('The document was loaded')

// }
// Events in JavaScript
// firstContainer.addEventListener('click', function(){
//     document.querySelectorAll('.container')[1].innerHTML = "<b> We have clicked</b>"
//     console.log("Clicked on Container")
// })

// firstContainer.addEventListener('mouseover', function(){
//     console.log("Mouse on Container")
// })

// firstContainer.addEventListener('mouseout', function(){
//     console.log("Mouse out of Container");
// })

// let prevHTML = document.querySelectorAll('.container')[1].innerHTML;
// firstContainer.addEventListener('mouseup', function(){
//     document.querySelectorAll('.container')[1].innerHTML = prevHTML;
//     console.log("Mouse up when clicked on Container");
// })

// firstContainer.addEventListener('mousedown', function(){
//     document.querySelectorAll('.container')[1].innerHTML = "<b> We have clicked</b>"
//     console.log("Mouse down when clicked on Container");
// })


// Arrow Functions
// function summ(a, b){
//     return a+b;
// }
summ = (a,b)=>{
    return a+b;
}

logKaro = ()=>{
    document.querySelectorAll('.container')[1].innerHTML = "<b> Set interval fired</b>"
    console.log("I am your log")
}
// SetTimeout and setinterval
// clr = setTimeout(logKaro, 5000);
// clr = setInterval(logKaro, 2000);
// use clearInterval(clr)/clearTimeout(clr) to cancel setInterval/setTimeout

// JavaScript localStorage
// localStorage.setItem('name', 'harry') 
// localStorage 
// localStorage.getItem('name')
// localStorage.removeItem('name')
// localStorage.clear();

// Json 
// obj = {name: "harry", length: 1, a: {this: 'tha"t'}}
// jso = JSON.stringify(obj);
// console.log(typeof jso)
// console.log(jso)
// parsed = JSON.parse(`{"name":"harry","length":1,"a":{"this":"that"}}`)
// console.log(parsed);

// Template literals - Backticks
a = 34;
console.log(`this is my ${a}`)

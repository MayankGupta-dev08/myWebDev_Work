console.log("This is tutorial 28");

/* Introduction to JavaScript prototype:-
    As we know that all objects in JavaScript are instances of Object. A typical object inherits properties from Object.prototype. The Object.prototype object has many built-in methods and properties such as toString(), valueOf(), etc.

    JavaScript is a prototype-based language. Whenever we create a function using JavaScript, the JavaScript engine adds a prototype property inside a function. The prototype property is an object where we can attach methods and properties in a prototype object, which enables all the other objects to inherit these methods and properties.

    The prototype object includes many properties and methods. Here is the explanation of a few prototype object methods.

    Methods and Description: 
        *   hasOwnProperty(): It will return a boolean indicating whether an object contains the specified property as a direct property of that object and not inherited through the prototype chain.
        *   isPrototypeOf(): It will return a boolean indicating whether the specified object is in the prototype chain of the object, this method is called upon.
        *   propertyIsEnumerable(): It will return a boolean that indicates whether the specified property is enumerable or not.
        *   toLocaleString(): It will return the string in the local format.
        *   toString(): It will return the string.
        *   valueOf() :It will return the primitive value of the specified object.

    Use of Prototype:-
        JavaScript is using the prototype object in two things. First, one is to find properties and methods of an object, and the other is to implement inheritance in JavaScript. Here is an example:
            function Student() {
            this.name = 'Harry';
            this.gender = 'Male';
            }
            Student.prototype.sayHi = function(){
            console.log("Hello World!");
            };
            let std = new Student();
            std.toString();

        In the above code, the JavaScript engine checks whether the toString() method is attached to std or not. If it does not find there, it uses std _proto__ link, which points to the prototype object of Student function. If it still cannot find it there, then it goes up in the hierarchy and check the prototype object of Object function because all the objects are derived from Object in JavaScript, and look for the toString() method. Thus, it finds the toString() method in the prototype object of Object function and so we can call std.toString().
*/

/*
when we create an object using object literal than it uses the already defined prototype for giving some methods and properties to our object.
we can add some of our own methods to that prototype but then it will come for every object defined using object literal,
so it is not advisable to do so, for overcoming this we define our object using constructor function.
using constructor function, we can add our own prototype to the object apart from the already given one and this is what is recommended
*/


// creating object using Object literal whose parent is Object.prototype, here it will inherit few methods and properties from Object.prototype which will be present under __proto__ property 
let obj = {
    name: "harry",
    channel: "Code With Harry",
    address: "Mars"
}
console.log(obj);
console.log(obj.prototype);


// creating a constructor function naming Obj to define our object, so now this will be the parent of our new object, this time also we will have a __proto__ but it will be the one which will get thru our constructor function.
// the parent of constructor function will be object.prototype thru which we will get the another __proto__
function Obj(givenName, givenAge) {
    this.name = givenName;
    this.age = givenAge;
}

// adding functions in our own prototype of object defined using constructor
Obj.prototype.getName = function () {
    return this.name;
}

// adding functions in our own prototype of object defined using constructor
Obj.prototype.setName = function (newName) {
    this.name = newName;
}

// creating a new object using constructor
let obj2 = new Obj("Rohan Das", 15);
obj2.getName();

console.log(obj2);
console.log(obj2.prototype);
console.log(Obj.prototype);

obj2.setName("shubh");
console.log(obj2);


/*
PS D:\Mayank\Coding\WebDevelopment\myWebDev_work\cwh_tuts> node .\h39_objectPrototypeAndInheritance.js
This is tutorial 28
{ name: 'harry', channel: 'Code With Harry', address: 'Mars' }
undefined
Obj { name: 'Rohan Das', age: 15 }
undefined
{getName: ƒ, setName: ƒ, constructor: ƒ}
    getName: ƒ ()
    setName: ƒ (newName)
    constructor: ƒ Obj(givenName, givenAge)
    [[Prototype]]: Object
        constructor: ƒ Object()
        hasOwnProperty: ƒ hasOwnProperty()
        isPrototypeOf: ƒ isPrototypeOf()
        propertyIsEnumerable: ƒ propertyIsEnumerable()
        toLocaleString: ƒ toLocaleString()
        toString: ƒ toString()
        valueOf: ƒ valueOf()
        __defineGetter__: ƒ __defineGetter__()
        __defineSetter__: ƒ __defineSetter__()
        __lookupGetter__: ƒ __lookupGetter__()
        __lookupSetter__: ƒ __lookupSetter__()
        __proto__: (...)
        get __proto__: ƒ __proto__()
        set __proto__: ƒ __proto__()
Obj { name: 'shubh', age: 15 }
*/
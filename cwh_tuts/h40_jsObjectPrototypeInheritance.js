console.log("This is tutorial 30");
/* Inheritance:-
    Inheritance let the objects to share each other's properties. In other words, Inheritance is the process by which one object can be based on another.

    Prototype Inheritance:
        When we try to access a property or any object's method, the JavaScript will first search on the object itself, and then it will search the object's prototype if not found. If, after checking both the object and its prototype still no match is found, JavaScript will check the linked object prototype and continue searching until the end of the prototype chain is reached. Object.prototype is at the end of the prototype chain. All the objects inherit the properties and methods of Object. When we try to search beyond the end of the chain, results in null. There are different ways to create an object in JavaScript. 
        *   Object literal
        *   Function constructor
        *   The create() method 
*/
// creating our own prototype
const proto = {
    slogan: function () {
        return `This company is the best`;
    },
    changeName: function (newName) {
        this.name = newName
    }
}

/* 
Object.create():-
The Object.create() method using an existing object as the prototype, creates a new object. The syntax is:
Object.create(proto, [propertiesObject])
*/

// This creates harry object using our own created prototype
let harry = Object.create(proto);
harry.name = "harry";
harry.role = "Programmer";
// harry.changeName("Harry2")
// console.log(harry)

/* This was the old syntax, which is generally not used now */
// This also creates harry object
const harry1 = Object.create(proto, {
    name: { value: "harry", writable: true },
    role: { value: "Programmer" },
});
harry1.changeName("Harry2")
// console.log(harry1)

// another example
const myDetail = {
    isHuman: true,
    printIntro: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
};
const myself = Object.create(myDetail);
myself.name = 'Harry'; // "name" is a property set on "me", but not on "person"
myself.printIntro();
// expected output: "My name is Harry. Am I human? true"


// Employee constructor
function Employee(name, salary, experience) {
    this.name = name;
    this.salary = salary;
    this.experience = experience;
}

// Creting a Slogan function inside the prototype of Employee
Employee.prototype.slogan = function () {
    return `This company is the best. Regards, ${this.name}`;
}

// Create an object from this constructor now
let harryObj = new Employee("Harry", 345099, 87);
console.log(harryObj.slogan())

// Programmer
function Programmer(name, salary, experience, language) {
    // To create inheritance between function constructors, call the parent constructor using call or link the prototype of the child constructor to the parent constructor prototype.
    Employee.call(this, name, salary, experience);
    this.language = language;
}

// Inheriting the prototype of Employee in Prograammer
Programmer.prototype = Object.create(Employee.prototype);

// Manually set the constructor
Programmer.prototype.constructor = Programmer;

let rohan = new Programmer("Rohan", 2, 0, "Javascript");
console.log(rohan);
console.log(rohan.slogan());



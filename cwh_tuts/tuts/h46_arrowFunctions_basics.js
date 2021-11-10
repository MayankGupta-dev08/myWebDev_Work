console.log('this is tutorial 41');

// ARROW FUNCTIONS

// Creating a regular function
// const Mayank = function (){
//     console.log("This is the best person ever")
// }

// Converting it to an arrow function
const Mayank = () => {
    console.log("This is the best person ever")
}
Mayank();

// function returning something
// const greet = function(){
//     return "Good Morning";
// }

// One liners do not require braces and return, one line will automatically return
// return is req only if compound statements ie. if {} are used.
const greet = () => "Good Morning";

// incase if we wanr to return an object than we need to use ()
const greet = () => ({ name: "Mayank" });

// Single parameters do not need parenthesis 
const greet = name => "Good Morning " + name;
console.log(greet('Mayank'));

// but you will have to put parenthesis if there are multiple paramteres
const greetings = (name, ending) => "Good Morning " + name + "bye" + ending;
console.log(greetings('Mayank', "bye"));

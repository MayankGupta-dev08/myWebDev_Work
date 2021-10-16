let letFruit = "orange";
var varFruit = "mango"
console.log("leftFruit ->", letFruit, "| varFruit ->", varFruit)
{
    let letFruit = "apple";
    var varFruit = "banana";
    console.log("leftFruit ->", letFruit, "| varFruit ->", varFruit)
    // let letFruit = "grape";  // throws error
    var varFruit = "pear";
    console.log("leftFruit ->", letFruit, "| varFruit ->", varFruit)
}
console.log("leftFruit ->", letFruit, "| varFruit ->", varFruit)

// conclusion
    // 1. var ka scope --> function scope, if it was declared and initialised in a function, and reinitialised again inside that same function then it will have the latest value and this is known as variable shadowing

    // 2. let ka scope -->> block scope, if it is declared inside a block than it can't be redeclared again
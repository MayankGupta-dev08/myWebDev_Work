console.log("This is tutorial 44");

// Pretend this is coming from a server as response
let a = "Harry bhai";
a = undefined;
if (a != undefined) {
    throw new Error('This is not undefined');
}
else {
    console.log('This is undefined');
}


try {
    null.console
    console.log("We are inside try block");

    functionHarry();

} catch (error) {
    console.log(error)
    console.log("Are you okay?");
    console.log(error.name);
    console.log(error.message);

} finally {
    console.log("Finally we will run this")
}


/* Types of errors:
    TypeError = occurs when a variable or parameter is not of a valid type.
    SyntaxError = occurs when there is an error in syntax.
    ReferenceError = occurs when there is an invalid reference.
    EvalError = occurs when there is an error in global function.
    RangeError = occurs when a numeric variable or parameter is outside of its valid range. */
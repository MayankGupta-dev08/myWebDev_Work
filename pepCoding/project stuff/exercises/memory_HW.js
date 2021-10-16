console.log("varName", varName);
var varName;
console.log("varName", varName);
varName = "Captain America";
console.log("varName", varName);
fn();
function fn() {
    console.log("Hello from fn");
}
fn();
fnContainer();   // error as fnContainer is not a function, but it is a variable which has been assigned the address of a function so it can work in line 15 but not brfore that, but if it was call using actual functionName then it wouldn't have given error just like for line 6
var fnContainer = function () {
    console.log(" I am an Expression");
}
fnContainer();
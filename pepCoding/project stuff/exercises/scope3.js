console.log("line number 1", varName);
var varName = 10;
console.log("line number 3", varName);
function func2() {
    // func2 definition
    console.log("line number 6", varName);
}
console.log("line number 8", varName);
function func1() {
    console.log("line number 10", varName);
    var varName = 20;
    func2();    // from inside func1
    console.log("line number 13", varName);
}
func1();

/*
line number 1 undefined
line number 3 10
line number 8 10
line number 10 undefined
line number 6 10
line number 13 20
*/
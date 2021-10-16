console.log("line number 1", varName);
var varName = 10;
console.log("line number 3", varName);
function func_outer() {
    console.log("line number 5", varName);
    function func_inner() {
        console.log("line number 7", varName);
    }
    func_inner();   // from func_inner
    var varName = 20;
    console.log("line number 11", varName);
}
func_outer();

/*
line number 1 undefined
line number 3 10
line number 5 undefined
line number 7 undefined
line number 11 20
*/
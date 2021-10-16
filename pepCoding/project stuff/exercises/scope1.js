console.log("line number 1", varName);
var varName = 10;
console.log("line number 3", varName);
function func_outer() {
    console.log("line number 5", varName);
    var varName = 20;
    console.log("line number 7", varName);
    function func_inner() {
        console.log("line number 9", varName);
    }
    func_inner();   // from func_inner
    console.log("line number 12", varName);
}
func_outer();

/*
line number 1 undefined
line number 3 10
line number 5 undefined
line number 7 20
line number 9 20
line number 12 20
*/
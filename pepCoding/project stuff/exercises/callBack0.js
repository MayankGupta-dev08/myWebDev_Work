// JavaScript Callbacks

// "I will call back later!"
// A callback is a function passed as an argument to another function
// This technique allows a function to call another function
// A callback function can run after another function has finished


/* // Normal sequential calling - synchronous
function firstAction() {
    console.log("I'm the firstAction");
}

function secondAction() {
    console.log("I'm the secondAction");
}

firstAction();
secondAction();

// Output
// I'm the firstAction
// I'm the secondAction */


/* // Here first action is a callBack function inside setTimeout() which will run only after setTimeout finishes.
function firstAction() {
    console.log("I'm the firstAction");
}

function secondAction() {
    console.log("I'm the secondAction");
}

setTimeout(firstAction, 3000);
secondAction();

// Output
// I'm the secondAction
// I'm the firstAction  -- after 3 sec
 */

/*
function firstAction() {
    console.log("I'm the firstAction");
    setTimeout(secondAction, 2000);
}

function secondAction() {
    console.log("I'm the secondAction");
}

setTimeout(firstAction, 3000);

// Output
// I'm the firstAction  -- after 3 sec
// I'm the secondAction  -- after 5 sec

// * Insight *
// setTimeout(firstAction(), 3000);
// If the above line was used instead of line 53, then first action would have been invoked immediatedly and then it wouldn't have been a callBack function.
*/

/* // Intead of line 60, we can write like this if we want our callBack function to have parameters
function firstAction(cBFunc) {
    console.log("I'm the firstAction");
    setTimeout(cBFunc, 2000);
}

function secondAction() {
    console.log("I'm the secondAction");
}

setTimeout(() => firstAction(secondAction), 3000);
// In the above example we can also make the secondAction() pass a parameter just like firstAction()

// Output
// I'm the firstAction  -- after 3 sec
// I'm the secondAction  -- after 5 sec
 */

/* Apart from this, some more examples of callback functions

let btn = document.getElementById("bttn");

**Method1 of writing**
function toggle() {
    console.log("Does something");
}
btn.addEventListener('click', toggle);

**Method2 of writing**
btn.addEventListener("click", function () {
    console.log("Does something");
})

**Method3 of writing**
btn.addEventListener('click', () => {
    console.log("Does something");
})
*/


function firstAction(message, cBFunc, anotherCBFunc) {
    console.log(message);
    setTimeout(cBFunc, 2000);
    anotherCBFunc();
}

function secondAction(msg) {
    console.log(msg);
}

function thirdAction() {
    console.log("I'm the thirdAction");
}

setTimeout(() => firstAction("I'm the firstAction", () => secondAction("I'm the secondAction"), thirdAction), 3000);

// Output
// I'm the firstAction
// I'm the thirdAction
// I'm the secondAction
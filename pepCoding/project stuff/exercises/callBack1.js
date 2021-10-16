console.log("cwh-js37: Callback functions");
/* "I will call back later!"
A callback is a function passed as an argument to another function
This technique allows a function to call another function
A callback function can run after another function has finished */


// Pretend that this response is coming from the server
const students = [
    { name: "harry", subject: "JavaScript" },
    { name: "Rohan", subject: "Machine Learning" }
]

/* // Here, as soon as enrollStudent finishes as inside it nothing is there apart from setTimeout which will automatically run after 4 secs , line 30 will execute and it will do its job in total 2 secs, so before we have entered the new entry others are printed. After a total of 4 sec our new entry will get pushed.

function enrollStudent(student) {
    setTimeout(function () {
        students.push(student);
        console.log("Student has been enrolled");
    }, 4000);
}

function getStudents() {
    setTimeout(function () {
        let str = "";
        students.forEach(function (student, index) {
            str += `${index + 1}: ${student.name}\n`;
        });
        console.log("Students have been fetched");
        console.log(str);
    }, 1000);
}

let newStudent = { name: "Sunny", subject: "Python" }
enrollStudent(newStudent);
getStudents();

// Output
// Students have been fetched
// 1: harry
// 2: Rohan

// Student has been enrolled 
*/

// Here untill and unless our enrollStudent() function gets fully executed it won't call the callback function which is getsStudents() here to do its job. from this all entries will be printed only after updation and after 4 sec
function enrollStudent(student, callback) {
    setTimeout(function () {
        students.push(student);
        console.log("Student has been enrolled");
        callback();
    }, 4000);
}

function getStudents() {
    setTimeout(function () {
        let str = "";
        students.forEach(function (student, index) {
            str += `${index + 1}: ${student.name}\n`;
        });
        console.log("Students have been fetched");
        console.log(str);
    }, 1000);
}

let newStudent = { name: "Sunny", subject: "Python" }
enrollStudent(newStudent, getStudents);

// Output
// Student has been enrolled
// Students have been fetched
// 1: harry
// 2: Rohan
// 3: Sunny

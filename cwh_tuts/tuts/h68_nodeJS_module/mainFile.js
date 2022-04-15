console.log("this is mainFile.js");

const modF = require('./modFile');

console.log(modF.avg([1, 2, 3, 4]));
console.log(modF.name);
console.log(modF.repo);

/* ---------------Output---------------- */
// this is mainFile.js
// this is modFile.js
// 2.5
// avgFunc
// git
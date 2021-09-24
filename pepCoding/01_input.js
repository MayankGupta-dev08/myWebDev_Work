let args = process.argv;
// console.log(args);

// let i = args[2];
// console.log(i);

// console.log("At index0 : "+args[0]) //not used
// console.log("At index1 : "+args[1]) //not used generally
// console.log("At index2 : "+args[2])
// console.log("At index2 : "+args[3])
// console.log("At index2 : "+args[4])
// console.log("At index2 : "+args[5])

// Note:-  // if we want to input a string with space in b/w than we have to enter that string in "" while inputting

/* 
PS D:\Mayank\Coding\Web Devlopment\myWebDev_work\pepCoding> node .\01_input.js 10 12 hello world "hello world" abc 88.4[
    'C:\\Program Files\\nodejs\\node.exe',
    'D:\\Mayank\\Coding\\Web Devlopment\\myWebDev_work\\pepCoding\\input.js',
    '10',
    '12',
    'hello',
    'world',
    'hello world',
    'abc',
    '88.4']
  At index0 : C:\Program Files\nodejs\node.exeAt index1 : D:\Mayank\Coding\Web Devlopment\myWebDev_work\pepCoding\input.js
  At index2 : 10 
  
*/



// everything is comming as a string
console.log();
let i = args[2];
console.log("i: "+ i);
console.log("typeof i: "+ typeof i);
i = i + 30;
console.log("i: "+ i);


console.log();
let j = parseInt(args[2], 10);  //10 is used for specing base of number which is to be converted from string
console.log("j: "+j);
console.log("typeof j: "+ typeof j);
j = j + 30;
console.log("j: "+j);

/* Output
i: 15
typeof i: string
i: 1530

j: 15
typeof j: number
j: 45 */

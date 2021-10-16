// Some functions are promise functions as the don't do the actual work, rather they promise of doing the work and if it is done then only they will execute then() otherwise catch function

// we can also create our own promise functions
// syntax of which is:-
return new Promise((resolve, reject) => {
    
}); 

let p = new Promise(function (resolve, reject) {
    let num = Math.random();
    num = 1 + (num * (100 - 1));
    num = Math.round(num);
    // console.log(num);

    if (num % 2 == 0) {
        resolve(num);
    } else {
        reject(num);
    }
});

p.then(function (n) {
    console.log(`The randomly generated number is ${n}: even`);
}).catch(function (n) {
    console.log(`The randomly generated number is ${n}: odd`);
})
/* Question related to Object
We have an array of objects representing different people in our contacts lists.
    * A lookUpProfile function that takes name and a property (prop) as arguments has been pre-written for you.
    * The function should check if name is an actual contact's firstName and the given property (prop) is a property of that contact.
    * If both are true, then return the "value" of that property.
    * If name does not correspond to any contacts then return the string No such contact.
    * If prop does not correspond to any valid properties of a contact found to match name then return the string No such property.
*/

// Setup
var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["JavaScript", "Gaming", "Foxes"]
    }
];


function lookUpProfile(name, prop) {
    // Only change code below this line
    let flag = false;
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].firstName == name) {
            let person = contacts[i];
            // we can also do like contacts[i][prop]
            if (person[prop] != undefined) {
                return person[prop];
            } else {
                return "No such property";
            }
        }
    }
    if (flag == false) {
        return "No such contact";
    }
    // Only change code above this line
}

let ans;
ans = lookUpProfile("Akira", "likes");
console.log(ans);
ans = lookUpProfile("Kristian", "lastName");
console.log(ans);
ans = lookUpProfile("Sherlock", "likes");
console.log(ans);
ans = lookUpProfile("Bob", "number");
console.log(ans);
ans = lookUpProfile("Akira", "address")
console.log(ans);

/* 
[ 'Pizza', 'Coding', 'Brownie Points' ]
Vos
[ 'Intriguing Cases', 'Violin' ]
No such contact
No such property
*/
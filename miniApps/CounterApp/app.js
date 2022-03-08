let count = 0;
const saveEl = document.getElementById('save-el');
const countEl = document.getElementById('count-el');

console.log("lets count using Counter app");

function increment() {
    count += 1;
    countEl.textContent = count;
}


function save() {
    let countStr = count + " - ";
    saveEl.textContent += countStr;
    countEl.textContent = 0;  // resetting the counter
    count = 0;  // resetting the counter
}
// npm install path
// to make our work easy and application workable on all OS as path is specified differently in macOS and windows

const path = require('path');
const fs = require('fs');

fs.mkdirSync(path.join(__dirname, "temp"));
for (let i = 1; i <= 5; i++) {
    let lecDir = `Lecture-${i}`;
    fs.mkdirSync(path.join(__dirname, "temp", lecDir));
    fs.writeFileSync(path.join(__dirname, "temp", lecDir, `readMe${i}.md`), `#readMe for ${lecDir}`);
}

let ext = path.extname(path.join(__dirname, "temp", "Lecture-1", "readMe1.md"));
console.log(ext);   // .md

let name = path.basename(__dirname);
console.log(name);  // activity

name = path.basename(path.join(__dirname, "abc.js"));
console.log(name);  // abc.js
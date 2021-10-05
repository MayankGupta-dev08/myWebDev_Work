// inbuilt library/module
// to work with files and folder - create, update, read, delete
const fs = require('fs');

// creating dir in same folder where code is present
fs.mkdirSync("meriDir");

// creating dir in some specific folder - by specifying its path
fs.mkdirSync("meriDir/meriSubDir1");
fs.mkdirSync("meriDir/meriSubDir2");

// checking if the current file or dir exist
let res = fs.existsSync("meriDir/meriSubDir2");
console.log(res);

// creating a file using writeFileSync() - which blocks the current chain of code untill it is fully executed
fs.writeFileSync("meriDir/sample1.txt", "This is sample1.txt file, created using fs module", "utf-8");
fs.writeFileSync("meriDir/sample2.pdf", "This is sample2.pdf file, created using fs module", "utf-8");
fs.writeFileSync("meriDir/sample3.doc", "This is sample3.doc file, created using fs module", "utf-8");
fs.writeFileSync("meriDir/sample4.xls", "This is sample4.xls file, created using fs module", "utf-8");
fs.writeFileSync("meriDir/sample5.ppt", "This is sample5.ppt file, created using fs module", "utf-8");

// creating a file in a sub dir
// fs.writeFileSync("meriDir/meriSubDir1/abc.txt", "", "utf-8");
// fs.writeFileSync("meriDir/meriSubDir2/abc.pdf", "", "utf-8");

// appending the content in the file
fs.appendFileSync("meriDir/sample1.txt", "\nThis is sample1.txt file, we have added this using appendFileSync", "utf-8");

// reading the file using readFileSync()
let sample1Data = fs.readFileSync("meriDir/sample1.txt", "utf-8")
console.log("Contents of meriDir/sample1.txt:- ", sample1Data);

// reading the contents of a dir using fs.readdirSync()
// checking if a path is a file or a folder --> fs.statSync().isFile() and fs.statSync().isDirectory()
// NOTE - we can't delete a dir, if it isn't empty, to delete it we need to delete every subdir and files in it.
let dirContent = fs.readdirSync("meriDir");
console.log(dirContent);
for (let i = 0; i < dirContent.length; i++) {
    let fullPathName = "meriDir/" + dirContent[i];
    if (fs.statSync(fullPathName).isDirectory()) {
        fs.rmdirSync("meriDir/" + dirContent[i]);
        console.log("folder: ", dirContent[i], "is removed.");
    } 
    else if (fs.statSync(fullPathName).isFile()) {
        fs.unlinkSync("meriDir/" + dirContent[i]);
        console.log("file: ", dirContent[i], "is removed.");
    }
}
console.log(dirContent);
console.log(dirContent.length);
fs.rmdirSync("meriDir");
console.log("removed meriDir");

// __dirname is used to get the path of the current folder u are working in
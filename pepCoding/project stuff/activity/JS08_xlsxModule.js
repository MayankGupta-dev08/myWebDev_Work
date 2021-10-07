// npm i xlsx

const fs = require('fs');
const xlsx = require('xlsx');

let bufferData = fs.readFileSync("example.json");
let jsonData = JSON.parse(bufferData);

/* Writing JSO in Excel using xlsx module
for creating a new workbook
for creating a new workSheet and writing JSON data into it
for appending the newly created sheet into already created workbook
for writing new file we will use xlsx.writeFile(workBook, filePath) */

let sheetName = "Sheet-1";
let filePath = "abc.xlsx";
writeExcelFronJSON(jsonData, sheetName, filePath);

function writeExcelFronJSON(jsonData, sheetName, filePath) {
    let newWb = xlsx.utils.book_new();
    let newWs = xlsx.utils.json_to_sheet(jsonData);
    xlsx.utils.book_append_sheet(newWb, newWs, sheetName);
    xlsx.writeFile(newWb, filePath);
    console.log("created a new workBook");
}

/* Reading an excel using xlsx module */
// to read an excel file or workBook using xlsx.readFile(filePath)
// to read the workSheet of the read workBook using actual name of the sheet
// sheet to json
readExcelNGiveJson(filePath, sheetName);

function readExcelNGiveJson(filePath, sheetName) {
    if (fs.existsSync(filePath)) {
        let wbToRead = xlsx.readFile(filePath);
        let excelData = wbToRead.Sheets[sheetName];
        let ans = xlsx.utils.sheet_to_json(excelData);
        console.log(ans);
        return ans;
    } else {
        return [];
    }
}
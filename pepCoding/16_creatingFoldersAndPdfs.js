// npm install pdf-lib
// node 16_creatingFoldersAndPdfs.js --source1=teams.json --source2=templateWC19.pdf --dest=teamsWC19

/* https://pdf-lib.js.org/
import { PDFDocument } from 'pdf-lib'

// PDF Creation
const pdfDoc = await PDFDocument.create()
const page = pdfDoc.addPage()
page.drawText('You can create PDFs!')
const pdfBytes = await pdfDoc.save()

// PDF Modification
const pdfDoc = await PDFDocument.load(...)
const pages = pdfDoc.getPages()
pages[0].drawText('You can modify PDFs too!')
const pdfBytes = await pdfDoc.save()
*/

const fs = require('fs');                // internal
const path = require('path');            // internal
const minimist = require('minimist');    //external

const pdf_lib = require('pdf-lib');      //external
const pdfDoc = pdf_lib.PDFDocument;     // importing PDFDocument from pdf_lib

let args = minimist(process.argv);

let teamsJSO;
fs.readFile(args.source1, "utf-8", function (err, teamsStr) {
    if (err == null) {
        teamsJSO = JSON.parse(teamsStr);
        fs.mkdirSync(args.dest);
        for (let i = 0; i < teamsJSO.length; i++) {
            let tmFoldrName = path.join(args.dest, teamsJSO[i].tName);
            fs.mkdirSync(tmFoldrName);

            for (let j = 0; j < teamsJSO[i].matches.length; j++) {
                const element = teamsJSO[i].matches[j].vs;
                let fullPathFile = path.join(tmFoldrName, element + ".pdf");
                // fs.writeFileSync(fileName, "", "utf-8");
                createScoreCard(teamsJSO[i].tName, teamsJSO[i].matches[j], fullPathFile);
            }
        }
    } else {
        console.log("Error while trying to read file!");
    }
})

function createScoreCard(team1, match, pdfFilePath) {
    let team2 = match.vs;
    let reslt = team1 + " " + match.result + "!";

    let templateData_Bytes = fs.readFileSync(args.source2);
    let promiseToLoadBytes = pdfDoc.load(templateData_Bytes);
    promiseToLoadBytes.then(function (pdfFile) {
        let page = pdfFile.getPage(0);
        page.drawText(team1, {
            x: 395,
            y: 289,
            size: 15,
        });
        page.drawText(team2, {
            x: 395,
            y: 269,
            size: 15,
        });
        page.drawText(reslt, {
            x: 385,
            y: 249,
            size: 15,
        });

        let promiseToSave = pdfFile.save();
        promiseToSave.then(function (updatedData_Bytes) {
            fs.writeFileSync(pdfFilePath, updatedData_Bytes);
        })
    })
}
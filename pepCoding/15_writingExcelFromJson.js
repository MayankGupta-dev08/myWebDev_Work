// npm install minimist
// npm install excel4node
// node 15_writingExcelFromJson.js --source=teams.json --dest=teams.xls
// either of .xls or .csv could be used to create an excel file

/* console.log("Team Name: ", teamsJSO[0].tName);
console.log("rank: ", teamsJSO[0].rank);
console.log(teamsJSO[0].matches[0]);
console.log(teamsJSO[0].matches[1]); */


const minimist = require('minimist');
const fs = require('fs');
const excel4node = require('excel4node');

let params = minimist(process.argv);

let teamsJSO;
fs.readFile(params.source, "utf-8", function (err, teamsStr) {
    if (err) {
        console.log("Something went wrong!");
        console.log(err);
    } else {
        teamsJSO = JSON.parse(teamsStr);
        let wb = new excel4node.Workbook(); // creating a new workbook

        // Create a reusable style for formating cells in excel
        let hdrStyle = wb.createStyle({
            font: {
                name: 'Calibri',
                size: 12,
                bold: true,
                underline: true,
                color: 'red',
            },
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: 'yellow',
            },
            alignment: {
                // wrapText: true,
                horizontal: 'center',
                vertical: 'center',
            },
            border: {
                left: {
                    style: 'medium',
                    color: 'black',
                },
                right: {
                    style: 'thin',
                    color: 'black',
                },
                top: {
                    style: 'thin',
                    color: 'black',
                },
                bottom: {
                    style: 'thin',
                    color: 'black',
                },
                outline: true,
            },
        });

        for (let i = 0; i < teamsJSO.length; i++) {
            let sheet_i = wb.addWorksheet(teamsJSO[i].tName);
            sheet_i.cell(1, 4).string("Rank").style(hdrStyle);
            sheet_i.cell(1, 5).number(teamsJSO[i].rank);

            sheet_i.cell(1, 1).string("Opponent").style(hdrStyle);
            sheet_i.cell(1, 2).string("Result").style(hdrStyle);
            for (let j = 0; j < teamsJSO[i].matches.length; j++) {
                sheet_i.cell(j + 2, 1).string(teamsJSO[i].matches[j].vs);
                sheet_i.cell(j + 2, 2).string(teamsJSO[i].matches[j].result);
            }
        }
        wb.write(params.dest);  //writing the given workbook content in dest
        console.log("Successfully created the excel file!");
    }
});
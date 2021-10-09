/* Project Author - Mayank Gupta */

// The purpose of this project is to extract information of cricket worldcup 2019 from cricinfo.
// and to present that in the form of excel and pdf scorecards.
// The real purpose is to learn Web Scraping using JS, to extract information from web.

/* STEPS:-
    1. making request for the url and handling response using axios
    2. if response if html than handling html and extracting useful info using jsdom
    3. transfering req and useful info into excel file in req directory
    4. creating scoreCards of every match in pdf format
*/

// node main.js --mainDir=WC2019 --url=https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const axios = require('axios');
const jsdom = require('jsdom');
const excel4node = require('excel4node');
const pdfLib = require('pdf-lib');

let args = minimist(process.argv);

axios.get(args.url).then(function (resp) {
    // console.log(resp && resp.statusCode);
    if (resp.statusCode == 404) {
        console.log('Page not found');
        return;
    }

    let mainDirPath = path.join(__dirname, args.mainDir);
    createDirectory(mainDirPath);

    let html = resp.data;
    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;
    console.log(document.title);

    let matches = [];
    let matchCardElems = document.querySelectorAll('.match-info.match-info-FIXTURES');
    for (let i = 0; i < matchCardElems.length; i++) {
        let matchObj = {};

        matchObj.matchName = matchCardElems[i].querySelector(".description").textContent;

        let teams = matchCardElems[i].querySelectorAll(".name");
        matchObj.team1 = teams[0].textContent;
        matchObj.team2 = teams[1].textContent;

        let bothScores = matchCardElems[i].querySelectorAll(".score-detail > .score");
        if (bothScores.length == 2) {
            matchObj.t1Score = bothScores[0].textContent;
            matchObj.t2Score = bothScores[1].textContent;
        } else if (bothScores.length == 1) {
            matchObj.t1Score = bothScores[0].textContent;
            matchObj.t2Score = "";
        } else {
            matchObj.t1Score = "";
            matchObj.t2Score = "";
        }

        matchObj.result = matchCardElems[i].querySelector(".status-text > span").textContent;
        matches.push(matchObj);
    }
    console.log(matches);
    let JSOstr = JSON.stringify(matches);

    let jsonFile1Path = path.join(mainDirPath, "WC19_matches.json");
    if (fs.existsSync(jsonFile1Path) == false) {
        fs.writeFileSync(jsonFile1Path, JSOstr);
        console.log("Successfully created WC19_matches.json!");
    } else {
        console.log("File named WC19_matches.json already exists!");
    }

    let teams = [];
    for (let i = 0; i < matches.length; i++) {
        populateTeamsOfWC19(teams, matches[i].team1);
        populateTeamsOfWC19(teams, matches[i].team2);
    }

    for (let i = 0; i < matches.length; i++) {
        putMatchDetailsOfATeam(teams, matches[i]);
    }
    console.log(teams);

    let teamsStr = JSON.stringify(teams);
    let jsonFile2Path = path.join(mainDirPath, "WC19_teams.json");
    if (fs.existsSync(jsonFile2Path) == false) {
        fs.writeFileSync(jsonFile2Path, teamsStr);
        console.log("Successfully created WC19_teams.json!");
    } else {
        console.log("File named WC19_teams.json already exists!");
    }

    let excelFilePath = path.join(mainDirPath, "Worldcup19.xlsx");
    createExcelFileFromTeams(teams, excelFilePath);

    createPdfForTeams(teams, mainDirPath);

}).catch(function (err) {
    console.log(err);
})

function createDirectory(dirPath) {
    if (fs.existsSync(dirPath) == false) {
        fs.mkdirSync(dirPath);
    }
}

function populateTeamsOfWC19(teams, teamName) {
    let tIdx = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].tName == teamName) {
            tIdx = i;
            break;
        }
    }
    if (tIdx == -1) {
        teamObj = {
            tName: teamName,
            tMatches: []
        }
        teams.push(teamObj);
    }
}

function putMatchDetailsOfATeam(teams, matchesObj) {
    let t1idx = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].tName == matchesObj.team1) {
            t1idx = i;
            break;
        }
    }
    teams[t1idx].tMatches.push({
        "vs": matchesObj.team2,
        "ourScore": matchesObj.t1Score,
        "oppScore": matchesObj.t2Score,
        "match": matchesObj.matchName.split(",")[0],
        "result": matchesObj.result
    });

    let t2idx = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].tName == matchesObj.team2) {
            t2idx = i;
            break;
        }
    }
    teams[t2idx].tMatches.push({
        "vs": matchesObj.team1,
        "ourScore": matchesObj.t2Score,
        "oppScore": matchesObj.t1Score,
        "match": matchesObj.matchName.split(",")[0],
        "result": matchesObj.result
    });
}

function createExcelFileFromTeams(teams, excelFilePath) {
    let wb = new excel4node.Workbook();

    for (let i = 0; i < teams.length; i++) {
        let sheet_i = wb.addWorksheet(teams[i].tName);
        sheet_i.cell(1, 1).string("Match");
        sheet_i.cell(1, 2).string("Opponent");
        sheet_i.cell(1, 3).string("Our Score");
        sheet_i.cell(1, 4).string("Opp. Score");
        sheet_i.cell(1, 5).string("Result");
        for (let j = 0; j < teams[i].tMatches.length; j++) {
            sheet_i.cell(j + 2, 1).string(teams[i].tMatches[j].match);
            sheet_i.cell(j + 2, 2).string(teams[i].tMatches[j].vs);
            sheet_i.cell(j + 2, 3).string(teams[i].tMatches[j].ourScore);
            sheet_i.cell(j + 2, 4).string(teams[i].tMatches[j].oppScore);
            sheet_i.cell(j + 2, 5).string(teams[i].tMatches[j].result);
        }
    }
    wb.write(excelFilePath);
    console.log("Successfully created Worldcup19.xlsx");
}

function createPdfForTeams(teams, mainDirPath) {
    for (let i = 0; i < teams.length; i++) {
        let subDirName = path.join(mainDirPath, teams[i].tName);
        createDirectory(subDirName);
        for (let j = 0; j < teams[i].tMatches.length; j++) {
            const element = teams[i].tMatches[j];
            let pdfName = `${teams[i].tName}_vs_${element.vs}.pdf`;
            let pdfFilePath = path.join(subDirName, pdfName);
            createScorecards(pdfFilePath, teams[i].tName, teams[i].tMatches[j]);
        }
    }
}

function createScorecards(pdfFilePath, team1, tMatchesObj) {
    let templatePdfPath = path.join(__dirname, "templateWC19.pdf")
    let templateData_Bytes = fs.readFileSync(templatePdfPath);

    let promiseToLoadBytes = pdfLib.PDFDocument.load(templateData_Bytes);
    promiseToLoadBytes.then(function (pdfFile) {
        let page = pdfFile.getPage(0);
        page.drawText(tMatchesObj.match, {
            x: 290,
            y: 289,
            size: 15,
        });
        page.drawText(team1, {
            x: 290,
            y: 269,
            size: 15,
        });
        page.drawText(tMatchesObj.vs, {
            x: 290,
            y: 249,
            size: 15,
        });
        page.drawText(tMatchesObj.ourScore, {
            x: 290,
            y: 229,
            size: 15,
        });
        page.drawText(tMatchesObj.oppScore, {
            x: 290,
            y: 209,
            size: 15,
        });
        page.drawText(tMatchesObj.result, {
            x: 290,
            y: 189,
            size: 15,
        });

        let pdfName = path.basename(pdfFilePath);
        let promiseToSave = pdfFile.save();
        promiseToSave.then(function (updatedData_Bytes) {
            fs.writeFileSync(pdfFilePath, updatedData_Bytes);
            console.log(`Successfully created ${pdfName}`);
        }).catch(function (err) {
            console.log(`Something went wrong while saving ${pdfName}!`);
            console.log(err);
        })

    }).catch(function (err) {
        let pdfName = path.basename(pdfFilePath);
        console.log(`Something went wrong while creating ${pdfName}!`);
        console.log(err);
    })
}

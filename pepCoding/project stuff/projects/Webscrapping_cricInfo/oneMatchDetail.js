const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const request = require('request');
const cheerio = require('cheerio');

// requesting one matchLink at a time and further handling it
function handleMatchLink(matchLink) {
    request(matchLink, function (err, resp, matchHtml) {
        if (err) {
            console.log(err);
        } else {
            // console.log("response: ", resp && resp.statusCode);
            getMatchDetails(matchHtml);
        }
    })
}

// getting matchDetails from the provided html
function getMatchDetails(matchHtml) {
    // match no, venue, date --> ".header-info .description"
    // result --> ".match-info.match-info-MATCH.match-info-MATCH-half-width .status-text"

    let $ = cheerio.load(matchHtml);
    let descrpElem = $(".header-info .description");
    let resultElem = $(".match-info.match-info-MATCH.match-info-MATCH-half-width .status-text");

    let descrpArray = descrpElem.text().split(",");
    let matchName = descrpArray[0].trim();
    let venue = descrpArray[1].trim();
    let date = descrpArray[2].trim();
    let result = resultElem.text().trim();

    console.log(`-------------------------------------------------------------------------------`);
    console.log(`${matchName}, ${venue}, ${date}, ${result}`);
    console.log(`-------------------------------------------------------------------------------`);

    let inningsElemArray = $(".card.content-block.match-scorecard-table > .Collapsible");
    for (let i = 0; i < inningsElemArray.length; i++) {
        let teamName = $(inningsElemArray[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        console.log(`~~~~~~~~~~~~~~~~~~~${teamName}~~~~~~~~~~~~~~~~~~~`);

        let iNot = (i == 0) ? 1 : 0;
        let oppTeamName = $(inningsElemArray[iNot]).find("h5").text();
        oppTeamName = oppTeamName.split("INNINGS")[0].trim();

        let allRowsBatsmanTable = $(inningsElemArray[i]).find(".table.batsman tbody tr");
        for (let j = 0; j < allRowsBatsmanTable.length; j++) {
            let allColsForARow = $(allRowsBatsmanTable[j]).find("td");
            let worthyRow = $(allColsForARow[0]).hasClass("batsman-cell");
            if (worthyRow == true) {
                let playerName = $(allColsForARow[0]).text().trim();
                let runsScored = $(allColsForARow[2]).text().trim();
                let ballsTaken = $(allColsForARow[3]).text().trim();
                let fours = $(allColsForARow[5]).text().trim();
                let sixes = $(allColsForARow[6]).text().trim();
                let strikeRate = $(allColsForARow[7]).text().trim();

                console.log(`${playerName}, ${oppTeamName}, ${runsScored}, ${ballsTaken}, ${fours}, ${sixes}, ${strikeRate}`);
                processPlayer(playerName, teamName, matchName, venue, date, result, oppTeamName, runsScored, ballsTaken, fours, sixes, strikeRate)
            }
        }
    }
}

function processPlayer(playerName, teamName, matchName, venue, date, result, oppTeamName, runsScored, ballsTaken, fours, sixes, strikeRate) {
    let iplDirPath = path.join(__dirname, "IPL2020");
    dirCreator(iplDirPath);

    let teamDirPath = path.join(iplDirPath, teamName);
    dirCreator(teamDirPath);

    let playerFilePath = path.join(teamDirPath, playerName + ".xlsx");
    let playerDataJson = readExcelNGiveJson(playerFilePath, playerName);
    let playerObj = {
        "Player Name": playerName,
        "Player's team": teamName,
        "Opponent team": oppTeamName,
        "Match Name": matchName,
        "Venue": venue,
        "Date": date,
        "Runs": runsScored,
        "Balls": ballsTaken,
        "Fours": fours,
        "Sixes": sixes,
        "Strike Rate": strikeRate,
        "Result": result
    }
    playerDataJson.push(playerObj);
    writeExcelFronJSON(playerDataJson, playerName, playerFilePath);
}

function dirCreator(dirPath) {
    if (fs.existsSync(dirPath) == false) {
        fs.mkdirSync(dirPath);
    }
}

function writeExcelFronJSON(jsonData, sheetName, filePath) {
    let newWb = xlsx.utils.book_new();
    let newWs = xlsx.utils.json_to_sheet(jsonData);
    xlsx.utils.book_append_sheet(newWb, newWs, sheetName);
    xlsx.writeFile(newWb, filePath);
    console.log("created a new workBook");
}

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

module.exports = {
    handleMLKey: handleMatchLink,
}
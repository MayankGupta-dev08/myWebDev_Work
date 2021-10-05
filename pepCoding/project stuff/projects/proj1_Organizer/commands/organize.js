const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const utilityObj = require('./utility');

// organize function
function organizeFunc(dirPath) {
    if ((dirPath != undefined) && (fs.existsSync(dirPath) == false)) {
        console.log(chalk.redBright.bold("Please, enter the correct path of the directory!"));
        return;
    } else {
        let destnPath;
        if (dirPath == undefined) {
            destnPath = path.join(process.cwd(), "OrganizedFolder");
        } else if (fs.existsSync(dirPath) == true) {
            destnPath = path.join(dirPath, "OrganizedFolder");
        }

        if (fs.existsSync(destnPath) == false) {
            fs.mkdirSync(destnPath);
            console.log(chalk.greenBright.bold(`Created "OrganizedFolder", where all files will be organized`));
        } else {
            console.log(chalk.greenBright.bold(`"OrganizedFolder" already exists, so we'll work in that only.`));
        }
        mainOrganiser(dirPath, destnPath);
    }
}

// mainOrganizer function which is a inside organizeFunc() function
function mainOrganiser(dirPath, destnPath) {
    // checking what all categories of files are present inside the dirPath
    // copy/cut all files inside organised files in their correct category folder
    console.log(chalk.blueBright.bold(`Organising, ${path.basename(dirPath)} folder`));
    let filesArray = fs.readdirSync(dirPath);
    for (let i = 0; i < filesArray.length; i++) {
        let fileAddress = path.join(dirPath, filesArray[i]);
        if (fs.lstatSync(fileAddress).isFile()) {
            let ext = path.extname(fileAddress);
            ext = ext.slice(1); // just to remove the '.' from every extension which is at idx0
            // console.log(filesArray[i], "->", ext);
            let dirType = getCategoryOfFile(ext);
            console.log(chalk.redBright.bold(`moving ${filesArray[i]} -> ${dirType}`));
            let orgzDir = path.join(destnPath, dirType)
            if (fs.existsSync(orgzDir) == false) {
                fs.mkdirSync(orgzDir);
            }
            sendFiles(fileAddress, orgzDir);
        }
    }

}

// for returning the coreect Name of the folder to be created for file with given extension
function getCategoryOfFile(ext) {
    for (const catgry in utilityObj.fileTypes) {
        let catgryArray = utilityObj.fileTypes[catgry];
        for (let i = 0; i < catgryArray.length; i++) {
            if (ext == catgryArray[i]) {
                return catgry;
            }
        }
    }
    return "Others";
}

// for copying the file and deleting the original one
function sendFiles(srcFilePath, orgzDirPath) {
    // copying the baseName of srcFileName for new duplicate File
    let copyFileName = path.basename(srcFilePath);

    // creating the path for the new file
    let destFilePath = path.join(orgzDirPath, copyFileName);

    // copying the content of the file from actual file to newly created one
    fs.copyFileSync(srcFilePath, destFilePath);
    console.log(chalk.magentaBright.bold(`Copied ${copyFileName} to ${path.basename(orgzDirPath)}.`));

    // deleting the actual file from source
    fs.unlinkSync(srcFilePath);
    console.log(chalk.cyanBright.bold(`Deleted original ${copyFileName}.`));
}


module.exports = {
    organizeKey: organizeFunc,
}
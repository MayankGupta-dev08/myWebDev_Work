// npm install path
// node main.js tree
// node main.js organize
// node main.js help

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const inputArray = process.argv.slice(2);
// since we are not using minimist or any other module and directly taking inputs using process.argv, it will give us all inputs in form of string so if we are expecting any number than we have to use parseInt() for it.
// console.log(inputArray);

fileTypes = {
    app: ['exe', 'dmg', 'pkg', "deb"],
    media: ["mp3", "mp4", "mkv", "m4a"],
    images: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
    archives: ['zip', 'ar', 'rar', 'tar', 'iso', 'gz', 'xz', '7z'],
    codeFiles: ['cpp', 'class', 'java', 'py', 'html', 'css', 'js', 'json', 'svg'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'csv', 'pptx', 'odt', 'ods', 'odp',
        'odg', 'odf', 'txt', 'ps', 'tex']
}

let command = inputArray[0];
switch (command) {
    case "tree":
        console.log(chalk.yellowBright.bold("tree command is initiated."));
        treeFunc(inputArray[1]);
        break;

    case "organize":
        console.log(chalk.yellowBright.bold("organize command is initiated."));
        organizeFunc(inputArray[1]);
        break;

    case "help":
        console.log(chalk.yellowBright.bold("help command is initiated!"));
        helpFunc();
        break;

    default:
        console.log(chalk.yellowBright.bold("please🙏, enter a correct command"));
        break;
}

// for printing the tree structure of a given directory on console
function treeFunc(dirPath) {
    if (dirPath == undefined) {
        console.log(chalk.redBright.bold("Kindly, enter a path for the directory!"));
        return;
    } else {
        if (fs.existsSync(dirPath)) {
            mainTreeFunc(dirPath, "");
        } else {
            console.log(chalk.redBright.bold("Please, enter the correct path of the directory!"));
            return;
        }
    }
}

// ├──, └──
// main recurrsive function to print tree structure for given dir
function mainTreeFunc(dirPath, indentation) {
    if (fs.lstatSync(dirPath).isFile()) {
        let fileName = path.basename(dirPath);
        console.log(chalk.greenBright.bold(indentation + "├──" + fileName));
    } else {
        let dirName = path.basename(dirPath);
        console.log(chalk.greenBright.bold(indentation + "└──" + dirName));
        let childrensArray = fs.readdirSync(dirPath);
        for (let i = 0; i < childrensArray.length; i++) {
            let subDirOrFilePath = path.join(dirPath, childrensArray[i]);
            mainTreeFunc(subDirOrFilePath, indentation + "\t");
        }
    }
}

// organize function
function organizeFunc(dirPath) {
    if (dirPath == undefined) {
        console.log(chalk.redBright.bold("Kindly, enter a path for the directory!"));
        return;
    } else {
        if (fs.existsSync(dirPath)) {
            let destnPath = path.join(dirPath, "OrganizedFolder");
            if (fs.existsSync(destnPath) == false) {
                fs.mkdirSync(destnPath);
                console.log(chalk.greenBright.bold(`Created "OrganizedFolder", where all files will be organized`));
            } else {
                console.log(chalk.greenBright.bold(`"OrganizedFolder" already exists, so we'll work in that only.`));
            }
            mainOrganiser(dirPath, destnPath);
        } else {
            console.log(chalk.redBright.bold("Please, enter the correct path of the directory!"));
            return;
        }
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
            console.log(chalk.blackBright.bgWhite.bold(`moving ${filesArray[i]} -> ${dirType}`));
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
    for (const catgry in fileTypes) {
        let catgryArray = fileTypes[catgry];
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

// help function
function helpFunc() {
    console.log(`
#List of all the commands:
    1. node main.js tree "directoryPath"
    2. node main.js organize "directoryPath"
    3. node main.js help

Note:- "directoryPath" means that you have to enter complete path of the folder, you want to run command on.\n`);
}

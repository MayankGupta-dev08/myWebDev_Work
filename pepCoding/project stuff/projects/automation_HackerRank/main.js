// https://temp-mail.org/en/

const puppeteer = require('puppeteer');
const solutionObj = require('./solutions');

const url = 'https://www.hackerrank.com/auth/login';
const email = '';
const password = '';
let page;

let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
    slowMo: 20,
});

browserOpenPromise.then(function (browserObj) {
    // let promiseToOpenNewTab = browserObj.newPage();
    // return promiseToOpenNewTab;
    return browserObj.pages();
}).then(function (pagesArray) {
    page = pagesArray[0];
    let promiseToGotoSite = page.goto(url);
    return promiseToGotoSite;
}).then(function () {
    let elemWaitPromise = page.waitForSelector("input[type='text']", { visible: true });
    return elemWaitPromise;
}).then(function () {
    let promiseToTypeEmail = page.type("input[type='text']", email, { delay: 50 });
    return promiseToTypeEmail;
}).then(function () {
    let promiseToTypePassword = page.type("input[type='password']", password, { delay: 50 });
    return promiseToTypePassword;
}).then(function () {
    let promiseToClick = page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return promiseToClick;
}).then(function () {
    let clickOnAlgoPromise = waitAndClick(".topic-card a[data-attr1='algorithms']", page);
    return clickOnAlgoPromise;
}).then(function () {
    let clickOnWarmupPromise = waitAndClick('.checkbox-wrap input[value="warmup"]', page);
    return clickOnWarmupPromise;
}).then(function () {
    let waitFor3Seconds = page.waitForTimeout(3000);
    return waitFor3Seconds;
}).then(function () {
    // $$ is for querySelectorAll and $ is for querySelector
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return allChallengesPromise;
}).then(function (questionsArray) {
    console.log(`No. of warmup questions ${questionsArray.length}`);
    let questionSolvingPromise = questionSolverHR(questionsArray[0], solutionObj.solutionKey[0], page);
    return questionSolvingPromise;
})

// HackerRank question solver
function questionSolverHR(question, solution, page) {
    return new Promise((resolve, reject) => {
        let clickQuestionPromise = question.click();
        clickQuestionPromise.then(function () {
            let focusOnEditorPromise = waitAndClick('.view-lines', page);
            return focusOnEditorPromise;
        }).then(function () {
            let waitAndSelectCheckboxPromise = waitAndClick('.checkbox-wrap input[type="checkbox"]', page);
            return waitAndSelectCheckboxPromise;
        }).then(function () {
            let typeInInputboxPromise = page.type('textarea[id="input-1"]', solution);
            typeInInputboxPromise;
        }).then(function () {
            promiseToPressDownCntrl = page.keyboard.down("Control");   // cntrl is pressed down
            return promiseToPressDownCntrl;
        }).then(function () {
            let promiseToPressA = page.keyboard.press("A");   // cntrl+A is pressed
            return promiseToPressA;
        }).then(function () {
            promiseToPressX = page.keyboard.press("X");   // cntrl+X is pressed
            return promiseToPressX;
        }).then(function () {
            promiseToUnpressCntrl = page.keyboard.up("Control");     // cntrl button is liftedj
            return promiseToUnpressCntrl;
        }).then(function () {
            let focusOnEditorPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return focusOnEditorPromise;
        }).then(function () {
            promiseToPressDownCntrl = page.keyboard.down("Control");
            return promiseToPressDownCntrl;
        }).then(function () {
            let promiseToPressA = page.keyboard.press("A");
            return promiseToPressA;
        }).then(function () {
            let promiseToPressV = page.keyboard.press('V');
            return promiseToPressV;
        }).then(function () {
            promiseToUnpressCntrl = page.keyboard.up("Control");
            return promiseToUnpressCntrl;
        }).then(function () {
            return page.click(".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled");
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    });
}

// wait for that element to get loaded and then click
function waitAndClick(selector, page) {
    return new Promise(function (resolve, reject) {
        let waitForElemPromise = page.waitForSelector(selector, { visible: true });
        waitForElemPromise.then(function () {
            let clickPromise = page.click(selector);
            return clickPromise;
        }).then(function () {
            resolve();
        }).catch(function () {
            reject();
        })
    });
}

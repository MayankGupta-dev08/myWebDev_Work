const p = require("puppeteer");

let page;
let browser;
let code;
let language;

p.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    slowMo: 20, //we can control speed of automation by it
})
    .then(function (b) {
        browser = b;
        return b.pages();
    })
    .then(function (pages) {
        page = pages[0];
        return page.goto(
            "https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login"
        ); //go to hackerrank login page
    })
    .then(function () {
        return page.type("#input-1", "titey15810@art2427.com"); //types email id
    })
    .then(function () {
        return page.type("#input-2", "12345678"); //types password
    })
    .then(function () {
        return Promise.all([
            page.waitForNavigation(), //iss click se naya page khulega toh wait karna hoga navigation ka
            page.click(
                ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
            ), //login button link
        ]);
    })

    .then(function () {
        return Promise.all([
            page.waitForNavigation(),
            page.click("[title = 'Interview Preparation Kit'] a"), //interview preparation link(we choose title as a css selector it will not change...big website like hackerrank,amazon etc change their id selector as people can harm their sites...therefore ALWAYS TRY TO USE TITLE as they will not change their title)
        ]);
    })

    .then(function () {
        return waitClickNavigate("[data-attr1 = 'warmup']"); //click warm-up challenges( waitclickNavigate function humne banaya h ...yeh page ki html load hone deta h fir selector ko dhudta h)  //data-____  are very less prone to change
    })
    .then(function () {
        return waitClickNavigate(
            ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
        ); //click 1st problem
    })

    .then(function () {
        return waitClickNavigate("[data-attr2='Editorial']"); //click on editorial
    })
    .then(function () {
        return handleLockButton();   // i have written this function which handle unlock button
    })
    .then(function () {
        return page.waitForSelector(
            ".challenge-editorial-block.editorial-setter-code pre"
        );
    })
    .then(function () {
        return page.evaluate(function () {   //abhi tak saara code nodejs mai chal rha h...par yeh page.evaluate ek function leta h aur usse browser mai chalata h
            return document.querySelector(    //this takes CSS selector aur uske corresponding top wala select karleta h 
                ".challenge-editorial-block.editorial-setter-code pre"   //this selects whole code
            ).innerText;    //selected selector ka andar ka text deta h 
        });
    })
    .then(function (data) {
        code = data;
        return page.evaluate(function () {
            return document.querySelector(
                ".challenge-editorial-block.editorial-setter-code h3"    //this selects heading(language) of code which is selected by us
            ).innerText;
        });
    })
    .then(function (title) {
        language = title.trim();
        console.log(language);
        return page.click("[data-attr2='Problem']");   //goes back to "problem" tab
    })
    .then(function () {
        return pasteCode();
    })
    .catch(function (err) {
        console.log(err);
    });


function pasteCode() {   //we will first type the code in "test against custom input" tab then copy whole code and then paste in solution tab becoz if we directly type in solution tab then "{" will become "{}" automaticcally

    return new Promise(function (resolve, reject) {
        page
            .waitForSelector("[type='checkbox']")
            .then(function () {
                return page.click("[type='checkbox']");  //clicks "test against custom input" button
            })
            .then(function () {
                return page.waitForSelector("#input-1");   // clicks where we have to type
            })
            .then(function () {
                return page.type("#input-1", code);   //types the code
            })
            .then(function () {
                return page.keyboard.down("Control");
            })
            .then(function () {
                return page.keyboard.press("A");    //ctrl + A  selects whole code
            })
            .then(function () {
                return page.keyboard.press("X");  //ctrl+x cuts whole code
            })
            .then(function () {
                return page.click(".css-1hwfws3");   // clicks on language selection panel
            })
            .then(function () {
                return page.keyboard.up("Control");
            })
            .then(function () {
                return page.type(".css-1hwfws3", language);   //types the language in which code was written 
            })
            .then(function () {
                return page.keyboard.press("Enter");
            })
            .then(function () {
                return page.keyboard.down("Control");
            })
            .then(function () {
                return page.click(".monaco-editor.no-user-select.vs");  //clicks on solution tab
            })
            .then(function () {
                return page.keyboard.press("A");   //select whole code
            })
            .then(function () {
                return page.keyboard.press("V");  //paste previous copied code
            })
            .then(function () {
                return page.keyboard.up("Control");
            })
            .then(function () {
                return page.click(
                    ".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled"
                );  //clicks submit button
            })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

function handleLockButton() {        //agar ek baat editorial unlock ho gya toh uska button wha se hatt jaata h ....toh button dhudte hue error na aaye yeh kaam h iss function ka(this is promise based function)
    return new Promise(function (resolve, reject) {
        page
            .waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled", { visible: true })
            .then(function () {
                return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");   //CSS of unlock button 
            })
            .then(function () {
                resolve();    //agar button mila toh promise resolve
            })
            .catch(function (err) {
                resolve();   //agar button nhi mila tab bhi promise resolve
            });
    });
}

function waitClickNavigate(selector) {    //wait of selector and then click and wait for navigation  bohot baar kiya h ..toh jo kaam bohot baar karte h usse function mai daalna chaiye (this is promise based function)
    return new Promise(function (resolve, reject) {
        page
            .waitForSelector(selector, { visible: true })   // { visible: true } ==means force karte h ki jab tak DOM mai load na ho wait kar
            .then(function () {
                return Promise.all([page.click(selector), page.waitForNavigation()]);
            })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

// node main.js --url=https://www.hackerrank.com --config=config.json

// npm init -y
// npm install fs
// npm install minimist
// npm install puppeteer

const fs = require("fs");
const minimist = require("minimist");
const puppeteer = require("puppeteer");

const args = minimist(process.argv);

let configJSON = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);

async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 20,
        args: ["--start-maximized"],
    });

    let tabs = await browser.pages();
    let page = tabs[0];

    await page.goto(args.url);

    // go to the home page of hackerRank
    await page.waitForSelector(
        'a[href="https://www.hackerrank.com/auth/signup"]',
        { visible: true }
    );
    await page.click('a[href="https://www.hackerrank.com/auth/signup"]');

    // click on the login section
    await page.waitForSelector('a[href="/auth/login"]', { visible: true });
    await page.click('a[href="/auth/login"]');

    // enter the login details
    await page.waitForSelector('input[name="username"]', { visible: true });
    await page.type('input[name="username"]', configJSO.userId, { delay: 10 });
    await page.type('input[name="password"]', configJSO.password, {
        delay: 10,
    });

    // click on the login button
    await page.waitForSelector('button[data-analytics="LoginPassword"]', {
        visible: true,
    });
    await page.click('button[data-analytics="LoginPassword"]');

    // go the the compete page of hackerRank
    await page.waitForSelector('a[data-analytics="NavBarContests"]', {
        visible: true,
    });
    await page.click('a[data-analytics="NavBarContests"]');

    // go the the compete page of hackerRank
    await page.waitForSelector('a[href="/administration/contests/"]', {
        visible: true,
    });
    await page.click('a[href="/administration/contests/"]');

    // getting the total contest pages (10 contest per page)
    await page.waitForSelector('a[data-attr1="Last"]', { visible: true });
    let cPageNum = await page.$eval(
        'a[data-attr1="Last"]',
        function (anchorTag) {
            let cpages = parseInt(anchorTag.getAttribute("data-page"));
            return cpages;
        }
    );

    for (let i = 1; i <= cPageNum; i++) {
        await handlePage(page, browser);

        if (i != cPageNum) {
            await page.waitForSelector('a[data-attr1="Right"]', {
                visible: true,
            });
            await page.click('a[data-attr1="Right"]');
        }
    }

    console.log("Done adding all the moderators to all the contests.");
}

async function handlePage(page, browser) {
    // getting all the contest urls of a given contest page
    await page.waitForSelector("a.backbone.block-center", { visible: true });
    let curls = await page.$$eval("a.backbone.block-center", function (aTags) {
        let links = [];
        for (let i = 0; i < aTags.length; i++) {
            let link = aTags[i].getAttribute("href");
            links.push(link);
        }
        return links;
    });

    // handling all the contest of a given page
    await handleContest(browser, curls);
    await page.waitForTimeout(1000);
}

async function handleContest(browser, cLinks) {
    // adding moderators to each of the contest of the same page
    for (let i = 0; i < cLinks.length; i++) {
        let ctab = await browser.newPage();
        await ctab.goto(args.url + cLinks[i]);
        await ctab.bringToFront();

        // clicking on the moderators section
        await ctab.waitForSelector('li[data-tab="moderators"]', { visible: true });
        await ctab.click('li[data-tab="moderators"]');
        await ctab.waitForTimeout(2000);

        // adding all the moderators to a contest
        for (let j = 0; j < configJSO.moderators.length; j++) {
            await addModerator(ctab, configJSO.moderators[j]);
        }

        // closing the contest tab after all the moderators are added
        await ctab.close();
    }
}

async function addModerator(ctab, moderatorName) {
    await ctab.waitForSelector("input#moderator", { visible: true });
    await ctab.type("input#moderator", moderatorName, { delay: 30 });
    await ctab.keyboard.press("Enter");

    await ctab.waitForTimeout(1000);
}

run();

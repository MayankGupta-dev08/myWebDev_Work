// Doing Automation and learning promises using pupeteer
// https://pptr.dev/
// https://flaviocopes.com/puppeteer/
// https://nitayneeman.com/posts/getting-to-know-puppeteer-using-practical-examples/#launching-firefox


const puppeteer = require('puppeteer');

console.log("before");

const promiseToLaunchBrowser = puppeteer.launch({
    headless: false,
    slowMo: 1000,
    defaultViewport: null,
    // args: ["--start-maximized"]
});

let currPage;
promiseToLaunchBrowser.then(function (browserObj) {
    console.log("Browser opened!");
    const promisePagesArray = browserObj.pages();
    return promisePagesArray;
}).then(function (browserPage) {
    console.log("Got pages of browser");
    currPage = browserPage[0];
    let gotoSitePromise = currPage.goto("https://www.google.co.in/");
    return gotoSitePromise;
}).then(function () {
    /* waiting for the element to be appeared on that page */
    let elementWaitPromise = currPage.waitForSelector("input[type='text']", { visible: true });
    return elementWaitPromise;
}).then(function () {
    console.log("Reached Google homepage 🙌");
    /* typing on that element of that page using css selector */
    let promiseToType = currPage.type("input[type='text']", "pepCoding");
    return promiseToType;
}).then(function () {
    let promiseToPressEnterKey = currPage.keyboard.press("Enter");
    console.log("Searched for pepCoding");
    return promiseToPressEnterKey;
}).then(function () {
    let waitForElemToAppearPromise = currPage.waitForSelector(".LC20lb.DKV0Md", { visible: true });
    return waitForElemToAppearPromise;
}).then(function () {
    let promiseToClick = currPage.click(".LC20lb.DKV0Md");
    console.log("Reached www.pepCoding.com");
    return promiseToClick;
}).catch(function (err) {
    console.log(err);
})

console.log("after");
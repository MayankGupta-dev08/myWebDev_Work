// // // node script.js --url=https://nados.pepcoding.com/ --url2=gmail.com
// // // "java script\code along\activity_2"
// // // npm intall minimist
// // // npm install puppeteer
let minimist = require('minimist');
let puppeteer = require('puppeteer-extra');
let fs = require('fs');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
// const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
let args = minimist(process.argv);

(async () => {
    puppeteer.use(pluginStealth());
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: false,
        defaultViewport: null,
        args: ['--incognito', '--start-maximized']
    });

    const pages = await browser.pages();

    await pages[0].goto(args.url);
    await pages[0].waitForTimeout(2000);
    await pages[0].waitForSelector('button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary');
    await pages[0].click('button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary')
    await pages[0].waitForTimeout(2000);

    await pages[0].waitForSelector(" div.react-tel-input input.form-control");
    await pages[0].type("div.react-tel-input input.form-control", '8700810971', { delay: 75 });
    await pages[0].waitForTimeout(2000);

    await pages[0].waitForSelector("button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.GettingStarted_submitBtn__1_8VW.MuiButton-containedPrimary.MuiButton-fullWidth");

    // div.MuiBox-root.jss86.GettingStarted_form__container__1q9ly button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.GettingStarted_submitBtn__1_8VW.MuiButton-containedPrimary.MuiButton-fullWidth
    await pages[0].click('button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.GettingStarted_submitBtn__1_8VW.MuiButton-containedPrimary.MuiButton-fullWidth')
    await pages[0].waitForTimeout(10000);
    let code = await getOTP();
    await pages[0].waitForSelector("div.MuiCardContent-root div.MuiBox-root.jss8 input");
    await pages[0].type("div.MuiCardContent-root div.MuiBox-root.jss8 input", code, { delay: 75 });
    await pages[0].waitForSelector("div.OTP_btn__13PJh button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.submit_btn.MuiButton-containedPrimary");
    await pages[0].click("div.OTP_btn__13PJh button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.submit_btn.MuiButton-containedPrimary");


})(err => {
    console.log("over");
});

async function getOTP() {
    puppeteer.use(pluginStealth());
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", headless: false, defaultViewport: null, args: [
            '--incognito']
    });


    const pages = await browser.pages();
    await pages[0].goto(
        "https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/"
    );
    await pages[0].waitForSelector(`input[type='email']`);


    //your mail here
    await pages[0].type(`input[type='email']`, "your mail here", { delay: 75 });


    await pages[0].keyboard.press("Enter");

    await pages[0].waitForNavigation(["networkidle0", "load", "domcontentloaded"]);
    await pages[0].waitForTimeout(3550);
    await pages[0].waitForSelector(`input[type='password']`);


    //your pass here
    await pages[0].type(`input[type='password']`, "your pass here", { delay: 15 });


    await pages[0].keyboard.press("Enter");
    await pages[0].waitForTimeout(15000);

    await pages[0].waitForSelector("div#gs_lc50 > input.gb_8e");
    await pages[0].type("div#gs_lc50 > input.gb_8e", "NADOS", { delay: 75 });
    await pages[0].waitForTimeout(6000);
    await pages[0].keyboard.press('ArrowDown');
    await pages[0].keyboard.press('ArrowDown');
    await pages[0].keyboard.press('Enter');
    await pages[0].waitForTimeout(7000);
    let data = await pages[0].evaluate(() => {
        // div.ii.gt div.a3s.aiL
        let doc = document.querySelector("h2[style='background:#00466a;margin:0 auto;width:max-content;padding:0 10px;color:#fff;border-radius:4px']").innerText;
        console.log(doc);
        return {
            doc
        }
    })
    let code = data.doc;
    await browser.close();
    return code;

    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('ArrowDown');

    // await page1.click('div.VfPpkd-dgl2Hf-ppHlrf-sM5MNb > button')
}
// npm install jsdom
// node 12_processingDataFromWeb.js --source=download.html

const minimist = require('minimist');
const fs = require('fs');
const jsdom = require('jsdom'); //will load data or html and process it, i.e. it will prepare the DOM for the programmer, just like the browser does

let args = minimist(process.argv);

fs.readFile(args.source, "utf-8", function (err, data) {
    let dom = new jsdom.JSDOM(data);
    let doc = dom.window.document;

    let descr = doc.querySelectorAll('div.match-info > div.description');
    // this will give us all those elements which is a div with class='description' and whose parent is a div with class='match-info'.
    for (let i = 0; i < descr.length; i++) {
        console.log(descr[i].textContent);
    }
});

/* TERMINAL
PS D:\Mayank\Coding\WebDevelopment\myWebDev_work\pepCoding> node 12_processingDataFromWeb.js --source=download.html
Final, Lord's, Jul 14 2019, ICC Cricket World Cup
2nd Semi-final, Birmingham, Jul 11 2019, ICC Cricket World Cup
1st Semi-final, Manchester, Jul 9 - 10 2019, ICC Cricket World Cup
45th match (D/N), Manchester, Jul 6 2019, ICC Cricket World Cup
44th match, Leeds, Jul 6 2019, ICC Cricket World Cup
43rd match, Lord's, Jul 5 2019, ICC Cricket World Cup
42nd match, Leeds, Jul 4 2019, ICC Cricket World Cup41st match, Chester-le-Street, Jul 3 2019, ICC Cricket World Cup
40th match, Birmingham, Jul 2 2019, ICC Cricket World Cup39th match, Chester-le-Street, Jul 1 2019, ICC Cricket World Cup
38th match, Birmingham, Jun 30 2019, ICC Cricket World Cup
37th match (D/N), Lord's, Jun 29 2019, ICC Cricket World Cup36th match, Leeds, Jun 29 2019, ICC Cricket World Cup35th match, Chester-le-Street, Jun 28 2019, ICC Cricket World Cup34th match, Manchester, Jun 27 2019, ICC Cricket World Cup
33rd match, Birmingham, Jun 26 2019, ICC Cricket World Cup32nd match, Lord's, Jun 25 2019, ICC Cricket World Cup31st match, Southampton, Jun 24 2019, ICC Cricket World Cup30th match, Lord's, Jun 23 2019, ICC Cricket World Cup29th match (D/N), Manchester, Jun 22 2019, ICC Cricket World Cup28th match, Southampton, Jun 22 2019, ICC Cricket World Cup27th match, Leeds, Jun 21 2019, ICC Cricket World Cup26th match, Nottingham, Jun 20 2019, ICC Cricket World Cup
25th match, Birmingham, Jun 19 2019, ICC Cricket World Cup
24th match, Manchester, Jun 18 2019, ICC Cricket World Cup
23rd match, Taunton, Jun 17 2019, ICC Cricket World Cup
22nd match, Manchester, Jun 16 2019, ICC Cricket World Cup21st match (D/N), Cardiff, Jun 15 2019, ICC Cricket World Cup
20th match, The Oval, Jun 15 2019, ICC Cricket World Cup19th match, Southampton, Jun 14 2019, ICC Cricket World Cup
18th match, Nottingham, Jun 13 2019, ICC Cricket World Cup
17th match, Taunton, Jun 12 2019, ICC Cricket World Cup
16th match, Bristol, Jun 11 2019, ICC Cricket World Cup
15th match, Southampton, Jun 10 2019, ICC Cricket World Cup
14th match, The Oval, Jun 9 2019, ICC Cricket World Cup13th match (D/N), Taunton, Jun 8 2019, ICC Cricket World Cup
12th match, Cardiff, Jun 8 2019, ICC Cricket World Cup11th match, Bristol, Jun 7 2019, ICC Cricket World Cup
10th match, Nottingham, Jun 6 2019, ICC Cricket World Cup
9th match (D/N), The Oval, Jun 5 2019, ICC Cricket World Cup
8th match, Southampton, Jun 5 2019, ICC Cricket World Cup
7th match, Cardiff, Jun 4 2019, ICC Cricket World Cup6th match, Nottingham, Jun 3 2019, ICC Cricket World Cup
5th match, The Oval, Jun 2 2019, ICC Cricket World Cup
4th match (D/N), Bristol, Jun 1 2019, ICC Cricket World Cup
3rd match, Cardiff, Jun 1 2019, ICC Cricket World Cup2nd match, Nottingham, May 31 2019, ICC Cricket World Cup
1st match, The Oval, May 30 2019, ICC Cricket World Cup
*/
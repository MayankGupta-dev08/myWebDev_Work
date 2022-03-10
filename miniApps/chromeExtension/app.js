myLeads = [];

const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const saveBtnEl = document.getElementById("save-btn");
const deleteBtnEl = document.getElementById("delete-btn");
const tabBtnEl = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage != null) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}

function renderLeads(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">${leads[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
}

saveBtnEl.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
})

tabBtnEl.addEventListener("click", function () {
    // browser.tabs.query({ currentWindow: true, active: true }).then(logTabs, console.error);
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    })
})



deleteBtnEl.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
})
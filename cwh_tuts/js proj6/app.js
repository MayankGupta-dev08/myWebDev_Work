console.log("this is app.js for postmaster ");

// GET request url
// url1 = https://randomuser.me/api

// POST request url
// url2 = https://jsonplaceholder.typicode.com/posts
/* json = {
  'title': 'foo',
  'body': 'bar',
  'userId': 1,
} */


// all constants
const parametersBox = document.getElementById('parametersBox');
const paramsRadio = document.getElementById('paramsRadio');
const jsonRadio = document.getElementById('jsonRadio');
const addParam = document.getElementById('addParam');
const params = document.getElementById('params');
const submit = document.getElementById('submit');

// if page is refreshed then reset the form
// if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
//   console.info("This page is reloaded");
//   document.getElementById('myForm').reset();
// }

// total number of custom parameters initially
let paramsCount = 0;

// hiding the paramtersBox initially
parametersBox.style.display = 'none';

// if the user clicks paramsRadio then hide the jsonBox
paramsRadio.addEventListener('click', () => {
  document.getElementById('parametersBox').style.display = 'flex';
  document.getElementById('jsonBox').style.display = 'none';
})

// if the user clicks jsonRadio then hide the paramtersBox
jsonRadio.addEventListener('click', () => {
  document.getElementById('jsonBox').style.display = 'flex';
  document.getElementById('parametersBox').style.display = 'none';
})

// if user clicks on '+' button then add more custom parameters options
addParam.addEventListener('click', () => {
  console.log("add param is clicked");
  let str = `<div class="mb-3 row">
              <label for="contentType" class="col-sm-2 col-form-label">PARAMETER ${paramsCount + 2}</label>
              <div class="col-md-4">
                <input type="text" class="form-control" id="parameterKey${paramsCount + 2}" placeholder="Enter Key for parameter ${paramsCount + 2}">
              </div>
              <div class="col-md-4">
                <input type="text" class="form-control" id="parameterValue${paramsCount + 2}" placeholder="Enter Value for parameter ${paramsCount + 2}">
              </div>
              <div class="col-auto">
                <button class="btn btn-primary deleteParam"> - </button>
              </div>
            </div>`;

  let customParameter = document.createElement('div');
  customParameter.innerHTML = str;
  let paramElement = customParameter.firstElementChild;
  params.appendChild(paramElement);
  paramsCount++;

  let deleteParam = document.getElementsByClassName('deleteParam');
  for (item of deleteParam) {
    item.addEventListener('click', (event) => {
      event.target.parentElement.parentElement.remove();
    })
  }
})

// if the user clicks on the submit button
submit.addEventListener('click', (e) => {
  document.getElementById('responseText').innerHTML = "Fetching response, please wait..........";

  // fetching uset entered values from domcontentloaded
  const url = document.getElementById('url').value;
  const requestType = document.querySelector("input[name='requestType']:checked").value;
  const contentType = document.querySelector("input[name='contentType']:checked").value;
  let data;

  // if user has chosen params intead of json
  if (contentType == 'json') {
    data = document.getElementById('responseText').value;
  } else {
    data = {};
    for (let i = 0; i < paramsCount + 1; i++) {
      if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
        let key = document.getElementById('parameterKey' + (i + 1)).value;
        let value = document.getElementById('parameterValue' + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  }

  // logging all user entered values
  console.log('url: ', url);
  console.log('requestType: ', requestType);
  console.log('contentType: ', contentType);
  console.log('data: ', data);

  // if requestType is GET, invoke fetch api to make a GET request
  if (requestType === 'GET') {
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.text())
      .then((text) => {
        // document.getElementById('responseText').value = text;
        document.getElementById('responseText').innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
      .then(response => response.text())
      .then((text) => {
        // document.getElementById('responseText').value = text;
        document.getElementById('responseText').innerHTML = text;
        Prism.highlightAll();
      })
  }
})
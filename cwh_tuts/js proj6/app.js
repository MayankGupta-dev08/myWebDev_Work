console.log("this is app.js for postmaster ");

// all constants
const parametersBox = document.getElementById('parametersBox');
const paramsRadio = document.getElementById('paramsRadio');
const jsonRadio = document.getElementById('jsonRadio');
const addParam = document.getElementById('addParam');
const params = document.getElementById('params');

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
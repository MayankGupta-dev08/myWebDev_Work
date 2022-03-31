console.log("form validation js file included");

const username = document.getElementById("username");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const car = document.getElementById("car");
const address = document.getElementById("address");
const submit = document.getElementById("submit");
const success = document.getElementById("success");
const failure = document.getElementById("failure");

success.style.display = "none";
failure.style.display = "none";

let validEmail = false;
let validUser = false;
let validPhone = false;
let validCar = false;
let validAddress = false;

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  console.info("This page is reloaded");
  document.getElementById('myForm').reset();
}


username.addEventListener('blur', function () {
  console.log("usename is blurred");
  let regex = /^[a-zA-Z]([0-9a-zA-Z]){4,10}$/;
  let str = username.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("Your username is valid");
    username.classList.remove("is-invalid");
    username.classList.add("is-valid");
    validUser = true;
  } else {
    console.log("Your username is invalid");
    username.classList.remove("is-valid");
    username.classList.add("is-invalid");
    validUser = false;
  }
});

email.addEventListener('blur', function () {
  console.log("email is blurred");
  let regex = /^([0-9a-zA-Z_\.]+)@([\.0-9a-zA-Z]+)\.([a-zA-Z]){2,5}$/;
  let str = email.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("Your email is valid");
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    validEmail = true;
  } else {
    console.log("Your email is invalid");
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    validEmail = false;
  }
});

phoneNumber.addEventListener('blur', function () {
  console.log("phoneNumber is blurred");
  let regex = /^([0-9]){10}$/;
  let str = phoneNumber.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("Your phoneNumber is valid");
    phoneNumber.classList.remove("is-invalid");
    phoneNumber.classList.add("is-valid");
    validPhone = true;
  } else {
    console.log("Your phoneNumber is invalid");
    phoneNumber.classList.add("is-invalid");
    phoneNumber.classList.remove("is-valid");
    validPhone = false;
  }
});

car.addEventListener('blur', function () {
  const val = car.options[car.selectedIndex].value;
  console.log(val);
  if (val === "") {
    car.classList.add("is-invalid");
    car.classList.remove("is-valid");
    validCar = false;
  } else {
    car.classList.add("is-valid");
    car.classList.remove("is-invalid");
    validCar = true;
  }
});

address.addEventListener('blur', function () {
  if (address.value === "") {
    address.classList.add("is-invalid");
    address.classList.remove("is-valid");
    validAddress = false;
  } else {
    address.classList.add("is-valid");
    address.classList.remove("is-invalid");
    validAddress = true;
  }
});

submit.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("submit button is clicked");

  if (validUser && validPhone && validEmail && validCar && validAddress) {
    console.log("All the 5 things a valid. Submitting the form!");
    success.style.removeProperty("display");
    failure.style.display = "none";
  } else {
    console.error("Unable to submit the form");
    console.log("Please enter valid values");
    success.style.display = "none";
    failure.style.removeProperty("display");
  }
})
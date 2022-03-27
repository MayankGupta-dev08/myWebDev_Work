// console.log("file is included");

const username = document.getElementById("username");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");

let validEmail = false;
let validUser = false;
let validPhone = false;

// using jQuery
// $('#success').hide();
// $('#failure').hide();

username.addEventListener('blur', function () {
  console.log("usename is blurred");
  let regex = /^[a-zA-Z]([0-9a-zA-Z]){3,10}$/;
  let str = username.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("Your username is valid");
    username.classList.remove("is-invalid");
    validUser = true;
  } else {
    console.log("Your username is invalid");
    username.classList.add("is-invalid");
    validUser = true;
  }
});

email.addEventListener('blur', function () {
  console.log("email is blurred");
  let regex = /^[a-zA-Z]([0-9a-zA-Z]){3,10}$/;
  let str = email.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("Your email is valid");
    email.classList.remove("is-invalid");
    validEmail = true;
  } else {
    console.log("Your email is invalid");
    email.classList.add("is-invalid");
    validEmail = true;
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
    validPhone = true;
  } else {
    console.log("Your phoneNumber is invalid");
    phoneNumber.classList.add("is-invalid");
    validPhone = true;
  }
});
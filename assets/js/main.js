// global variables
const form = document.getElementById("form");
const allInputs = form.querySelectorAll("div > input");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password_confirmation");
const signUp = document.getElementById("signup");
const errorMs = document.getElementsByClassName("error");

// regx for user name and email inputs
const userNameRegx = /(^[a-zA-Z])(.{3,13})([a-zA-Z]$)/;
const emailRegx = /(^[\w])(.*)(\@)(.*)(\.[\w]{2,4}$)/;

// code to handle if user didn't fill form or just typed space
for (let input of allInputs) {
  if (input.value.trim() === "") {
    wrongInput(input, `*${input.getAttribute("name")} is required`);
  }
}

// code to handle user name input
userName.addEventListener("input", userNameFn);
function userNameFn(e) {
  if (userNameRegx.test(userName.value)) {
    correctInput(e.target);
  } else {
    if (userName.value.length < 5 || userName.value.length > 15) {
      wrongInput(
        e.target,
        `*${userName.getAttribute("name")} must be between 5 and 15 letters`
      );
    } else {
      wrongInput(
        e.target,
        "only letters and numbers without numbers at start and end,"
      );
    }
  }
}

// code tohandle email input
email.addEventListener("input", emailFn);
function emailFn(e) {
  if (emailRegx.test(email.value)) {
    correctInput(e.target);
  } else {
    wrongInput(e.target, "please enter valid email address");
  }
}

// code tohandle password input
password.addEventListener("input", passwordFn);
function passwordFn(e) {
  if (password.value.length < 8) {
    wrongInput(e.target, "Password must be at least 8 characters");
  } else {
    correctInput(e.target);
  }
}

// code tohandle confirm password input
confirmPassword.addEventListener("input", confirmPasswordFn);
function confirmPasswordFn(e) {
  if (confirmPassword.value !== password.value) {
    wrongInput(e.target, "Passwords don't match");
  } else {
    correctInput(e.target);
  }
}

// function to handle correct inputs
function correctInput(e) {
  e.parentElement.style.border = "1px solid green";
  showMessage(e, "");
  e.dataset.valid = "true";
  submitToggle();
}

// function to handle wrong inputs
function wrongInput(e, message) {
  e.parentElement.style.border = "1px solid red";
  showMessage(e, message);
  e.dataset.valid = "false";
  submitToggle();
}

// function to toggle submit button disabled | enabled
function submitToggle() {
  let inputs = Array.from(allInputs);
  let isValid = inputs.every(function (input, index, arr) {
    return input.dataset.valid === "true";
  });

  if (isValid === true) {
    signUp.removeAttribute("disabled");
  } else {
    signUp.setAttribute("disabled", "disabled");
  }
}

// helper function to show error message
function showMessage(a, b) {
  if (arguments.length === 2 && typeof arguments[1] === "string") {
    switch (a) {
      case userName:
        errorMs[0].textContent = b;
        break;
      case email:
        errorMs[1].textContent = b;
        break;
      case password:
        errorMs[2].textContent = b;
        break;
      case confirmPassword:
        errorMs[3].textContent = b;
        break;
    }
  }
}

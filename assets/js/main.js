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
const userNameRegx = /(^[a-zA-Z])(.[a-zA-Z0-9]{2,12})([a-zA-Z]$)/;
const emailRegx = /(^[\w])(.*)(\@)(.*)(\.[\w]{2,4}$)/;

// code to handle user name input
userName.addEventListener("input", userNameFn);
function userNameFn() {
  if (userNameRegx.test(userName.value)) {
    correctInput(userName);
  } else if (userName.value.trim() === "") {
    wrongInput(userName, `*${userName.getAttribute("name")} is required`);
  } else if (userName.value.length < 5 || userName.value.length > 15) {
    wrongInput(
      userName,
      `*${userName.getAttribute("name")} must be between 5 and 15 letters`
    );
  } else {
    wrongInput(
      userName,
      "only letters and numbers without numbers at start and end,"
    );
  }
}

// code tohandle email input
email.addEventListener("input", emailFn);
function emailFn() {
  if (emailRegx.test(email.value)) {
    correctInput(email);
  } else if (email.value.trim() === "") {
    wrongInput(email, `*${email.getAttribute("name")} is required`);
  } else {
    wrongInput(email, "please enter valid email address");
  }
}

// code tohandle password input
password.addEventListener("input", passwordFn);
function passwordFn() {
  if (password.value === "") {
    wrongInput(password, `*${password.getAttribute("name")} is required`);
  } else if (password.value.length < 8) {
    wrongInput(password, "Password must be at least 8 characters");
  } else {
    correctInput(password);
  }
}

// code tohandle confirm password input
confirmPassword.addEventListener("input", confirmPasswordFn);
function confirmPasswordFn(e) {
  if (confirmPassword.value === "") {
    wrongInput(
      confirmPassword,
      `*${confirmPassword.getAttribute("name")} is required`
    );
  } else if (confirmPassword.value !== password.value) {
    wrongInput(confirmPassword, "Passwords don't match");
  } else {
    correctInput(confirmPassword);
  }
}

// function to handle correct inputs
function correctInput(e) {
  e.parentElement.style.border = "1px solid green";
  showMessage(e, "");
  // e.dataset.valid = "true";
  // submitToggle();
}

// function to handle wrong inputs
function wrongInput(e, message) {
  e.parentElement.style.border = "1px solid red";
  showMessage(e, message);
  // e.dataset.valid = "false";
  // submitToggle();
}

// function to toggle submit button disabled | enabled
// function submitToggle() {
//   let inputs = Array.from(allInputs);
//   let isValid = inputs.every(function (input, index, arr) {
//     return input.dataset.valid === "true";
//   });

//   if (isValid === true) {
//     signUp.removeAttribute("disabled");
//   } else {
//     signUp.setAttribute("disabled", "disabled");
//   }
// }
// submitToggle();

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

// fetch code
form.addEventListener("submit", submitFn);
function submitFn(e) {
  e.preventDefault();

  fetch("https://goldblv.com/api/hiring/tasks/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.message === "The given data was invalid.") {
        for (let i in data.errors) {
          if (data.errors.username === data.errors[i]) {
            showMessage(userName, data.errors.username.join());
          } else if (data.errors.email === data.errors[i]) {
            showMessage(email, data.errors.email.join());
          } else if (data.errors.password === data.errors[i]) {
            if (
              data.errors.password.join() ===
              "The password confirmation does not match."
            ) {
              showMessage(confirmPassword, data.errors.password.join());
            } else {
              showMessage(password, data.errors.password.join());
            }
          }
        }
      } else {
        localStorage.setItem("email", data.email);
        window.location.href = "../succeed/index.html";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}


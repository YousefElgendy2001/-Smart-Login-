var enterNameInput = document.getElementById("enterNameInput");
var enterEmailInput = document.getElementById("enterEmailInput");
var enterPasswordInput = document.getElementById("enterPasswordInput");
var loginEmailInput = document.getElementById("loginEmailInput");
var loginPasswordInput = document.getElementById("loginPasswordInput");
var signUpBtn = document.getElementById("signUpBtn");
var logInBtn = document.getElementById("logInBtn");
var signUpList = [];



var regex = {
  enterNameInput: {
    value: /^[a-z0-9_-]{3,15}$/,
    status: false,
  },
  enterEmailInput: {
    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
    status: false,
  },

  enterPasswordInput: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    status: false,
  },
  loginEmailInput: {
    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
    status: false,
  },

};

function signUpEmpty() {
  if (
    enterNameInput.value == "" ||
    enterEmailInput.value == "" ||
    enterPasswordInput.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

if (localStorage.getItem("productList") != null) {
  signUpList = JSON.parse(localStorage.getItem("productList"));
}


function signUp() {
  if (signUpEmpty() == false) {
    document.getElementById("eror").innerHTML =
      '<span class ="text-danger m-4">All inputs is required</span>';
  } else {
    var list = {
      name: enterNameInput.value,
      emali: enterEmailInput.value,
      password: enterPasswordInput.value,
    };
    signUpList.push(list);
    localStorage.setItem("productList", JSON.stringify(signUpList));
    document.getElementById("eror").innerHTML =
      '<span class="text-success  m-4">Success</span>';
  }

  clearSignUp();
}

function logInEmpty() {
  if (loginPasswordInput.value == "" || loginEmailInput.value == "") {
    return false;
  } else {
    return true;
  }
}



function logIn() {
  if (logInEmpty() == false) {
    document.getElementById("mistake").innerHTML =
      '<span class ="text-danger m-4">All inputs is required<span>';
  }
  var password = loginPasswordInput.value;
  var email = loginEmailInput.value;
  for (var i = 0; i < signUpList.length; i++) {
    if (signUpList[i].emali == email && signUpList[i].password == password) {
      localStorage.setItem("user", signUpList[i].name);
      document.getElementById("mistake").innerHTML =
        '<span class="text-success  m-4">Success</span>';
      window.location.href = "home.html";
      clearLogIn();
    }
  }
}



function validatSignUp(e) {
  if (regex[e.id].value.test(e.value)) {
    e.classList.add("is-valid");
    e.classList.remove("is-invalid");
    regex[e.id].status = true;
  } else {
    e.classList.add("is-invalid");
    e.classList.remove("is-valid");
    regex[e.id].status = false;
  }
  checkValidationSignUp();
}
function validatLoginUp(e) {
  if (regex[e.id].value.test(e.value)) {
    e.classList.add("is-valid");
    e.classList.remove("is-invalid");
    regex[e.id].status = true;
  } else {
    e.classList.add("is-invalid");
    e.classList.remove("is-valid");
    regex[e.id].status = false;
  }
checkValidationLoginUp();
}


function checkValidationSignUp() {
  if (
    regex.enterNameInput.status &&
    regex.enterEmailInput.status &&
    regex.enterPasswordInput.status
  ) {
    signUpBtn.disabled = false;

  
  } else {
    signUpBtn.disabled = true;

  }
  
}


function checkValidationLoginUp() {
  if (
    regex.loginEmailInput.status 
  ) {
  
    logInBtn.disabled = false;
  
  } else {

    logInBtn.disabled = true;
  }



  
}


function clearSignUp() {
  enterNameInput.value = " ";
  enterEmailInput.value = " ";
  enterPasswordInput.value = "";

  signUpBtn.disabled = true;
  enterNameInput.classList.remove("is-valid", "is-invalid");
  enterEmailInput.classList.remove("is-valid", "is-invalid");
  enterPasswordInput.classList.remove("is-valid", "is-invalid");

}

function clearLogIn() {
  loginPasswordInput.value = " ";
  loginEmailInput.value = " ";
  logInBtn.disabled = true;
  loginEmailInput.classList.remove("is-valid", "is-invalid");
}

var username = localStorage.getItem("user");
if (username != null) {
  var usernameDisplay = document.getElementById("username");
  if (usernameDisplay) {
    usernameDisplay.innerHTML = "Welcome, " + username;
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

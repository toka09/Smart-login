let loginEmail = document.querySelector("#loginEmail");
let loginPassword = document.querySelector("#loginPassword");
let signupUser = document.querySelector("#signupUser");
let signupEmail = document.querySelector("#signupEmail");
let signupPassword = document.querySelector("#signupPassword");

let usersList = [];

// !<functions>

if (localStorage.getItem("users") !== null) {
    usersList = JSON.parse(localStorage.getItem("users"));
}

function setUserInLocalStorage() {
    localStorage.setItem("users", JSON.stringify(usersList));
}

function clearInputs() {
    signupUser.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
}

function cheackUserNameAndEmailSignUp() {
    for (let i = 0; i < usersList.length; i++) {
        if (
            signupEmail.value === usersList[i].uEmail ||
            signupUser.value === usersList[i].uName
        ) {
        return false;
    }
    }
}

function cheackUserNameAndEmailLogin() {
    for (let i = 0; i < usersList.length; i++) {
        if (
            loginEmail.value === usersList[i].uEmail &&
            loginPassword.value === usersList[i].uPass
    ){
        localStorage.setItem("uNameLogin", usersList[i].uName);
        return true;
    } 
    }
}
// #<signUp>
function signUp() {
    const pattern = /[a-zA-Z0-9]{2,}/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let userData = {
    uName: signupUser.value,
    uEmail: signupEmail.value,
    uPass: signupPassword.value,
    };

    if (cheackUserNameAndEmailSignUp() === false) {
    document.querySelector("#alert").innerHTML =
        "<span class='text-danger'>user name or email is already exist</span>";
    } else if (
    signupUser.value === "" ||
    signupEmail.value === "" ||
    signupPassword.value === ""
    ){
    document.querySelector("#alert").innerHTML =
        "<span class='text-danger'>All inputs is required</span>";
    } else if (
    emailPattern.test(signupEmail.value) === false ||
    pattern.test(signupUser.value) === false ||
    pattern.test(signupPassword.value) === false
    ) {
    document.querySelector("#alert").innerHTML =
    "<span class='text-danger'>inputs is not valid</span>";
    } else if (
    pattern.test(signupUser.value) === true &&
    emailPattern.test(signupEmail.value) === true &&
    pattern.test(signupPassword.value) === true
    ) {
    usersList.push(userData);
    setUserInLocalStorage();
    clearInputs();
    document.querySelector("#alert").innerHTML =
        "<span class='text-success'>Success, Login to your account.</span>";
      location.replace("index.html"); // "https://" + location.hostname + "/index.html"
    }
}

function login() {
    if (loginEmail.value === "" || loginPassword.value === "") {
    document.querySelector("#alert").innerHTML =
        "<span class='text-danger'>All inputs is required</span>";
    } else if (cheackUserNameAndEmailLogin() !== true) {
    document.querySelector("#alert").innerHTML =
        "<span class='text-danger'>incorrect email or password</span>";
    } else if (cheackUserNameAndEmailLogin() === true) {
    location.replace("home.html"); // "https://" + location.hostname + "/home.html"
    } else {
    document.querySelector("#alert").innerHTML =
    "<span class='text-danger'>user name or email is already exist</span>";
    }
}

let userName = localStorage.getItem("uNameLogin");
document.querySelector("#welcome").innerHTML = `welcome ${userName}`;
document.querySelector(".logout").addEventListener("click", function(){
    localStorage.removeItem("uNameLogin")
})


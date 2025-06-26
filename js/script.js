const loginTab = document.querySelector("#loginTab");
const singUpTab = document.querySelector("#signUpTab");
const tab = document.querySelector(".tab");

let users = JSON.parse(localStorage.getItem("users")) || [];

function clearForm () {
    tab.innerHTML = '';
}

function showLoginForm() {
    clearForm();

    const mailLabel = document.createElement("label");
    mailLabel.setAttribute("for", "email");
    mailLabel.innerText = "Email*";
    tab.appendChild(mailLabel);
    const userEmail = document.createElement("input");
    userEmail.id = "email";
    userEmail.type = "email";
    userEmail.placeholder = "user123@gmail.com";
    userEmail.required = true;
    mailLabel.appendChild(userEmail);

    const passLabel = document.createElement("label");
    passLabel.setAttribute("for", "password");
    passLabel.innerText = "Password*";
    tab.appendChild(passLabel);
    const userPassword = document.createElement("input");
    userPassword.id = "password";
    userPassword.type = "password";
    userPassword.placeholder = "********";
    userPassword.required = true;
    passLabel.appendChild(userPassword);

    const errorText = document.createElement("span");
    errorText.id = "errorText";
    tab.appendChild(errorText);

    const loginBtn = document.createElement("button");
    loginBtn.id = "loginBtn";
    loginBtn.innerText = "Login";
    loginBtn.type = "button";
    tab.appendChild(loginBtn);

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if(!userEmail.value || !userPassword.value){
            errorText.innerText = "Please enter all fields";
            errorText.style.color = "red";
            return;
        }

        const existingUser = users.find(user => 
            user.email === userEmail.value && user.password === userPassword.value
        );

        if(existingUser){
            sessionStorage.setItem("loggedInUser", JSON.stringify(existingUser));
            console.log(existingUser);
            window.location.href = "dashboard.html";
        } else {
            errorText.innerHTML = "Email or Password is incorrect";
            errorText.style.color = "red";
        }

    })
}

function showSignUpForm() {
    clearForm();

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "username");
    nameLabel.innerText = "Name*";
    tab.appendChild(nameLabel);
    const userName = document.createElement("input");
    userName.id = "username";
    userName.type = "text";
    userName.placeholder = "Dominic Toretto";
    userName.required = true;
    nameLabel.appendChild(userName);

    const mailLabel = document.createElement("label");
    mailLabel.setAttribute("for", "email");
    mailLabel.innerText = "Email*";
    tab.appendChild(mailLabel);
    const userEmail = document.createElement("input");
    userEmail.id = "email";
    userEmail.type = "email";
    userEmail.placeholder = "user123@gmail.com";
    userEmail.required = true;
    mailLabel.appendChild(userEmail);

    const passLabel = document.createElement("label");
    passLabel.setAttribute("for", "password");
    passLabel.innerText = "Password*";
    tab.appendChild(passLabel);
    const userPassword = document.createElement("input");
    userPassword.id = "password";
    userPassword.type = "password";
    userPassword.placeholder = "********";
    userPassword.required = true;
    passLabel.appendChild(userPassword);

    const adminLabel = document.createElement("label");
    adminLabel.setAttribute('for', 'chkAdmin');
    adminLabel.innerText = "isAdmin ? ";
    tab.appendChild(adminLabel);
    const isAdmin = document.createElement("input");
    isAdmin.type = "checkbox";
    isAdmin.id = "chkAdmin";
    adminLabel.appendChild(isAdmin);

    const errorText = document.createElement("span");
    errorText.id = "errorText";
    tab.appendChild(errorText);

    const signUpBtn = document.createElement("button");
    signUpBtn.id = "signUpBtn";
    signUpBtn.type = "button";
    signUpBtn.innerText = "Register";
    tab.appendChild(signUpBtn);

    signUpBtn.addEventListener("click", (event) => {
        event.preventDefault();

        if(!userName.value || !userEmail.value || !userPassword.value){
            errorText.innerText = "Please enter all fields";
            errorText.style.color = "red";
            return;
        }

        const userExists = users.some(user =>
            user.name.toLowerCase() === userName.value.toLowerCase() ||
            user.email.toLowerCase() === userEmail.value.toLowerCase()
        );

        if (userExists) {
            errorText.innerText = "User already exists with this username or email.";
            errorText.style.color = "red";
            return;
        }

        let newUser = {
            id: Date.now(),
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
            isAdmin: isAdmin.checked
        }

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        errorText.innerText = "Signup Successful!!";
        errorText.style.color = "green";
        console.log(users);
    })
}

loginTab.addEventListener("change", ()=> {
    if(loginTab.checked) showLoginForm();
});

singUpTab.addEventListener("change", () => {
    if(singUpTab.checked) showSignUpForm();
})

window.addEventListener('DOMContentLoaded', () => {
    if (loginTab.checked) {
        showLoginForm();
    }
});
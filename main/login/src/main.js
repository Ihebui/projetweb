function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    function saveLoginInfo(username, password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
      }
      

      loginForm.addEventListener("submit", e => {
        e.preventDefault();
    
        // Get the saved login info from local storage
        const savedemail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
    
        // Get the entered login info from the form
        const usernameInput = loginForm.querySelector('[placeholder="Username or email"]');
        const passwordInput = loginForm.querySelector('[placeholder="Password"]');
        const enteredemail = usernameInput.value;
        const enteredPassword = passwordInput.value;
    
        // Check if the entered login info matches the saved login info
        if (enteredemail === savedemail && enteredPassword === savedPassword) {
            // Redirect to index.html
            window.location.href = "main2/test/index.html";
            setFormMessage(loginForm, "success", "successful login");
        } else {
            // Show error message
            console.log(savedPassword);
            console.log(enteredPassword);
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }
    });

    function saveSignupInfo(name, username, email, phone, password) {
        localStorage.setItem('name', name);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('password', password);
      }

      createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
    
        // Perform your AJAX/Fetch signup
        const nameInput = createAccountForm.querySelector('[placeholder="Full Name"]');
        const usernameInput = createAccountForm.querySelector('#signupUsername');
        const emailInput = createAccountForm.querySelector('[placeholder="Email Address"]');
        const phoneInput = createAccountForm.querySelector('[placeholder="Phone Number"]');
        const passwordInput = createAccountForm.querySelector('[placeholder="Password"]');
        const confirmPasswordInput = createAccountForm.querySelector('[placeholder="Confirm password"]');
        const name = nameInput.value;
        const username = usernameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
    
        // Save signup info to local storage
        saveSignupInfo(name, username, email, phone, password);
    
        setFormMessage(createAccountForm, "success", "successful login");
    });
    
    

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
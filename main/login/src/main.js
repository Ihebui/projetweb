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
    
        // Get form inputs
        const nameInput = createAccountForm.querySelector('[placeholder="Full Name"]');
        const usernameInput = createAccountForm.querySelector('#signupUsername');
        const phoneInput = createAccountForm.querySelector('[placeholder="Phone Number"]');
        const emailInput = createAccountForm.querySelector('[placeholder="Email Address"]');
        const passwordInput = createAccountForm.querySelector('[placeholder="Password"]');
        const confirmPasswordInput = createAccountForm.querySelector('[placeholder="Confirm password"]');
    
        // Get input values
        const name = nameInput.value.trim();
        const username = usernameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Validate inputs
        if (!name || !username || !phone || !email || !password || !confirmPassword) {
            setFormMessage(createAccountForm, "error", "Please fill in all fields.");
            return;
        }
        if (name.length < 4 ) {
            setFormMessage(createAccountForm, "error", "Name must consist of at least four letters.");
            return;
        }
        if (username.length < 4 ) {
            setFormMessage(createAccountForm, "error", "Username must consist of at least four letters.");
            return;
        }
        if (!emailPattern.test(email)) {
            setFormMessage(createAccountForm, "error", "Invalid email address.");
            return;
        }
        if (phone.length < 8 ) {
            setFormMessage(createAccountForm, "error", "Invalid phone number.");
            return;
        }
        if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
            setFormMessage(createAccountForm, "error", "Password must be at least 8 characters and contain a number and an uppercase letter.");
            return;
        }
        if (password !== confirmPassword) {
            setFormMessage(createAccountForm, "error", "Passwords do not match.");
            return;
        }
    
        // Save signup info to local storage
        saveSignupInfo(name, username, email, phone, password);
    
        // Show success message
        setFormMessage(createAccountForm, "success", "Signup successful.");

        // Redirect to LOGIN FORM
        window.location.href = "index.html";
    });
    
    
});

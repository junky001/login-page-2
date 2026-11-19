
document.addEventListener("DOMContentLoaded", () => {

    // Get HTML elements
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const togglePassword = document.getElementById("togglePassword");
    const rememberMe = document.getElementById("rememberMe");

    const signinBtn = document.getElementById("signinBtn");
    const loginMessage = document.getElementById("loginMessage");

    const forgotPassword = document.getElementById("forgotPassword");
    const registerTab = document.getElementById("registerTab");
    const registerLink = document.getElementById("registerLink");

    // =========================
    // REMEMBER SAVED EMAIL
    // =========================

    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMe.checked = true;
    }

    // =========================
    // SHOW / HIDE PASSWORD
    // =========================

    togglePassword.addEventListener("click", () => {

        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";

        togglePassword.innerHTML = isPassword
            ? '<i class="fa-regular fa-eye-slash"></i>'
            : '<i class="fa-regular fa-eye"></i>';

        togglePassword.setAttribute(
            "aria-label",
            isPassword ? "Hide password" : "Show password"
        );

    });

    // =========================
    // LOGIN FORM SUBMISSION
    // =========================

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Clear previous messages
        loginMessage.textContent = "";
        loginMessage.className = "message";

        // Basic validation
        if (!email || !password) {

            showMessage("Please fill in all fields.", "error");
            return;

        }

        if (!emailInput.checkValidity()) {

            showMessage("Please enter a valid email address.", "error");
            return;

        }

        if (password.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                "error"
            );

            return;

        }

        // Remember email
        if (rememberMe.checked) {

            localStorage.setItem("rememberedEmail", email);

        } else {

            localStorage.removeItem("rememberedEmail");

        }

        // Loading animation
        signinBtn.disabled = true;

        signinBtn.innerHTML = `
            <span>Signing In...</span>
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;

        // Demo response
        setTimeout(() => {

            signinBtn.disabled = false;

            signinBtn.innerHTML = `
                <span>Sign In</span>
                <i class="fa-solid fa-arrow-right"></i>
            `;

            showMessage(
                "Login successful! Redirecting to dashboard...",
                "success"
            );

        }, 1200);

    });

    // =========================
    // MESSAGE FUNCTION
    // =========================

    function showMessage(message, type) {

        loginMessage.textContent = message;
        loginMessage.className = `message ${type}`;

    }

    // =========================
    // FORGOT PASSWORD
    // =========================

    forgotPassword.addEventListener("click", (e) => {

        e.preventDefault();

        const email = emailInput.value.trim();

        if (!email) {

            showMessage(
                "Please enter your email address first.",
                "error"
            );

            emailInput.focus();
            return;

        }

        showMessage(
            "Password recovery will be connected to the backend.",
            "success"
        );

    });

    // =========================
    // REGISTER BUTTON
    // =========================

  function openRegister() {

    window.location.href = "signup.html";

}

    registerTab.addEventListener("click", openRegister);
    registerLink.addEventListener("click", (e) => {

        e.preventDefault();
        openRegister();

    });

});

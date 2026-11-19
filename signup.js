
document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // GET HTML ELEMENTS
    // ==============================

    const signupForm = document.getElementById("signupForm");

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("signupEmail");

    const password = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const agreeTerms = document.getElementById("agreeTerms");

    const createAccountBtn = document.getElementById("createAccountBtn");

    const signupMessage = document.getElementById("signupMessage");

    const strengthProgress = document.getElementById("strengthProgress");
    const strengthText = document.getElementById("strengthText");

    // ==============================
    // SHOW / HIDE PASSWORD
    // ==============================

    document.querySelectorAll(".signup-toggle-password").forEach(button => {

        button.addEventListener("click", () => {

            const targetId = button.dataset.target;
            const input = document.getElementById(targetId);

            const isPassword = input.type === "password";

            input.type = isPassword ? "text" : "password";

            button.innerHTML = isPassword
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';

            button.setAttribute(
                "aria-label",
                isPassword ? "Hide password" : "Show password"
            );

        });

    });

    // ==============================
    // PASSWORD STRENGTH CHECKER
    // ==============================

    password.addEventListener("input", () => {

        const value = password.value;

        let strength = 0;

        if (value.length >= 8) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[a-z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[^A-Za-z0-9]/.test(value)) strength++;

        strengthProgress.className = "";

        if (value.length === 0) {

            strengthText.textContent = "Password strength";

        } else if (strength <= 2) {

            strengthProgress.classList.add("weak");
            strengthText.textContent = "Weak password";

        } else if (strength === 3) {

            strengthProgress.classList.add("fair");
            strengthText.textContent = "Fair password";

        } else if (strength === 4) {

            strengthProgress.classList.add("good");
            strengthText.textContent = "Good password";

        } else {

            strengthProgress.classList.add("strong");
            strengthText.textContent = "Strong password";

        }

    });

    // ==============================
    // MESSAGE FUNCTION
    // ==============================

    function showMessage(message, type) {

        signupMessage.textContent = message;

        signupMessage.className = `signup-message ${type}`;

    }

    // ==============================
    // FORM SUBMISSION
    // ==============================

    signupForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const nameValue = fullName.value.trim();
        const emailValue = email.value.trim();

        const passwordValue = password.value;
        const confirmValue = confirmPassword.value;

        // Clear previous message

        signupMessage.textContent = "";
        signupMessage.className = "signup-message";

        // Validate full name

        if (nameValue.length < 2) {

            showMessage(
                "Please enter your full name.",
                "error"
            );

            fullName.focus();
            return;

        }

        // Validate email

        if (!email.checkValidity()) {

            showMessage(
                "Please enter a valid email address.",
                "error"
            );

            email.focus();
            return;

        }

        // Validate password length

        if (passwordValue.length < 8) {

            showMessage(
                "Password must contain at least 8 characters.",
                "error"
            );

            password.focus();
            return;

        }

        // Confirm passwords

        if (passwordValue !== confirmValue) {

            showMessage(
                "Your passwords do not match!",
                "error"
            );

            confirmPassword.focus();
            return;

        }

        // Check terms

        if (!agreeTerms.checked) {

            showMessage(
                "Please agree to the Terms & Conditions.",
                "error"
            );

            return;

        }

        // ==============================
        // LOADING ANIMATION
        // ==============================

        createAccountBtn.disabled = true;

        createAccountBtn.innerHTML = `
            <span>Creating Account...</span>
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;

        // ==============================
        // DEMO ACCOUNT CREATION
        // ==============================

        setTimeout(() => {

            createAccountBtn.disabled = false;

            createAccountBtn.innerHTML = `
                <span>Create Account</span>
                <i class="fa-solid fa-arrow-right"></i>
            `;

            showMessage(
                "Validation successful! Connect your backend to create the account.",
                "success"
            );

        }, 1500);

    });

    // ==============================
    // TERMS & CONDITIONS
    // ==============================

    document.getElementById("termsLink").addEventListener("click", (e) => {

        e.preventDefault();

        alert("Your Terms & Conditions page will be added later.");

    });

});

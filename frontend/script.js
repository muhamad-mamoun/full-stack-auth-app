const requestHandlers = [loginRequest, registerRequest];

const validationRules = {
    FullName: {
        regex: /^.{3,}$/,
        message: '* Name must be at least 3 characters.'
    },
    Email: {
        regex: /^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
        message: 'Invalid email address (e.g., name@example.com).'
    },
    Password: {
        regex: /^.{8,}$/,
        message: '* Password must be at least 8 characters.'
    },
    ProfilePicture: {
        regex: /.+\.(jpg|jpeg|png)/,
        message: 'Invalid picture format (allowed jpg, jpeg, or png).'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const switchButtons = document.querySelectorAll('.switch-button');
    const loginSide = document.querySelector('.login-side');
    const registerSide = document.querySelector('.register-side');
    const uploadImage = document.getElementById('profile-picture');
    const errorMessageElement = document.querySelector('.error-message');

    switchButtons.forEach((button) => {
        button.addEventListener('click', () => {
            loginSide.classList.toggle('shifted-right');
            registerSide.classList.toggle('shifted-right');
        });
    });

    [loginSide, registerSide].forEach((side) => {
        side.querySelectorAll('form .validate').forEach((inputField) => {
            inputField.addEventListener('change', () => {
                const validationResult = validateInputField(inputField);
                applyValidationClass(inputField, validationResult);
            });
        });
    });

    uploadImage.addEventListener('change', () => {
        const fileNameElement = document.querySelector('.file-label p');
        const inputFieldLabel = document.querySelector('.file-label');
        fileNameElement.textContent = uploadImage.value.split('\\')[2];
        const validationResult = validateInputField(uploadImage);
        applyValidationClass(inputFieldLabel, validationResult);
    });

    [loginSide, registerSide].forEach((side, formIndex) => {
        side.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault();
            let formValidationResult = true;
            let errorMessage = '';

            side.querySelectorAll('.validate').forEach((inputField) => {
                if (!validateInputField(inputField) && formValidationResult === true) {
                    errorMessage = validationRules[inputField.name].message;
                    formValidationResult = false;
                }
            });

            if (formValidationResult === false) {
                errorMessageElement.textContent = errorMessage;
                errorMessageElement.classList.remove('hidden');
                formValidationResult = true;
            }
            else {
                errorMessageElement.textContent = '';
                requestHandlers[formIndex]();
                // window.location.href = '/dashboard';
            }
        });
    });
});

function validateInputField(inputField) {
    const regex = validationRules[inputField.name].regex;
    return regex.test(inputField.value);
}

function applyValidationClass(element, result) {
    if (result === true) {
        element.classList.add('valid-input');
        element.classList.remove('invalid-input');
    } else {
        element.classList.add('invalid-input');
        element.classList.remove('valid-input');
    }
}

function loginRequest() {
    const loginForm = document.querySelector('.login-form');
    const formData = new FormData(loginForm);

    fetch('http://127.0.0.1:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Email: formData.get('Email'),
            Password: formData.get('Password')
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => alert(`Error: ${error}`));
}

async function registerRequest() {
    const registerForm = document.querySelector('.register-form');
    const formData = new FormData(registerForm);

    fetch('http://127.0.0.1:3000/api/v1/auth/register', {
        method: 'POST',
        body: formData,
    })
        .then(response => JSON.parse(response))
        .then(data => console.dir(`Data: ${data}`))
        .catch(error => alert(`Error: ${error}`));
}
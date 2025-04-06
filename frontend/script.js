const container = document.querySelector('.container');
const switchButtons = document.querySelectorAll('.switch-button');
const loginSide = document.querySelector('.login-side');
const loginForm = document.querySelector('.login-form');
const registerSide = document.querySelector('.register-side');
const registerForm = document.querySelector('.register-form');
const uploadImage = document.getElementById('profile-picture');
const passwordInputs = document.querySelectorAll('.password-input');
const passwordVisibilty = document.querySelectorAll('.password-visibily');
const errorMessageElement = document.querySelector('.error-message');
const popupContainer = document.querySelector('.popup-container');
const popupMessage = document.querySelector('.popup-message');
const popupIcon = document.querySelector('.popup-icon>img');
const requestHandlers = [loginRequest, registerRequest];
let currentPasswordVisibilty = [0, 0];
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
        regex: /\.(jpg|jpeg|png)$/,
        message: 'Invalid picture format (allowed jpg, jpeg, or png).'
    }
}

loginForm.Email.value = localStorage.getItem('full-stack-auth-app-rememberedEmail') ?? '';

switchButtons.forEach((button) => {
    button.addEventListener('click', () => {
        loginSide.classList.toggle('shifted-right');
        registerSide.classList.toggle('shifted-right');
    });
});

passwordVisibilty.forEach((button, index) => {
    button.addEventListener('click', () => {
        const visibily = [{ inputType: 'password', imgPath: 'assets/invisible.png' }, { inputType: 'text', imgPath: 'assets/visible.png' }];
        currentPasswordVisibilty[index] ^= 1;

        button.setAttribute('src', visibily[currentPasswordVisibilty[index]].imgPath);
        passwordInputs[index].setAttribute('type', visibily[currentPasswordVisibilty[index]].inputType);
    });
});

document.querySelectorAll('.validate').forEach((inputField) => {
    inputField.addEventListener('change', () => {
        const validationResult = validateInput(inputField.value, validationRules[inputField.name].regex);
        applyValidationClass(inputField, validationResult);
    });
});

uploadImage.addEventListener('change', () => {
    const fileNameElement = document.querySelector('.file-label p');
    const inputFieldLabel = document.querySelector('.file-label');
    fileNameElement.textContent = uploadImage.value.split('\\')[2] || 'Upload Profile Picture';;
    const validationResult = validateInput(fileNameElement.textContent, validationRules['ProfilePicture'].regex);
    applyValidationClass(inputFieldLabel, validationResult);
});

function validateInput(value, regex) {
    return regex.test(value);
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

[loginForm, registerForm].forEach((form, formIndex) => {
    form.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();

        let validationResult = true;
        let errorMessage = '';

        form.querySelectorAll('.validate').forEach((inputField) => {
            const inputValidationResult = validateInput(inputField.value, validationRules[inputField.name].regex);

            if (validationResult && !inputValidationResult) {
                errorMessage = validationRules[inputField.name].message;
                validationResult = false;
            }
        });

        if (!validationResult) {
            errorMessageElement.textContent = errorMessage;
            errorMessageElement.classList.remove('hidden');
        } else {
            errorMessageElement.classList.add('hidden');
            errorMessageElement.textContent = '';
            popupMessage.textContent = 'Processing...';
            popupIcon.setAttribute('src', 'assets/hourglass.png');
            popupContainer.style.opacity = '1';
            container.style.filter = 'blur(4px)';

            const responseBody = await requestHandlers[formIndex]();

            popupMessage.textContent = responseBody.message ?? 'No Response';
            setTimeout(() => { popupContainer.style.opacity = '0'; container.style.filter = 'blur(0px)' }, 1200);

            if (responseBody.status === 'Success') {
                if (loginForm.RememberMe.checked) localStorage.setItem('full-stack-auth-app-rememberedEmail', loginForm.Email.value);
                popupIcon.setAttribute('src', 'assets/success.png');
                setTimeout(() => window.location.href = 'home.html', 1200);

            } else if ((responseBody.status === 'Failed') || (responseBody.status === 'Refused')) {
                popupIcon.setAttribute('src', './assets/fail.png');
            } else {
                popupIcon.setAttribute('src', './assets/unknown.png');
            }
        }
    });
});

async function loginRequest() {
    const formData = new FormData(loginForm);

    try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Email: formData.get('Email'),
                Password: formData.get('Password')
            }),
        });

        const data = await response.json();
        return data;

    } catch (error) { alert(`Error: ${error}`) }
}

async function registerRequest() {
    const formData = new FormData(registerForm);

    try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/auth/register', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        const data = await response.json();
        return data;

    } catch (error) { alert(`Error: ${error}`) }
}

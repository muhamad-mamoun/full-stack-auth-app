document.addEventListener('DOMContentLoaded', () => {
    const switchButtons = document.querySelectorAll('.switch-button');
    const loginSide = document.querySelector('.login-side');
    const registerSide = document.querySelector('.register-side');

    switchButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            loginSide.classList.toggle('shifted-right');
            registerSide.classList.toggle('shifted-right');
        });
    });
});
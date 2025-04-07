document.addEventListener('DOMContentLoaded', async () => {
    const respose = await fetch('http://127.0.0.1:3000/api/v1/home/', {
        method: 'GET',
        credentials: 'include',
    });

    const body = await respose.json();

    document.querySelector('.user-name').textContent = body.data.FullName;
    document.querySelector('.user-info').textContent = body.data.Email;
    document.querySelector('.profile-picture>div').style.backgroundImage = `url(http://127.0.0.1:3000/profile-picture/${body.data.ProfilePicture})`;
});

document.getElementById('logout-button').addEventListener('click', async () => {
    const respose = await fetch('http://127.0.0.1:3000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
    });

    const body = await respose.json();

    if (body.status === 'Success') window.location.href = 'index.html';
});
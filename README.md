# Full-Stack Authentication App

This is a full-stack authentication application built with Node.js, Express, MongoDB, and vanilla JavaScript. It provides user registration, login, and logout functionality, along with profile picture uploads and secure authentication using JWT.

## Features

- User registration with validation and profile picture upload.
- User login with "Remember Me" functionality.
- Secure authentication using JWT stored in HTTP-only cookies.
- User logout functionality.
- Responsive frontend with a clean and modern design.
- Backend logging using Winston.
- Email notifications for user registration using Nodemailer.

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Multer for file uploads
- Nodemailer for email notifications
- Winston for logging

### Frontend
- HTML, CSS, and JavaScript
- Responsive design with CSS variables

## Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muhamad-mamoun/full-stack-auth-app.git
   cd Full-Stack-Auth-App
   ```

2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=3000
   JWT_SECRET=<your-jwt-secret>
   DATABASE_URI=<your-mongodb-uri>
   MAIL_SERVICE_EMAIL=<your-email>
   MAIL_SERVICE_PASSWORD=<your-email-password>
   ENVIRONMENT=development
   ```

4. Navigate to the frontend directory and ensure all assets are in place:
   ```bash
   cd ../frontend
   ```

## How to Use the Project

### Running the Backend

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. The backend will run on `http://127.0.0.1:3000`.

### Running the Frontend

1. Open the `frontend/index.html` file in your browser.

### User Workflow

1. **Register**: Fill in the registration form with your full name, email, password, and profile picture. Click "Register" to create an account.
2. **Login**: Use your email and password to log in. Optionally, check "Remember Me" to save your email for future logins.
3. **Dashboard**: After logging in, you will be redirected to the dashboard (`home.html`), where your profile picture, name, and email are displayed.
4. **Logout**: Click the "Logout" button to end your session.

## Project Structure

```
Full-Stack Auth App/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   ├── logs/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── assets/
│   ├── home.css
│   ├── home.html
│   ├── home.js
│   ├── index.html
│   ├── script.js
│   ├── style.css
└── README.md
```

## Logging

- Logs are stored in the `backend/logs/` directory.
- `server.logs`: General server logs.
- `server.error.logs`: Error logs.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries, please contact me at muhamadmamoun@gmail.com.

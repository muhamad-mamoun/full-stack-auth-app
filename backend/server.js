const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logRequest = require('./middlewares/logger');

dotenv.config();
const router = require('./routes/index.route');

const app = express();
mongoose.connect(process.env.DATABASE_URI);

app.use(cors({
    origin: (origin, callback) => {
        (!origin || /^http:\/\/(127.0.0.1|localhost):{0,1}[0-9]*$/.test(origin)) ? callback(null, origin) : callback(new Error('Not allowed by CORS'));
    }, credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/profile-picture', express.static('uploads'));
app.use(logRequest);
app.use(router);

mongoose.connection.on('connected', () => {
    console.log(`Connected to the database successfully [${mongoose.connection.host}]`);
});

mongoose.connection.on('error', () => {
    console.log('Failed to connect to the database');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}...`);
});
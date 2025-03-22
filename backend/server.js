const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./routes/index.route');

dotenv.config();

const app = express();
mongoose.connect(process.env.DATABASE_URI);

app.use(cors());
app.use(express.json());

app.use('/profile-picture', express.static('uploads'));
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
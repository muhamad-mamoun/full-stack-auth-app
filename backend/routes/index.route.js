const express = require('express');
const authRouter = require('./auth.route');
const homeRouter = require('./home.route');

const router = express.Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/home', homeRouter);

module.exports = router;
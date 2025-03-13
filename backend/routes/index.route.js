const express = require('express');
const authRouter = require('./auth.route');

const router = express.Router();

router.use('/api/v1/auth', authRouter);

module.exports = router;
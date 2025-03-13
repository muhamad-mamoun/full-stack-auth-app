const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('Token', token, {
        secure: process.env.ENVIRONMENT === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: '/'
    });
}

module.exports = generateToken;
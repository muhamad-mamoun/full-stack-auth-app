const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.cookie.split('=')[1];
    const result = jwt.verify(token, process.env.JWT_SECRET);

    if (!result) res.status(401).json({ statuxs: 'Refused', message: 'Unauthorized access', data: '' });
    else {
        req.userId = result.userId;
        next();
    }
}

module.exports = verifyToken;
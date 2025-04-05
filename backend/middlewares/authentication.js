const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.Token;

        if (!token) {
            return res.status(401).json({ status: 'Failed', message: 'Unauthorized: No token provided', data: '' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();

    } catch (error) {
        res.status(401).json({ status: 'Failed', message: 'Unauthorized: Invalid or expired token', data: '' });
        console.error(error);
    }
}

module.exports = verifyToken;
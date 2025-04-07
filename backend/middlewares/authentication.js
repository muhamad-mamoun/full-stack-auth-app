const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.Token;

        if (!token) {
            logger.info('Unauthorized Access: No token provided');
            return res.status(401).json({ status: 'Failed', message: 'Unauthorized: No token provided', data: '' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();

    } catch (error) {
        logger.info('Unauthorized Access: Invalid or expired token');
        return res.status(401).json({ status: 'Failed', message: 'Unauthorized: Invalid or expired token', data: '' });
    }
}

module.exports = verifyToken;
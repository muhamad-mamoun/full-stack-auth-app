const User = require('../models/auth.model');
const logger = require('../utils/logger');

const getUserData = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        if (userData) res.status(200).json({ statuxs: 'Success', message: 'User exists', data: userData });
        else res.status(404).json({ statuxs: 'Failed', message: 'User not found', data: '' });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ status: 'Failed', message: 'Internal Server Error', data: '' });
    }
}

module.exports = { getUserData };
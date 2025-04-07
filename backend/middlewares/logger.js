const logger = require('../utils/logger');

const logRequest = (req, res, next) => {
    logger.info(`Incoming ${req.method} request on ${req.url}`);
    next();
}

module.exports = logRequest;
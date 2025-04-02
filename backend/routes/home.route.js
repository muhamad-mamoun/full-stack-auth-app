const express = require('express');
const authentication = require('../middlewares/authentication');
const homeController = require('../controllers/home.controller');

const router = express.Router();

router.get('/', authentication, homeController.getUserData);

module.exports = router;
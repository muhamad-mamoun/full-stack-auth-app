const express = require('express');
const uploads = require('../middlewares/multer');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', uploads.single('ProfilePicture'), authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
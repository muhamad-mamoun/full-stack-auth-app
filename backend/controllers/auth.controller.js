const User = require('../models/auth.model');
const generateToken = require('../utils/token');

const register = async (req, res) => {
    try {
        const { FullName, Email, Password, ProfilePicture } = req.body;
        const isEmailExists = await User.findOne({ Email });

        if (isEmailExists) {
            return res.status(409).json({ status: 'Refused', message: 'Email already exists', data: '' });
        }

        const newUser = await User.create({ FullName, Email, Password, ProfilePicture });

        generateToken(newUser._id, res);
        res.status(201).json({ status: 'Success', message: 'User created successfully', data: newUser });

    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Internal Server Error', data: '' });
        console.error(error);
    }
}

const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(401).json({ status: 'Refused', message: 'Invalid email or password', data: '' });
        }

        const isValidPassword = await user.checkPassword(Password);
        if (!isValidPassword) {
            return res.status(401).json({ status: 'Refused', message: 'Invalid email or password', data: '' });
        }

        generateToken(user._id, res);
        res.status(200).json({ status: 'Success', message: 'User logged in successfully', data: user });

    } catch (error) {
        res.status(500).json({ status: 'Failed', message: 'Internal Server Error', data: '' });
        console.error(error);
    }
}

const logout = (req, res) => {
    res.clearCookie('Token');
    res.status(200).json({ status: 'Success', message: 'User logged out successfully', data: '' });
}

module.exports = { register, login, logout };
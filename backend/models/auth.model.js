const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        FullName: {
            type: String,
            required: true,
            trim: true,
            match: [/^[a-zA-Z\ -_.']{4,}$/, 'Invalid name format']
        },
        Email: {
            type: String,
            required: true,
            match: [/^[a-zA-Z._]+@[a-zA-Z._-]+\.[a-zA-Z._-]+$/, 'Invalid email format']
        },
        Password: {
            type: String,
            required: true,
            minlength: [8, 'Password must be at least 8 characters']
        },
        ProfilePicture: {
            type: String,
            default: ''
        },
    }, { timestamps: true }
);

const User = mongoose.model('Users', schema);

module.exports = User;
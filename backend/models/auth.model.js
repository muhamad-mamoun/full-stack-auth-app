const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
            match: [/^[a-zA-Z1-9._]+@[a-zA-Z._-]+\.[a-zA-Z._-]+$/, 'Invalid email format']
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

schema.methods.checkPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
}

schema.pre('save', async function (next) {
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

schema.set('toJSON', {
    transform: (_doc, { Password, __v, ...rest }, options) => rest
});

const User = mongoose.model('Users', schema);

module.exports = User;
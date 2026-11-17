const mongoose = require('mongoose');

// Schema for user model
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
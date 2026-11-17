const mongoose = require('mongoose');

const ConnectDB = async () => {
    const mongoUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/authentication_basics';

    await mongoose.connect(mongoUrl);
    console.log('MongoDB Connection Successful');
};

module.exports = ConnectDB;
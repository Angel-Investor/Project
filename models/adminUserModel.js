const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminUser = new Schema({
    adminUserName: {
        type: String,
        default: "admin",

    },
    password: {
        type: String,
        default: "admin123"
    }
});

module.exports = mongoose.model('Admin User', adminUser);
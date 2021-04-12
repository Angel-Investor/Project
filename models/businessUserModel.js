const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessUserSchema = new Schema({
    businessUserName: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    businessUserEmail: {
        type: String,
        trim: true,
        required: true
    },
    businessDisplayName: {
        type: String,
        trim: true,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Business User', businessUserSchema);
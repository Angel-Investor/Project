const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessPostSchema = new Schema({

    businessPostTitle: {
        type: String,
        trim: true,
        required: true,
    },
    businessPostEmail: {
        type: String,
        trim: true,
        required: true,
    },
    businessPostBody: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Business Post', businessPostSchema);
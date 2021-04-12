const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investorPostSchema = new Schema({

    investorPostTitle: {
        type: String,
        trim: true,
        required: true,
    },
    investorPostEmail: {
        type: String,
        trim: true,
        required: true,
    },
    investorPostBody: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true });

investorPostSchema.index({ owner: 1 });

module.exports = mongoose.model('Investor Post', investorPostSchema);
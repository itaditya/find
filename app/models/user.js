var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    imageUrl: {
        type: String
    },
    shortCode: {
        type: Number
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
    gplus: {
        type: String
    },
    email: {
        type: String
    },
    resume: {
        type: String
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('User', userSchema);

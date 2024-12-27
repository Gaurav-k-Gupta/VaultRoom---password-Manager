const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    image : {
        type: String
    }
});

const GUserModel = mongoose.model('G-login', UserSchema);
module.exports = GUserModel;
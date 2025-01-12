const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CredentialSchema = new Schema({
    website: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userDataArray = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    credentials: [CredentialSchema]
})

const UserDataModel = mongoose.model('password', userDataArray);
module.exports = UserDataModel;
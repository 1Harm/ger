let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})
let userModel = new mongoose.model('users', schema);
module.exports = userModel;
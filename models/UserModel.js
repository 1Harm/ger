let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName:  String,
    phone: String,
});
let userModel = new mongoose.model('Harm', schema);
module.exports = userModel;
var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true},
    otherNames: String,
    level: String,
    sex: String,
    added: String
});


var User = mongoose.model('students', userSchema);
module.exports = User;
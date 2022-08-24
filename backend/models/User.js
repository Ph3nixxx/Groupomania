/* Modules */
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: { type: String, required: true, maxLength : 40, trimp: true },
    firstname: { type: String, required: true, maxLength : 40, trimp: true },
    job: { type: String, required: true, maxLength : 40, trimp: true },
    email: { type: String, required: true, maxLength: 60, lowercase: true, trimp: true, unique: true},
    password: { type: String, required: true, minLength: 6 },
    photoUrl: { type: String, required: true },
    isAdmin : {type: Boolean, required: true }
},
{
    timestamps: true
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
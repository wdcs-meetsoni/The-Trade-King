const mongoose = require('mongoose');
const constants = require('../constants');

const Schema = new mongoose.Schema({
    emailId: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    twoFectorAuthentication:{type: Boolean, default: false},

    OTP: { type: Number },
    OTPExp: { type: Date },
    fullName: { type: String },
    userName: { type: String ,unique: true},
    phoneNumber: { type: Number },
    password: { type: String },
    accountCreatedAt: { type: Date },
    logInAt: { type: Date },
    logOutAt: { type: Date},
    loginAt: { type: Date },
    logOutAt: { type: Date },
    avatar:{ type:String},

    status: {
        type: String,
        enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE],
        default: constants.STATUS.INACTIVE
    },
    role: {
        type: String,
        enum: [constants.USER_ROLE.SUPER_ADMIN, constants.USER_ROLE.ADMIN],
        default: constants.USER_ROLE.ADMIN
    },
    
    JwtToken:{type: String}


})

const Admin = mongoose.model(process.env.ADMIN_COLLECTION, Schema);
module.exports = Admin

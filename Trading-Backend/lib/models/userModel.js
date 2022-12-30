
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

    OTP: { type: Number },
    OTPExp: { type: Date },
    userName: { type: String, default: '', require: true },
    password: { type: String, require: true },

    pancard: {
        type: String,
        upercase: true, require: true
    },

    processingFeePaid: { type: Boolean, require: true },
    accountCreatedAt: { type: Date },
    logInAt: { type: Date },
    logOutAt: { type: Date },
    isSecondStepCompleted: { type: Boolean, default: false },
    address: {
        HomeDetails: { type: String, require: true },
        cityDistrictTown: { type: String, require: true },
        state: { type: String, require: true },
        landmark: { type: String, require: true },
        zipCode: { type: Number, require: true }

    },
    personalDetails: {
        fullName: { type: String, require: true },
        FatherName: { type: String, require: true },
        MotherName: { type: String, require: true },
        matiralStatus: { type: String, require: true },
        phoneNumber: { type: Number, maxLength: 10, minmaxLength: 10, require: true },
    },

    bankDetails: {
        bankName: { type: String, require: true },
        banckIFSC: { type: String, require: true },
        branchMCR: { type: String },
        bankAccountNumber: { type: Number, require: true },
        UPI_ID: { type: String, require: true }
    },

    backgroundDetails: {
        AnnualIncome: { type: Number, require: true },
        TradingExperience: { type: String, require: true },
        FundSatelment: { type: String, require: true },
        Occupation: { type: String, require: true },
    },

    status: {
        type: String,
        enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE],
        default: constants.STATUS.INACTIVE
    },
    approvedUser: { type: Boolean, default: false },
    avatar: { type: String, require: true },
    twoFectorAuthentication: { type: Boolean, default: false },
    role: {
        type: String,
        enum: [constants.USER_ROLE.SUPER_ADMIN, constants.USER_ROLE.ADMIN, constants.USER_ROLE.USER],
        default: constants.USER_ROLE.USER
    },
    JwtToken: { type: String }
})

//Schema.index({ accountCreatedAt: 1 }, { expireAfterSeconds: 86400, partialFilterExpression: { isSecondStepCompleted: false } })

const User = mongoose.model(process.env.USER_COLLECTION, Schema);
module.exports = User
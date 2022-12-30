const mongoose = require('mongoose');
const constants = require('../constants');

const Schema = new mongoose.Schema({
    mailTitle: {
        type: String, enum: [
            constants.EMAIL_TEMPLATE_TITLE.FIRST_STEP,
            constants.EMAIL_TEMPLATE_TITLE.SECOND_STEP,
            constants.EMAIL_TEMPLATE_TITLE.APPROVAL_MAIL,
            constants.EMAIL_TEMPLATE_TITLE.VERIFICATION_CODE,
            constants.EMAIL_TEMPLATE_TITLE.RESEND_CODE,
            constants.EMAIL_TEMPLATE_TITLE.RESET_PASSWORD,
            constants.EMAIL_TEMPLATE_TITLE.FORGOT_PASSWORD,
            constants.EMAIL_TEMPLATE_TITLE.APPROVED_USER,
            constants.EMAIL_TEMPLATE_TITLE.BLOCKED_USER,
            constants.EMAIL_TEMPLATE_TITLE.TEST_NAME
        ],
        require: true
    },
    
    mailSubject: {
        type: String, enum: [
            constants.EMAIL_TEMPLATE_SUB.FIRST_STEP,
            constants.EMAIL_TEMPLATE_SUB.SECOND_STEP,
            constants.EMAIL_TEMPLATE_SUB.APPROVAL_MAIL,
            constants.EMAIL_TEMPLATE_SUB.VERIFICATION_CODE,
            constants.EMAIL_TEMPLATE_SUB.RESEND_CODE,
            constants.EMAIL_TEMPLATE_SUB.RESET_PASSWORD,
            constants.EMAIL_TEMPLATE_SUB.FORGOT_PASSWORD,
            constants.EMAIL_TEMPLATE_SUB.APPROVED_USER,
            constants.EMAIL_TEMPLATE_SUB.BLOCKED_USER,
            constants.EMAIL_TEMPLATE_SUB.TEST_NAME
        ],
        require: true
    },
    mailBody: { type: String, require: true },
    mailSignature: { type: String},

    createdAt: { type: Date, require: true },
    editedAt: { type: Date, require: true },
    editedBy: { type: mongoose.Types.ObjectId, require: true },
    createdBy: { type: mongoose.Types.ObjectId, require: true },

})

const EmailTemplate = mongoose.model(process.env.EMAIl_COLLECTION, Schema);
module.exports = EmailTemplate;
require('dotenv').config()
const nodemailer = require('nodemailer')
const constants = require('../constants')
const mapper = require('../modules/common/commonMapper')


const sendEmail = (mailUserDetails, templateDetails) => {
    return mailOpearation(mailUserDetails, templateDetails)
}

const value = (item) => {
    return item.replace(/\${(\w+)}/, "$1")
}
const mailOpearation =(mailUserDetails, templateDetails) => {
    if (templateDetails) {

        let mailBody = templateDetails.mailBody
        let idx = mailBody.match(new RegExp(/\${\w+}/g))

        if (idx && idx.length > 0) {
            idx.map((item, index) => {
                mailBody = mailBody.replace(/\${\w+}/, mailUserDetails[value(idx[index])])
                return item
            })
        }
        let returnValue = createMailOptions(
            process.env.EMAIL_USERNAME,
            mailUserDetails.emailId,
            templateDetails.mailSubject,
            mailBody
        )
        return SEND_EMAIL(returnValue)
    } else {
        return true;
    }
}

const createMailOptions = (sender, receivers, subject, body) => {
    let mailDetils = {
        from: sender,
        to: receivers,
        subject: subject,
        html: body,
    }
    return mailDetils
}

const SEND_EMAIL = (mailOptions) => {
    let transporter = nodemailer.createTransport(constants.EMAIL_CONFIG);
     let done = transporter.sendMail(mailOptions)
     if(done){
        return mapper.responseMapping(
            constants.CODE.Success,
            constants.MESSAGE.Success
        )
     }else{
        return mapper.responseMapping(
            constants.CODE.INTRNLSRVR,
            constants.MESSAGE.INTRNLSRVR
        )
     }
}



module.exports = {
    sendEmail,
    createMailOptions
}




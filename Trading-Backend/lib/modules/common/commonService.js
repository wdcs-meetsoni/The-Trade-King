const Cdao = require("../common/commonDao")
const Adao = require("../admin/adminDao")
const Udao = require("../user/userDao")
const mapper = require("./commonMapper")
const constants = require("../../constants")
const middleware = require("../../middleware")
const appUtils = require("../../appUtils")


const sendOTP = async (details) => {
    try {
        if (!details || Object.keys(details).length === 0) {
            return mapper.responseMapping(
                constants.CODE.BadRequest,
                constants.MESSAGE.InvalidDetails
            )
        } else {
            let query = { '_id': details._id }
            let user = await Udao.getUserDetails(query), admin = await Adao.getAdminDetails(query)

            console.log('result', user, "||", admin);

            if (!user && !admin) {
                return mapper.responseMapping(
                    constants.CODE.BadRequest,
                    constants.MESSAGE.InvalidDetails
                );
            } else {
                let person = user ? user : admin, OTP = Math.floor(100000 + Math.random() * 900000)
                let newObj = { OTP, OTPExp: Date.now() + 120000 }


                let mailQuery = { mailTitle: constants.EMAIL_TEMPLATE_TITLE.VERIFICATION_CODE }
                let templateDetails = await Adao.getOneEmailTemplateDetails(mailQuery)
                if (!templateDetails) {
                    return mapper.responseMapping(
                        constants.CODE.BadRequest,
                        constants.MESSAGE.InvalidDetails
                    )
                } else {
                    let mailUserDetails = {
                        emailId: person.emailId,
                        userName: person.userName,
                        OTP
                    }
                    let isEmail = middleware.email.sendEmail(mailUserDetails, templateDetails)
                    if (!isEmail) {
                        return mapper.responseMapping(
                            constants.CODE.INTRNLSRVR,
                            constants.MESSAGE.INTRNLSRVR,
                        )
                    } else {
                        let updateUser = user ? await Udao.updateUserDetails(person._id, newObj)
                            : await Adao.updateAdminDetails(person._id, newObj)
                        if (!updateUser) {
                            return mapper.responseMapping(
                                constants.CODE.INTRNLSRVR,
                                constants.MESSAGE.INTRNLSRVR,
                            )
                        } else {
                            return mapper.responseMapping(
                                constants.CODE.Success,
                                constants.MESSAGE.VerificationOTPsendSuccess
                            )
                        }
                    }
                }
            }
        }
    } catch (error) {
        return mapper.responseMapping(
            constants.CODE.INTRNLSRVR,
            constants.MESSAGE.InternalServerError
        )
    }
}


const verifySecurityCode = async (id, OTP) => {
    try {
        let query = {
            _id: id,
        };
        let user = await Udao.getUserDetails(query).select(['-password', '-JwtToken'])
        let admin = await Adao.getAdminDetails(query).select(['-password', '-JwtToken'])

        //console.log("vetify", user ? user : admin);

        if (!user && !admin) {
            return mapper.responseMapping(
                constants.CODE.Unuthorized,
                constants.MESSAGE.Unuthorized
            );
        } else {
            let person = user ? user : admin
            let currentTime = new Date(Date.now());
            let validTime = new Date(person.OTPExp);

            if (currentTime > validTime) {
                console.log("ValidTime")
                return mapper.responseMapping(
                    constants.CODE.ReqTimeOut,
                    constants.MESSAGE.OTPTimeOut
                );
            } else {
                if (person.OTP !== OTP) {
                    return mapper.responseMapping(
                        constants.CODE.BadRequest,
                        constants.MESSAGE.InvalidOTP
                    );
                } else {

                    let JwtToken = middleware.jwtHandler.genJwtToken(person, '1d') //------------->Jwt_Token_Created
                    if (JwtToken) {
                        const setToken = user ? await Udao.updateUserDetails(user._id, { JwtToken }) : await Adao.updateAdminDetails(admin._id, { JwtToken })

                        return mapper.responseMappingWithData(
                            constants.CODE.Success,
                            constants.MESSAGE.Success,
                            { auth: JwtToken, User: person }
                        )
                    } else {
                        return mapper.responseMapping(
                            constants.CODE.BadRequest,
                            constants.MESSAGE.InternalServerError,
                        );
                    }
                }
            }
        }
    } catch (error) {
        console.log('error', error)
        return mapper.responseMapping(
            constants.CODE.INTRNLSRVR,
            constants.MESSAGE.InternalServerError
        );
    }
};

const resendVerifySecurityCode = async (id) => {
    console.log('object');
    try {
        let query = {
            _id: id,
        };
        let user = await Udao.getUserDetails(query)
        let admin = await Adao.getAdminDetails(query)
        //console.log('verify', user || admin);

        if (!user && !admin) {
            return mapper.responseMapping(
                constants.CODE.BadRequest,
                constants.MESSAGE.InvalidDetails
            )
        } else {
            let person = user ? user : admin

            let sendAgain = sendOTP(person)
            if (!sendAgain) {
                return mapper.responseMapping(
                    constants.CODE.INTRNLSRVR,
                    constants.MESSAGE.InternalServerError
                );
            } else {
                return mapper.responseMapping(
                    constants.CODE.Success,
                    constants.MESSAGE.VerificationOTPsendSuccess
                );
            }

        }

    } catch (error) {
        return mapper.responseMapping(
            constants.CODE.INTRNLSRVR,
            constants.MESSAGE.InternalServerError
        );
    }
};

const forgetPassword = async (data) => {
    try {
        let query = {
            emailId: data.emailId,
        }

        let user = await Udao.getUserDetails(query)
        let admin = await Adao.getAdminDetails(query)

        //console.log('User', user, '||', 'Admin', admin)

        if (!user && !admin) {
            return mapper.responseMapping(
                constants.CODE.Unuthorized,
                constants.MESSAGE.Unuthorized
            )
        } else {
            let person = user ? user : admin

            let JWToken = middleware.jwtHandler.genJwtToken(person, '1h')

            let mailQuery = { mailTitle: constants.EMAIL_TEMPLATE_TITLE.FORGOT_PASSWORD }
            let templateDetails = await Adao.getOneEmailTemplateDetails(mailQuery)
            if (!templateDetails) {
                return mapper.responseMapping(
                    constants.CODE.BadRequest,
                    constants.MESSAGE.InvalidDetails
                )
            } else {
                let mailUserDetails = {
                    emailId: person.emailId,
                    userName: person.userName,
                    JWToken,
                    userId:person._id
                }
                let isEmail = middleware.email.sendEmail(mailUserDetails, templateDetails)
                if (!isEmail) {
                    return mapper.responseMapping(
                        constants.CODE.INTRNLSRVR,
                        constants.MESSAGE.INTRNLSRVR,
                    )
                } else {
                    return mapper.responseMapping(
                        constants.CODE.Success,
                        constants.MESSAGE.Success
                    )
                }
            }
        }
    } catch (error) {
        return mapper.responseMapping(
            constants.CODE.INTRNLSRVR,
            constants.MESSAGE.InternalServerError
        );
    }
}

const changePassword = async (data) => {
    try {
        let query = {
            _id: data.userId
        }

        let user = await Udao.getUserDetails(query)
        let admin = await Adao.getAdminDetails(query)

        //console.log('User', user, '||', 'Admin', admin)

        if (!user && !admin) {
            return mapper.responseMapping(
                constants.CODE.BadRequest,
                constants.MESSAGE.InvalidDetails
            )
        } else {
            let person = user ? user : admin

            let vetify = await appUtils.validPassword(data.oldPassword, person.password)
            let Npassword = await appUtils.convertPass(data.newPassword)
            if (!vetify) {
                return mapper.responseMapping(
                    constants.CODE.BadRequest,
                    constants.MESSAGE.InvalidPassword
                )
            } else {
                let change = user ? await Udao.updateUserDetails(person._id, { password: Npassword })
                    : await Adao.updateAdminDetails(person._id, { password: Npassword })

                if (!change) {
                    return mapper.responseMapping(
                        constants.CODE.INTRNLSRVR,
                        constants.MESSAGE.InternalServerError
                    )
                } else {
                    return mapper.responseMapping(
                        constants.CODE.Success,
                        constants.MESSAGE.Success
                    )
                }
            }
        }
    } catch (error) {
        return mapper.responseMapping(
            constants.CODE.INTRNLSRVR,
            constants.MESSAGE.InternalServerError
        );
    }
}

module.exports = {
    resendVerifySecurityCode,
    verifySecurityCode,
    forgetPassword,
    changePassword,
    sendOTP
} 

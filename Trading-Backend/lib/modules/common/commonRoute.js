const router = require('express').Router()
const service = require('./commonService')
const mapper = require('./commonMapper')
const constants = require('../../constants')
const validate = require('./commonValidator')

router
    .route('/verifySecurityCode/:id')
    .post(async (req, res) => {
        console.log('verifySecurityCode------------->', req.body.OTP, '||', req.params.id)
        try {
            let id = req.params.id
            let OTP = req.body.OTP

            let result = await service.verifySecurityCode(id, OTP)
            res.status(result.responseCode).send(result)

        } catch (error) {
            console.log('error', error)
            res.status(500).send(
                mapper.responseMapping(
                    constants.CODE.INTRNLSRVR,
                    constants.MESSAGE.InternalServerError
                )
            )
        }
    })

router
    .route('/resendVerifySecurityCode/:id')
    .post(async (req, res) => {
        try {
            let resendOTP = await service.resendVerifySecurityCode(req.params.id)
            res.status(result.responseCode).send(resendOTP)

        } catch (error) {
            console.log('error', error)
            res.status(500).send(
                mapper.responseMapping(
                    constants.CODE.INTRNLSRVR,
                    constants.MESSAGE.InternalServerError
                )
            )
        }
    })

router
    .route('/login')
    .post([validate.checkLoginRequest], async (req, res) => {
        try {
            let result = await service.login(req.body)
            console.log("result", result)
            res.send(result)

        } catch (error) {
            console.log('error', error)
            res.status(result.responseCode).status(500).send(
                mapper.responseMapping(
                    constants.CODE.INTRNLSRVR,
                    constants.MESSAGE.InternalServerError
                )
            )
        }
    })
router
    .route('/forget-password')
    .post(async (req, res) => {
        try {
            let result = await service.forgetPassword(req.body)
            res.status(result.responseCode).send(result)

        } catch (error) {
            console.log('error', error)
            res.status(500).send(
                mapper.responseMapping(
                    constants.CODE.INTRNLSRVR,
                    constants.MESSAGE.InternalServerError
                )
            )
        }
    })

router
    .route('/change-password')
    .post([validate.verifyJwtToken],async (req, res) => {
        try {
            let result = await service.changePassword(req.body)
            res.status(result.responseCode).send(result)

        } catch (error) {
            console.log('error', error)
            res.status(500).send(
                mapper.responseMapping(
                    constants.CODE.INTRNLSRVR,
                    constants.MESSAGE.InternalServerError
                )
            )
        }
    })

module.exports = router
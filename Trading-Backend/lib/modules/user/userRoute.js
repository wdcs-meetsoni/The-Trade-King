const router = require('express').Router()
const service = require('./userService')
const mapper = require('../common/commonMapper')
const constants = require('../../constants')
const validate = require('../common/commonValidator')
const axios = require('axios')
const upload = require('../../middleware/multer')
//const middleware = require('../../middleware')

router
    .route('/firstStepRegister')
    .post([validate.checkFirstStepRegister], async (req, res) => {
        try {
            let result = await service.firstStepRegister(req.body.emailId)
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
    .route('/secondStepRegister')
    .post(upload,[validate.checkSecondStepRegister], async (req, res) => {
        try {
            let data = { data: { ...req.body }, image: req.file.filename}
            
            let result = await service.secondStepRegister(data)
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
            let result = await service.resendVerifySecurityCode(req.params.id)
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
    .route('/login')
    .post([validate.checkLoginRequest], async (req, res) => {
        try {
            let result = await service.login(req.body)
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
    .route('/getStockName')
    .get(async (req, res) => {
        try {
            let result = await service.getStockName(req.body)
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
    .route('/getStockValue')
    .get(async (req, res) => {
        try {
            let result = await service.getStockValue(req.body)
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
const router = require('express').Router()
const service = require('./adminService')
const mapper = require('../common/commonMapper')
const constants = require('../../constants')
const validate = require('../common/commonValidator')
const upload = require('../../middleware/multer')

router
    .route('/firstStepRegister')
    .post(upload, [validate.checkFirstStepRegister], async (req, res) => {//
        try {
            // console.log('req.file',{data:{...req.body}, image: req.file.filename})
            let data = { data: { ...req.body }, image: req.file.filename }
            let result = await service.firstStepRegister(data)
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
    .route('/dashboard/userManagement')
    .get(async (req, res) => {
        try {
            let result = await service.getListOfUser(req)
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
    .route('/dashboard/userManagement/action')
    .post(async (req, res) => {
        try {
            console.log('req.body', req.body)
            let result = await service.ActioneUser(req.body)
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
            console.log("result", result)
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
    .route('/Add-emailTemplate')
    .post([validate.checkAddTemplate], async (req, res) => {
        try {
            let result = await service.AddEmailTemplate(req.body)
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
    .route('/Update-emailTemplate')
    .post([validate.checkUpdateTemplate], async (req, res) => {
        try {
            console.log('first',req)
            let result = await service.UpdateEmailTemplate(req.body)
            console.log('first',res)
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
    .route('/Delete-emailTemplate')
    .post([validate.checkDeleteTemplate], async (req, res) => {
        try {
            let result = await service.DeleteEmailTemplate(req.body)
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
    .route('/Get-emailTemplate')
    .get(async (req, res) => {
        try {
            let result = await service.ListOfEmailTemplate()
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
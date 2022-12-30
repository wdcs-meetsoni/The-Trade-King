const mongoose = require('mongoose')
let BaseDao = require('../../dao/baseDao')
const Admin = require('../../models/adminModel')
const Email = require('../../models/emailTemplateModel')
const adminDao = new BaseDao(Admin)
const emailDao = new BaseDao(Email)


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Admin~~~~~~~~~~~~~~~~~~~~~~~~~~~//

const createAdmin = async   (object) => {
    let accountCreatedAt = Date.now(), addOBj = Object.assign({ accountCreatedAt,avatar:object.image}, object.data)
    let newObj = new Admin(addOBj)
    return adminDao.save(newObj)
}
const getAllAdminDetails = () => {
    return adminDao.find()
}


const getAdminDetails = (query) => {
    return adminDao.findOne(query)
}

const updateAdminDetails = (query, data) => {
    return adminDao.findByIdAndUpdate(query, data)
}

const removeAdmin = (query) => {
    return adminDao.findByIdAndDelete(query)
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Email-Template~~~~~~~~~~~~~~~~~~~~~~~~~~~//

const createEmailTemplate = async(object) => {
    let createdAt = Date.now(), addOBj = Object.assign({ createdAt }, object)
    let newObj = new Email(addOBj)
    return emailDao.save(newObj)

}
const getAllEmailTemplateDetails = () => {
    return emailDao.find()
}

const getOneEmailTemplateDetails = (query) => {
    return emailDao.findOne(query)
}

const removeEmailTemplate = (query) => {
    return emailDao.findByIdAndDelete(query)
}

const updateEmailTemplate = (query, object) => {
    let editedAt = Date.now(), newOBj = Object.assign({ editedAt }, object)
    console.log('newOBj',newOBj)
    return emailDao.findByIdAndUpdate(query, newOBj)
}

module.exports = {
    createAdmin,
    getAllAdminDetails,
    getAdminDetails,
    updateAdminDetails,
    removeAdmin,

    //Email-Template
    createEmailTemplate,
    getAllEmailTemplateDetails,
    removeEmailTemplate,
    getOneEmailTemplateDetails,
    updateEmailTemplate
}
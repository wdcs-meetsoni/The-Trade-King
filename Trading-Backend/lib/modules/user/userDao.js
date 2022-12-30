const mongoose = require('mongoose')
let BaseDao = require('../../dao/baseDao')
const User = require('../../models/userModel')
const Stock = require('../../models/stockModel')
const userDao = new BaseDao(User)
const stockDao = new BaseDao(Stock)

const createUser = async (object) => {
    // console.log('newObj', object)
    let accountCreatedAt = Date.now()//expireAt = Date.now()+8400000
    let  addOBj = Object.assign({ accountCreatedAt}, object)
    let newObj = new User(addOBj)
    return userDao.save(newObj)
}

const updateSecondStepDetails = async (query, object, image) => {
    let updateObj = Object.assign({ avatar: image }, { isSecondStepCompleted: true }, object)
    return userDao.findByIdAndUpdate(query, updateObj)
}

const getAllUserDetails = () => {
    return userDao.find()
}

const getUserDetails = (query) => {
    return userDao.findOne(query)
}

const updateUserDetails = (query, data) => {
    return userDao.findByIdAndUpdate(query, data)
}

const removeUser = (query) => {
    return userDao.findByIdAndDelete(query)
}


const AggregateOprations = (query) => {

    return userDao.Aggregate(query)

}

//~~~~~~~~~~~~~~~~~~~~~~~~~Stock~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

const createData = async (object) => {
    console.log('object', object);
    //let accountCreatedAt = Date.now(), addOBj = Object.assign({accountCreatedAt}, object)
    let newObj = new Stock(object)
    return stockDao.save(newObj)
}

const getOneStockData = (query) => {
    return stockDao.findOne(query)
}
const getAllStockData = () => {
    return stockDao.find()
}

const getLookUpValues = (refcollection, crrntTableValeu, refTableValue, As, returnValue) => {
    let query = [{
        $lookup: {
            from: refcollection,
            localField: crrntTableValeu,
            foreignField: refTableValue,
            as: As,

        }
    }, returnValue ? { $project: returnValue } : { $sort: { _id: 1 } }
    ]
    //console.log('Aggregate',stockDao.Aggregate(query))
    return stockDao.Aggregate(query)
}


module.exports = {
    getAllUserDetails,
    getUserDetails,
    updateUserDetails,
    removeUser,
    AggregateOprations,
    createUser,
    updateSecondStepDetails,

    //~~~~~~~~~~~~~~~~~~~~~~~~~Stock~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    createData,
    getOneStockData,
    getAllStockData,
    getLookUpValues
}
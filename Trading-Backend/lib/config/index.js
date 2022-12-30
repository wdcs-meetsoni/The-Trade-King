require('dotenv').config()
const mongoose = require('mongoose');
let dbUrl = process.env.dbURL + process.env.dbName

//console.log('dbUrl',dbUrl)

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const dataBase = mongoose.connection

dataBase.on('error', (error) => {
    console.log(error)
})
dataBase.once('connected', () => {
    console.log('==> Data base connected')
})

// let defaultMongoDBConfig = {

//     evironment: process.env.NODE_ENV || 'development',
//     TAG: process.env.NODE_ENV || 'development',

//     mongo:{
//         dbName: process.env.dbName,
//         dbURL: process.env.dbURL,
//         option:{
//             useNewUrlParser:true,
//             useUnifiedTopology: true
//         }
//     }
// }

//module.exports = defaultMongoDBConfig
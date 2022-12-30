

const bcrypt = require('bcryptjs');

const isValidEmail =(email)=>{

    let pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/
    return new RegExp(pattern).test(email)
}

const convertPass = async(password)=>{

    let pass = await bcrypt.hash(password,10)
    return pass
}

const validPassword = (user,isExist)=>{

    return bcrypt.compare(user,isExist)
}

module.exports = {
    convertPass,
    isValidEmail,
    validPassword
}
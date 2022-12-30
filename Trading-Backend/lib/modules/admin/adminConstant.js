require('dotenv').config()




let MESSAGE = {

    AdmimCreateSuccess: 'Admin created successfully',
}

let CODE = {
    
    FRBDN: 403,
    INTRNLSRVR: 500,
    Success: 200,
    DataNotFound: 404,
    BadRequest: 400,
    ReqTimeOut: 408,
};

module.exports = {
    CODE,
    EMAIL_CONFIG,
    MESSAGE,
}
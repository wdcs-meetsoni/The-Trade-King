const multer = require('multer')

       const upload =  multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, './lib/Uploads')
                },
                filename: (req, file, cb) => {
                    cb(null, Date.now() + "_" + file.originalname)
                }
            })
        }).single("avatar")//multer fuction for store files

module.exports = upload
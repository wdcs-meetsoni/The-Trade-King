const commonRouter = require('../modules/common/commonRoute')
const adminRouter = require('../modules/admin/adminRoute')
const userRouter = require('../modules/user/userRoute')

module.exports = function (app) {

   app.use('/trade-App/admin/',adminRouter)
   app.use('/trade-App/common/',commonRouter)
   app.use('/trade-App/user/',userRouter)
}
const Cdao = require("../common/commonDao");
const Adao = require("../admin/adminDao");
const Udao = require("../user/userDao");

const mapper = require("../common/commonMapper");
const constants = require("../../constants");
const appUtils = require("../../appUtils");
const middleware = require("../../middleware");
const commonService = require("../common/commonService");

var API = require('indian-stock-exchange');
const router = require("./userRoute");

var NSEAPI = API.NSE;
var BSEAPI = API.BSE;

const firstStepRegister = async (email) => {
  try {
    if (!email) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      );
    } else {
      let query = {
        emailId: email,
      };
      const IFEXIEST = await Udao.getUserDetails(query);
      // console.log('first', IFEXIEST)
      if (IFEXIEST) {
        return mapper.responseMapping(
          constants.CODE.BadRequest,
          constants.MESSAGE.EmailAlreadyExists
        );
      } else {
        //console.log('IFEXIEST', query)
        let createUser = await Udao.createUser(query); //------------->User_Created
        if (!createUser) {
          let removeUser = await Udao.removeUser({ _id: createUser._id }); //------------->removeUser
          return mapper.responseMapping(
            constants.CODE.INTRNLSRVR,
            constants.MESSAGE.InternalServerError
          );
        } else {
          // console.log('createUser', createUser)
          let sendOTP = await commonService.sendOTP(createUser); //-------------> OTP_Sent
          if (sendOTP.responseCode === 200) {
            return mapper.responseMappingWithData(
              constants.CODE.Success,
              constants.MESSAGE.VerificationOTPsendSuccess,
              createUser._id
            )
          } else {
            let removeUser = await Adao.removeUser({ _id: createUser._id }); //------------->removeUser
            return mapper.responseMapping(
              constants.CODE.BadRequest,
              constants.MESSAGE.InternalServerError
            )
          }

        }
      }
    }
  } catch (error) {
    console.log("error", error);
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    );
  }
}

const secondStepRegister = async (details) => {
  let data = details.data
  try {
    let query = {
      emailId: data.emailId,
    }
    let user = await Udao.getUserDetails(query)
    if (!user) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      )
    } else {
      let convertedPass = await appUtils.convertPass(data.password)
      data.password = convertedPass
      data.address = JSON.parse(data.address)
      data.personalDetails = JSON.parse(data.personalDetails)
      data.bankDetails = JSON.parse(data.bankDetails)
      data.backgroundDetails = JSON.parse(data.backgroundDetails)

      let updatedUser = await Udao.updateSecondStepDetails(user._id, data, details.image)
      if (!updatedUser) {
        return mapper.responseMapping(
          constants.CODE.BadRequest,
          constants.MESSAGE.InvalidDetails
        )
      } else {
        let mailQuery = { mailTitle: constants.EMAIL_TEMPLATE_TITLE.SECOND_STEP }
        let templateDetails = await Adao.getOneEmailTemplateDetails(mailQuery)
        if (!templateDetails) {
          return mapper.responseMapping(
            constants.CODE.BadRequest,
            constants.MESSAGE.InvalidDetails
          )
        } else {
          let mailUserDetails = {
            emailId: updatedUser.emailId,
            userName: updatedUser.userName,
          }
          let isEmail = middleware.email.sendEmail(mailUserDetails, templateDetails)
          if (isEmail) {
            return mapper.responseMapping(
              constants.CODE.Success,
              constants.MESSAGE.SecondStepComplated,
            )
          } else {
            let removeUser = await Udao.removeUser({ _id: updatedUser._id }); //------------->removeUserlet
            return mapper.responseMapping(
              constants.CODE.INTRNLSRVR,
              constants.MESSAGE.InternalServerError
            )
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    )
  }
}

const login = async (data) => {
  let email = data.emailId, password = data.password
  try {
    // console.log('email', email, '||', 'password', password)
    let query = {
      emailId: email
    }
    let user = await Udao.getUserDetails(query)//.select('-password')
    // console.log('user', user)

    if (!user) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      )
    } else {
      let person = user
      let isValidPassword = await appUtils.validPassword(password, person.password)
      // console.log('isValidPassword',isValidPassword)
      if (!isValidPassword) {
        return mapper.responseMapping(
          constants.CODE.BadRequest,
          constants.MESSAGE.InvalidPassword
        )
      } else {
        if (person.approvedUser === false) {
          return mapper.responseMapping(
            constants.CODE.Unuthorized,
            constants.MESSAGE.InActiveUserLoginrRequest
          )
        } else if (person.status === "Inactive") {
          return mapper.responseMapping(
            constants.CODE.Unuthorized,
            constants.MESSAGE.BlockUser
          )
        } else if (person.twoFectorAuthentication === false) {
          return mapper.responseMappingWithData(
            constants.CODE.Success,
            constants.MESSAGE.Success,
            person
          )
        } else {
          let sendOTP = await commonService.sendOTP(person); //-------------> OTP_Sent
          if (sendOTP.responseCode === 200) {
            return mapper.responseMappingWithData(
              constants.CODE.Success,
              constants.MESSAGE.VerificationOTPsendSuccess,
              { id: person._id }
            )
          } else {
            return mapper.responseMapping(
              constants.CODE.INTRNLSRVR,
              constants.MESSAGE.INTRNLSRVR
            )
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    );
  }
};

const getStockName = async (data) => {
  try {
    if (!data) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      );
    } else {
      let List = await Udao.getAllStockData()
      //console.log('List', List.length <= 0)
      if (List.length <= 0) {
        return mapper.responseMapping(
          constants.CODE.INTRNLSRVR,
          constants.MESSAGE.InternalServerError
        );
      } else {
        //  console.log('List.symbol',List)
        return mapper.responseMappingWithData(
          constants.CODE.Success,
          constants.MESSAGE.Success,
          { Totol: List.length, ListOfCompany: List }
        );
      }
    }
  } catch (error) {
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    );
  }
}

const getStockValue = async (data) => {
  try {
    if (!data) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      );
    } else {
      let List = await Udao.getAllStockData()
      console.log('List', List.length <= 0)
      if (List.length <= 0) {
        return mapper.responseMapping(
          constants.CODE.INTRNLSRVR,
          constants.MESSAGE.InternalServerError
        );
      } else {
        console.log('first')
        let returnValue = {
          stockValues: 1,
          _id: 0

        }
        let result = await Udao.getLookUpValues('companydetails', 'symbol', 'symbol', 'stockValues', returnValue)
        if (!result) {
          return mapper.responseMapping(
            constants.CODE.INTRNLSRVR,
            constants.MESSAGE.InvalidEmail
          );
        } else {
          // console.log('result', result)
          return mapper.responseMappingWithData(
            constants.CODE.Success,
            constants.MESSAGE.Success,
            result
          )
        }
      }
    }
  } catch (error) {
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    );
  }
}

module.exports = {
  firstStepRegister,
  secondStepRegister,
  login,
  getStockName,
  getStockValue
};

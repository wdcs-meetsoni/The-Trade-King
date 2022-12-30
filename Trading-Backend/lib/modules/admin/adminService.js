const Cdao = require("../common/commonDao");
const Adao = require("../admin/adminDao");
const Udao = require("../user/userDao");
const mapper = require("../common/commonMapper");
const constants = require("../../constants");
const appUtils = require("../../appUtils");
const commonService = require('../common/commonService')
const middleware = require("../../middleware")

const firstStepRegister = async (details) => {
  let data = details.data
  try {
    if (!data) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      );
    } else {
      let query = {
        emailId: data.emailId,
      };
      const IFEXIEST = await Adao.getAdminDetails(query);
      // console.log('IFEXIEST',IFEXIEST);
      if (IFEXIEST) {
        return mapper.responseMapping(
          constants.CODE.BadRequest,
          constants.MESSAGE.EmailAlreadyExists
        )
      } else {
        let convertedPassword = await appUtils.convertPass(data.password)
        data.password = convertedPassword;

        var createUser = await Adao.createAdmin(details); //------------->User_Creation
        if (!createUser) {
          let removeUser = await Adao.removeAdmin({ _id: createUser._id }); //------------->removeUser
          return mapper.responseMapping(
            constants.CODE.BadRequest,
            constants.MESSAGE.InternalServerError
          )
        } else {
          let sendOTP = await commonService.sendOTP(createUser); //-------------> OTP_Sent
          if (sendOTP.responseCode === 200) {
            return mapper.responseMapping(
              constants.CODE.Success,
              constants.MESSAGE.VerificationOTPsendSuccess
            )
          } else {
            let removeUser = await Adao.removeAdmin({ _id: createUser._id }); //------------->removeUser
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
    let removeUser = await Adao.removeAdmin({ _id: createUser._id }); //------------->removeUser  
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    );
  }
}

const getListOfUser = async (details) => {

  let query = [{ $sort: { emailId: 1 } }]
  let key = details.query.key, skip = details.query.page, limit = details.query.limit
  console.log('query,skip,key,limit', query, skip, key, limit)
  try {

    if (key) {
      query.push({
        $match: {
          "$or": [

            { userName: { $regex: key, $options: 'i' } }
          ]
        }
      })
    }

    query.push({ $skip: skip ? parseInt(skip) : 0 }, { $limit: limit ? parseInt(limit) : 20 },
      {
        $project: {
          'accountCreatedAt': 0, 'OTP': 0, 'OTPExp': 0, 'password': 0, 'isSecondStepCompleted': 0
        }
      })
    console.log('updatedQuery', query);
    let ListofUser = await Udao.AggregateOprations(query)
    let TotalUserCount = ListofUser.length // Object.keys(ListofUser).length

    if (ListofUser) {
      return mapper.responseMappingWithData(
        constants.CODE.Success,
        constants.MESSAGE.Success,
        { TotalUserCount, ListofUser }
      )
    } else {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InternalServerError
      )
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
    let query = {
      emailId: email
    }
    let admin = await Adao.getAdminDetails(query)//.select('-password')
    //console.log("adminnnnnnnnnn", admin)

    if (!admin) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      )
    } else {
      let person = admin
      let isValidPassword = await appUtils.validPassword(password, person.password)
      console.log("Password~>", isValidPassword)
      if (!isValidPassword) {
        return mapper.responseMapping(
          constants.CODE.BadRequest,
          constants.MESSAGE.InvalidPassword
        )
      } else if (person.twoFectorAuthentication === false) {
        //console.log('object',person);
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
  } catch (error) {
    console.log(error)
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    );
  }

}

const ActioneUser = async (data) => {
  try {
    let query = {
      _id: data.userId
    }
    console.log(data.action)
    let user = await Udao.getUserDetails(query)
    //  console.log('user',user);
    if (!user) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      )
    } else {
      let approveUser = await Udao.updateUserDetails(data.userId, data.action)
      if (!approveUser) {
        return mapper.responseMapping(
          constants.CODE.InternalServerError,
          constants.MESSAGE.InternalServerError
        )
      } else {
        if (data.action.approvedUser || data.action.status) {

          let mailQuery = data.action.approvedUser ?

            { mailTitle: constants.EMAIL_TEMPLATE_TITLE.APPROVED_USER } :

            { mailTitle: constants.EMAIL_TEMPLATE_TITLE.BLOCKED_USER }

          let templateDetails = await Adao.getOneEmailTemplateDetails(mailQuery)
          if (!templateDetails) {
            return mapper.responseMapping(
              constants.CODE.BadRequest,
              constants.MESSAGE.InvalidDetails
            )
          } else {
            let mailUserDetails = {
              emailId: approveUser.emailId,
              userName: approveUser.userName,
            }
            let isEmail = middleware.email.sendEmail(mailUserDetails, templateDetails)
            if (!isEmail) {
              return mapper.responseMapping(
                constants.CODE.INTRNLSRVR,
                constants.MESSAGE.INTRNLSRVR,
              )
            } else {
              return mapper.responseMapping(
                constants.CODE.Success,
                constants.MESSAGE.Success,
              )
            }
          }
        } else {
          return mapper.responseMapping(
            constants.CODE.Success,
            constants.MESSAGE.Success,
          )
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

const AddEmailTemplate = async (details) => {
  try {
    let query = { 'mailTitle': details.mailTitle }
    console.log('query', query)
    let isData = await Adao.getOneEmailTemplateDetails(query)
    console.log('isData', isData)
    if (isData) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.EmailAlreadyExists
      )
    } else {
      let create = await Adao.createEmailTemplate(details)
      if (!create) {
        console.log('removed')
        let remove = await Adao.removeEmailTemplate({ _id: create._id })
        return mapper.responseMapping(
          constants.CODE.INTRNLSRVR,
          constants.MESSAGE.InternalServerError
        )
      } else {
        return mapper.responseMapping(
          constants.CODE.Success,
          constants.MESSAGE.EmailTemplateCreationSuccessFull
        )
      }
    }

  } catch (error) {
    console.log('first', error)
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    )
  }
}

const UpdateEmailTemplate = async (details) => {
  try {
    console.log('details', details)
    let query = { '_id': details._id }
    let isData = await Adao.getOneEmailTemplateDetails()
    console.log('isData', isData);
    if (!isData) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      )
    } else {
      let isAdmin = await Adao.getAdminDetails({ "_id": details.editedBy })
      if (!isAdmin) {
        return mapper.responseMapping(
          constants.CODE.Unuthorized,
          constants.MESSAGE.Unuthorized
        )
      } else {
        let update = await Adao.updateEmailTemplate(details._id, details)
        console.log('update', update);
        if (!update) {
          return mapper.responseMapping(
            constants.CODE.INTRNLSRVR,
            constants.MESSAGE.InternalServerError
          )
        } else {
          return mapper.responseMapping(
            constants.CODE.Success,
            constants.MESSAGE.EmailTemplateUpdateSuccessFull
          )
        }
      }
    }
  } catch (error) {
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    )
  }
}

const DeleteEmailTemplate = async (details) => {
  try {
    let query = { '_id': details.templateId }

    let isData = await Adao.getOneEmailTemplateDetails(query)
    console.log('isData', isData)
    if (!isData) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      )
    } else {
      let isAdmin = await Adao.getAdminDetails({ '_id': details.adminId })
      if (!isAdmin) {
        return mapper.responseMapping(
          constants.CODE.Unuthorized,
          constants.MESSAGE.Unuthorized
        )
      } else {
        let detete = await Adao.removeEmailTemplate(isData.id)
        console.log('detete', detete);
        if (!detete) {
          return mapper.responseMapping(
            constants.CODE.INTRNLSRVR,
            constants.MESSAGE.InternalServerError
          )
        } else {
          return mapper.responseMapping(
            constants.CODE.Success,
            constants.MESSAGE.Success
          )
        }
      }
    }
  } catch (error) {
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    )
  }
}

const ListOfEmailTemplate = async () => {
  try {
    let list = await Adao.getAllEmailTemplateDetails()
    if (!list) {
      return mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      )
    } else {
      let Total = list.length
      console.log('Total', Total)
      return mapper.responseMappingWithData(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails,
        { Total, List: list }
      )
    }
  } catch (error) {
    return mapper.responseMapping(
      constants.CODE.INTRNLSRVR,
      constants.MESSAGE.InternalServerError
    )
  }
}

module.exports = {
  firstStepRegister,
  getListOfUser,
  ActioneUser,
  login,
  AddEmailTemplate,
  UpdateEmailTemplate,
  DeleteEmailTemplate,
  ListOfEmailTemplate
};

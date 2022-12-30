const mapper = require("../common/commonMapper");
const appUtils = require("../../appUtils");
const constants = require("../../constants");
const middleware = require("../../middleware");
const { json } = require("body-parser");
const ObjectId = require('mongoose').Types.ObjectId

const checkFirstStepRegister = (req, res, next) => {
  let email = req.body.emailId

  if (
    !email ||
    Object.keys(email).length === 0 ||
    !appUtils.isValidEmail(email)
  ) {
    res.status(constants.CODE.BadRequest).send(
      mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidEmail
      )
    );
  } else {
    next();
  }
}

const checkSecondStepRegister = (req, res, next) => {
  userName = req.body.userName
  if (!userName || Object.keys(userName).length === 0) {
    res.status(constants.CODE.BadRequest).send(
      mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      )
    );
  } else {
    console.log('next')
    next();
  }
}

const verifyJwtToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(constants.CODE.Unuthorized).send(
      mapper.responseMapping(
        constants.CODE.Unuthorized,
        constants.MESSAGE.Unuthorized
      )
    );
  } else {
    token = token.split(" ")[1];
    let check = middleware.jwtHandler.varifyToken(token);
    if (!check) {
      return res.status(constants.CODE.FRBDN).send(
        mapper.responseMapping(
          constants.CODE.FRBDN,
          constants.MESSAGE.Unuthorized
        )
      );
    } else {
      return next();
    }
  }
};

const checkLoginRequest = (req, res, next) => {
  let email = req.body.emailId
  // console.log('email', email)
  let password = req.body.password

  if (!email || !password || Object.keys(email).length === 0 || !appUtils.isValidEmail(email)) {
    res.status(constants.CODE.BadRequest).send(mapper.responseMapping(constants.CODE.BadRequest, constants.MESSAGE.InvalidDetails))
  } else {
    console.log('first')
    next()
  }
}

const checkAddTemplate = (req, res, next) => {
  if ( !req.body.mailTitle || !req.body.mailSubject || !req.body.mailBody || !ObjectId.isValid(req.body.createdBy)) {
    res.status(constants.CODE.BadRequest).send(mapper.responseMapping(constants.CODE.BadRequest, constants.MESSAGE.InvalidDetails))
  } else {
    next()
  }

}

const checkUpdateTemplate = (req, res, next) => {
  if (!ObjectId.isValid(req.body._id) || !ObjectId.isValid(req.body.editedBy)) {
    res.status(constants.CODE.BadRequest).send(mapper.responseMapping(constants.CODE.BadRequest, constants.MESSAGE.InvalidDetails))
  } else {
    next()
  }

}

const checkDeleteTemplate = (req, res, next) => {
  if (!ObjectId.isValid(req.body.templateId) || !ObjectId.isValid(req.body.adminId)) {
    res.status(constants.CODE.BadRequest).send(mapper.responseMapping(constants.CODE.BadRequest, constants.MESSAGE.InvalidDetails))
  } else {
    next()
  }

}



module.exports = {
  checkFirstStepRegister,
  checkSecondStepRegister,
  verifyJwtToken,
  checkLoginRequest,
  checkAddTemplate,
  checkUpdateTemplate,
  checkDeleteTemplate
};

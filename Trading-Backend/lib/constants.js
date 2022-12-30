const STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

const USER_ROLE = {
  SUPER_ADMIN: "Super-Admin",
  ADMIN: "Admin",
  USER: "User",
};

let EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
}

const MESSAGE = {
  Success: "Successfull",
  InternalServerError: "Internal server error. Please try after some time",
  InvalidDetails: "Please provide valid details",
  InvalidEmail: "Please provide valid email address",
  EmailAlreadyExists: "Email id already exists",
  OTPTimeOut: "OTP time out",
  InvalidOTP: "Please enter valied OTP",
  validOTP: "valid OTP",
  VerificationOTPsendSuccess: "OTP sent to your register email address",
  Unuthorized: "Unuthorized request",
  InvalidPassword: "Your email or password is incorrect. Please try again.",
  LoginSuccess: "Logged in successfully",
  InActiveUserLoginrRequest: "Your account is under process, Please wait for confirmation mail",
  UserCreateSuccess: 'User created successfully, conformation mail is sent to your register email',
  BlockUser: "Your are not allow to login please contect to admin ",
  SecondStepComplated:"Your second step is complated",

  //~~~~~~~Email-Template~~~~~\\
  EmailTemplateAlreadyExists: "This email-template is already exists",
  EmailTemplateCreationSuccessFull: 'Email-template created successfully',
  EmailTemplateUpdateSuccessFull: 'Email-template updated successfully',
};

const EMAIL_TEMPLATE_TITLE = {
  FIRST_STEP: 'Thanks : The Trade King',
  SECOND_STEP: 'KYC : The Trade King',
  APPROVAL_MAIL: 'Congratulations : The Trade King',
  VERIFICATION_CODE: 'Verification Code : The Trade King',
  RESET_PASSWORD: 'Reset Password: The Trade King',
  FORGOT_PASSWORD: 'Forget Password:The Trade King',
  TEST_NAME: 'Test : The Trade King',
  APPROVED_USER: 'Approved : The Trade King',
  BLOCKED_USER:'Blocked : The Trade King'
}

const EMAIL_TEMPLATE_SUB = {
  FIRST_STEP: 'The Trade King',
  SECOND_STEP: 'KYC',
  APPROVAL_MAIL: 'Congratulations',
  VERIFICATION_CODE: 'Verification Code',
  RESET_PASSWORD: 'Reset Password',
  FORGOT_PASSWORD: 'Forget Password',
  TEST_NAME: 'Test',
  APPROVED_USER : 'Confrimation',
  BLOCKED_USER:'Attention!!'
}

const CODE = {
  FRBDN: 403,
  INTRNLSRVR: 500,
  Success: 200,
  DataNotFound: 404,
  Unuthorized: 401,
  BadRequest: 400,
  ReqTimeOut: 408,
};

module.exports = Object.freeze({

  EMAIL_TEMPLATE_SUB,
  EMAIL_TEMPLATE_TITLE,
  EMAIL_CONFIG,
  STATUS,
  USER_ROLE,
  MESSAGE,
  CODE,
});

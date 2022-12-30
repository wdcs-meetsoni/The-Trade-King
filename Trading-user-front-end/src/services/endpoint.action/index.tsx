let url= process.env.NEXT_PUBLIC_APP_HOST;
 export const APIEndpoints ={
  login: `${url}/trade-App/user/login`,
  verify:`${url}/trade-App/common/verifySecurityCode`,
  firststep:`${url}/trade-App/user/firstStepRegister`,
  resendotp:`${url}/trade-App/common/resendVerifySecurityCode`,
  forgotpass: `${url}/trade-App/common/forget-password`,
  signup: `${url}/trade-App/user/secondStepRegister`,
 }

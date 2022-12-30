let url= process.env.NEXT_PUBLIC_APP_HOST;
 export const APIEndpoints ={
  login: `${url}/trade-App/admin/login`,
  verify:`${url}/trade-App/common/verifySecurityCode`,
  resendotp:`${url}/trade-App/common/resendVerifySecurityCode`,
  forgotpass: `${url}/trade-App/common/forget-password`,
  getalluserdata:`${url}/trade-App/admin/dashboard/userManagement`,
  updateuserdata:`${url}/trade-App/admin/dashboard/userManagement/action`
 }

 export default url

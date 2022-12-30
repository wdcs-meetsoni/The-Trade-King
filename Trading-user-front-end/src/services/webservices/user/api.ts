import { APIEndpoints } from 'services/endpoint.action';
import axios from 'helpers/axios'


import api from 'utils/APiCall';
import { addUserDetails } from './userInformation';

export const login = async (user:{
    emailId:string
    password:string
  
}) =>{
    const loginDetails = await addUserDetails(user)
    console.log('loginDetails',loginDetails);
    return await api(`${APIEndpoints.login}`,'POST',loginDetails)
}

export const verifyotp = async (
    id:string,
    otp:string
)=>{
     console.log('verifyotp',id,otp)   
     let test= await api(`${APIEndpoints.verify}/${id}`,'POST',{OTP:parseInt(otp)})
     console.log('test',test)
     return test
}

export const signupfirststep = async (
    emailId:string,
    )=>{
    console.log('emailId',emailId)
    return api(`${APIEndpoints.firststep}`,'POST',{emailId})
}
export const  resendverificationstep = async (
    UserId:string
)=>{
    console.log("UserId in auth", UserId)
    return api(`${APIEndpoints.resendotp}/${UserId}`,'POST')
}
export const forgetpasswordstep = async (
    emailId:string
)=>{
    console.log("ForgotPassword Email", emailId)
    return api(`${APIEndpoints.forgotpass}`,'POST',{emailId:emailId})
}
export const signup =async (
    data:any
)=>{
    console.log("enter in singup ")
    return api(`${APIEndpoints.signup}`,'POST',data)
}
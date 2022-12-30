import { APIEndpoints } from 'services/endpoint.action';
import axios from 'helpers/axios'


import api from 'utils/APiCall';
import { addUserDetails } from './userInformation';

export const login = async (user:{
    emailId:string
    password:string
  
}) =>{
    const loginDetails = await addUserDetails(user)

    return await api(`${APIEndpoints.login}`,'POST',loginDetails)
}

export const verifyotp = async (
    id:string,
    otp:string
)=>{

     let test= await api(`${APIEndpoints.verify}/${id}`,'POST',{OTP:parseInt(otp)})

     return test
}


export const  resendverificationstep = async (
    UserId:string
)=>{

    return api(`${APIEndpoints.resendotp}/${UserId}`,'POST')
}
export const forgetpasswordstep = async (
    emailId:string
)=>{

    return api(`${APIEndpoints.forgotpass}`,'POST',{emailId:emailId})
}
export const getalluserdataa = async ()=>{
    return api(`${APIEndpoints.getalluserdata}`,'GET');
    
}
export const updateuserdata = async (
    userId:string,
    action:object
)=>{
    return api(`${APIEndpoints.updateuserdata}`,'POST',{userId,action})
}
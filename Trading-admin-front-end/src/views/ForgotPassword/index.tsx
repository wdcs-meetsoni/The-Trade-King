

import { useFormik } from 'formik';
import toast from 'helpers/toast';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { ToastContainer } from 'react-toastify';
import { forgetpasswordstep } from 'services/webservices/user/api';
import * as Yup from 'yup'
const ForgotPassword = () => {
  
  const emailIdRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 
  const router = useRouter();
  const myfun = Yup.object().shape({
    emailId: Yup.string()
      .trim()
      .matches(emailIdRegex, 'Invalid email format')
      .required('Email is required'),
    
  })
  const {
    handleSubmit: handleSubmit2,
    handleChange: handleChange2,
    values: values2,
    touched: touched2,
    errors: errors2,
  }  = useFormik({
    initialValues: {
      emailId: "",
    },
    validationSchema: myfun,
    onSubmit: async (values2: any) => {
      console.log("Forgot Email",values2.emailId);
      const response = await forgetpasswordstep(values2.emailId)
      console.log("Forgot Response",response)
      if(response.responseMessage === "Successfull"){
        toast.success("Sending Verification Mail"+ " " +response.responseMessage)
        toast.success("Please Go To ")

      }
      if(response.responseMessage === "Unuthorized request"){
        toast.error(response.responseMessage + " " + "Because Email Address not found in database")
      }
    },
  });
    


  return (<>
    <title> The Trade King</title>
    <ToastContainer/>
    <div className='forogotpassdiv'>
    <div className="card text-center" style={{width:"100%"}}>
    <div className="card-header h5 text-white bg-secondary">Password Reset</div>
    <div className="card-body px-5">
        <p className="card-text py-3">
            Enter your email address and we'll send you an email with instructions to reset your password.
        </p>
        <div className="form-outline">
            <form onSubmit={handleSubmit2}>
            <input type="emailId" id="typeEmail" className="forgotinput" placeholder='Enter Registred Email Please'   onChange={async (e) => {
                  handleChange2('emailId')(e)
                }}
                    value={values2.emailId} />
            {touched2.emailId && errors2.emailId ? (
              <div className="errorboxlogin">{errors2.emailId}</div>
              ) : null}
            <br></br>
        <button className="btn btn-secondary w-30" type='submit'>Submit</button>
        </form>
        </div>
        <div className="d-flex justify-content-between mt-5">
            <button className="btn btn-secondary w-30 h-10" onClick={()=>{router.push("/signin")}}>Login</button>
            <button className="btn btn-success w-30 h-10" onClick={()=>{router.push("/")}}>Go To Dashboard</button>
            <button className="btn btn-secondary w-30 h-10" onClick={()=>{router.push("/signup")}}>Register</button>
        </div>
    </div>
</div>
  
    </div>
    </>
  )
}

export default ForgotPassword

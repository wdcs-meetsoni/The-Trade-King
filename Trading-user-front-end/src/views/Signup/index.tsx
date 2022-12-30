import { useFormik } from "formik";
import toast from "helpers/toast";
import { useRouter } from "next/router";
import React, { useState } from "react";
import swal from 'sweetalert';
import { ToastContainer } from "react-toastify";
import {
  signup,
  signupfirststep,
  verifyotp,
} from "services/webservices/user/api";
import { fileURLToPath } from "url";
import * as Yup from "yup";

const Signup = () => {
  const [flag, setFlag] = React.useState<any>();
  const [userId, setuserId] = React.useState<any>();
  const [flag1, setFlag1] = React.useState<any>();
  const router = useRouter();
  const [Imagee,setImagee]=useState()
  

  const emailIdRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const onlynumber = /^[0-9\b]+$/;
  const myfun = Yup.object().shape({
    email: Yup.string()
      .trim()
      .matches(emailIdRegex, "Invalid email format")
      .required("Email is required"),
  });
  const myfun1 = Yup.object().shape({
    otp: Yup.string()
      .trim()
      .matches(onlynumber, "Enter Valid Otp")
      .required("Otp Required"),
  });
  const myfun2 = Yup.object().shape({
    username: Yup.string()
      .trim()

      .required("Username is required"),
    password: Yup.string()
      .trim()

      .required("Password is required."),
    matiralstatus: Yup.string()
      .trim()
      .required("Upi Id Must be needed for transactions"),
    pancard: Yup.string().trim().required("Pancard is Required"),
    processingfees: Yup.boolean().required("Fees must be Paid"),
    homedetails: Yup.string().trim().required("This Field Can't Be Empty"),
    citydistrict: Yup.string().trim().required("This Field Can't Be Empty"),
    state: Yup.string().trim().required("This Field Can't Be Empty"),
    landmark: Yup.string().trim().required("This Field Can't Be Empty"),
    zipcode: Yup.number().required("This Field Can't Be Empty"),
    fullname: Yup.string().trim().required("This Field Can't Be Empty"),
    fathername: Yup.string().trim().required("This Field Can't Be Empty"),
    mothername: Yup.string().trim().required("This Field Can't Be Empty"),
    mono: Yup.number().required("This Field Can't Be Empty"),
    bankname: Yup.string().trim().required("Please Enter Bank Name"),
    bankifsc: Yup.string().trim().required("This Field Can't Be Empty"),
    bankaccno: Yup.number().required("This Field Can't Be Empty"),
  
    upiid: Yup.string()
      .trim()
      .required("Upi Id Must be needed for transactions"),
    annualincome: Yup.string().trim().required("This Field Can't Be Empty"),
    tradingexp: Yup.number().required("This Field Can't Be Empty"),
    fundstatement: Yup.string().trim().required("This Field Can't Be Empty"),
    occupation: Yup.string().trim().required("This Field Can't Be Empty"),
  });
  const {
    handleSubmit: handleSubmit1,
    handleChange: handleChange1,
    values: values1,
    
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: myfun,
    onSubmit: async (values1: any) => {
      const response = await signupfirststep(values1.email);
      console.log("signupfirststep", response);

      if (
        response.responseMessage === "OTP sent to your register email address"
      ) {
        toast.success(response.responseMessage);
        console.log("email sending response", response);
        setuserId(response.responseData);
        setFlag(true);
      }
      if (response.responseMessage === "Email id already exists") {
        toast.error(response.responseMessage);
      }
    },
  });

  const {
    handleSubmit: handleSubmit2,
    handleChange: handleChange2,
    values: values2,
  } = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: myfun1,
    onSubmit: async (values2: any) => {
      console.log("userId", userId);
      const response = await verifyotp(userId, values2.otp);
      console.log("after verification", response);
      if (response.responseMessage === "Successfull") {
        toast.success("Otp Verification" + response.responseMessage);
        setFlag1(true);
        setuserId(response.responseData);
      }
      if (response.responseMessage === "Please enter valied OTP") {
        toast.error(response.responseMessage);
      }
      if (response.responseMessage === "OTP time out") {
        toast.error(response.responseMessage);
      }
    },
  });

  const {
    handleSubmit: handleSubmit3,
    handleChange: handleChange3,
    values: values3,
    errors: errors3,
    touched: touched3,
    setFieldValue: setFieldValue3
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      pancard: "",
      emailaddress: "",
      avatar:"",
      processingfees: "",
      homedetails: "",
      citydistrict: "",
      state: "",
      landmark: "",
      zipcode: "",
      fullname: "",
      fathername: "",
      mothername: "",
      matiralstatus: "",
      mono: "",
      bankname: "",
      bankifsc: "",
      branchmcr: "",
      bankaccno: "",
      upiid: "",
      annualincome: "",
      tradingexp: "",
      fundstatement: "",
      occupation: "",

      profilepicture: "",
    },
    validationSchema: myfun2,
    onSubmit: async (values3: any) => {
      console.log("signup entered");
      console.log("EMaillll",values3.emailaddress);
      let istrue = values3.processingfees == "true";
       let address = {
        HomeDetails: values3.homedetails,
        cityDistrictTown: values3.citydistrict,
        state: values3.state,
        landmark: values3.landmark,
        zipCode: values3.zipcode,
      }
      let personalDetails = {
        fullName: values3.fullname,
        FatherName: values3.fathername,
        MotherName: values3.mothername,
        matiralStatus: values3.matiralstatus,
        phoneNumber: values3.mono,
      }
      let bankDetails=  {
        bankName: values3.bankname,
        banckIFSC: values3.bankifsc,
        branchMCR: values3.branchmcr,
        bankAccountNumber: values3.bankaccno,
        UPI_ID: values3.upiid,
      }
      let backgroundDetails = {
            AnnualIncome: values3.annualincome,
            TradingExperience: values3.tradingexp,
            FundSatelment: values3.fundstatement,
            Occupation: values3.occupation,
          }
      let formData2 = new FormData();
      formData2.append('userName', values3.username);
      formData2.append('password', values3.password);
      formData2.append('pancard', values3.pancard);
      formData2.append('avatar', values3.avatar);
      formData2.append('emailId', values3.emailaddress);
      formData2.append('processingFeePaid', JSON.stringify(istrue));
      formData2.append('address', JSON.stringify(address));
      formData2.append('personalDetails', JSON.stringify(personalDetails));
      formData2.append('bankDetails', JSON.stringify(bankDetails));
      formData2.append('backgroundDetails', JSON.stringify(backgroundDetails));

      console.warn("Addresssss", address)
      const response = await signup(formData2);
      console.log("signupresponse", response.responseMessage);
      if(response.responseMessage === "Your second step is complated")
      {

        swal("Good job!", "Your Signup Process Is Completed , Check Your Mail For Further", "success");
        router.push("/signin");
      }
    },
  });


  return (
    <>
    {console.log("errors3", errors3)}
      <title>The Trade King</title>
      <ToastContainer />
      {!flag1 ? (
        <div className="containersign">
          <div className="left">
            <div className="header">
              <h2 className="animation a1">Welcome To The Trade King</h2>
              <br></br>
            </div>
            <div className="form">
              {!flag ? (
                <form onSubmit={handleSubmit1}>
                  <>
                    <input
                      type="email"
                      className="form-field animation a3"
                      name="email"
                      placeholder="Email Address"
                      onChange={handleChange1}
                      value={values1.email}
                    />
                    <button type="submit" className="signupbutton animation a3">
                      SignUp
                    </button>
                  </>
                </form>
              ) : (
                <>
                  <form onSubmit={handleSubmit2}>
                    <input
                      type="number"
                      className="form-field animation a3"
                      name="otp"
                      placeholder="Enter Otp"
                      onChange={handleChange2}
                      value={values2.otp}
                    />
                    <button type="submit" className="signupbutton">
                      submit
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="right"></div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit3}>
            <section className="h-100  gradient-custom-5">
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-80">
                  <div className="col-25">
                    <div
                      className="card card-registration card-registration-2"
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card-body p-0">
                        <div className="row g-0">
                          <div className="col-lg-6">
                            <div className="p-5 bg-sucess ">
                              <h3 className="mb-4" style={{ color: "blue" }}>
                                General Infomation
                              </h3>

                              <div className="mb-2">
                                <input type="file" 
                                className="form-control form-control-lg"
                                // value={values3.avatar}
                                onChange={async (e:any) =>{
                                  
                                  setFieldValue3('avatar',e.target.files[0])
                                }}
                                ></input>
                                <label className="form-label">
                                  UserName :-
                                </label>
                                <input
                                  type="text"
                                  id="form3Examplev2"
                                  className="form-control form-control-lg"
                                  placeholder="Choose Your Desire Username"
                                  name="username"
                                  value={values3.username}
                                  onChange={async (e) => {
                                    handleChange3("username")(e);
                                  }}
                                />
                                {touched3.username && errors3.username ? (
                                  <div className="errorboxlogin">
                                    {errors3.username}
                                  </div>
                                ) : null}
                              </div>
                              <div className="mb-2">
                                <div className="form-outline form-white">
                                  <label className="form-label">
                                    Your Email
                                  </label>
                                  <input
                                    type="text"
                                    id="form3Examplea9"
                                    value={values3.emailaddress}
                                    onChange={async (e) => {
                                      handleChange3("emailaddress")(e);
                                    }}
                                    className="form-control form-control-lg"
                                  />
                                </div>
                              </div>
                              <div className="mb-2">
                                <div className="form-outline form-white">
                                  <label className="form-label">Password</label>
                                  <input
                                    type="password"
                                    placeholder="Select Good Password"
                                    id="form3Examplea9"
                                    value={values3.password}
                                    onChange={async (e) => {
                                      handleChange3("password")(e);
                                    }}
                                    className="form-control form-control-lg"
                                  />
                                  {touched3.password && errors3.password ? (
                                    <div className="errorboxlogin">
                                      {errors3.password}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              <div className="mb-2 pb-2">
                                <div className="form-outline">
                                  <label className="form-label">
                                    Pan Card{" "}
                                  </label>
                                  <input
                                    type="text"
                                    id="form3Examplev4"
                                    className="form-control form-control-lg"
                                    value={values3.pancard}
                                    onChange={async (e) => {
                                      handleChange3("pancard")(e);
                                      
                                    }}
                                  />
                                  {touched3.pancard && errors3.pancard ? (
                                    <div className="errorboxlogin">
                                      {errors3.pancard}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              <div className="mb-2 pb-2">
                                <label htmlFor="Plans" className="form-label">
                                  {" "}
                                  Select Plan{" "}
                                </label>

                                <select
                                  className="form-select"
                                  id="Plans"
                                  onChange={async (e) => {
                                    handleChange3("processingfees")(e);
                                  }}
                                >
                                  <option value="select">Select One</option>
                                  <option value="true">Yes</option>
                                  <option value="false">No </option>

                                  {touched3.processingfees &&
                                  errors3.processingfees ? (
                                    <div className="errorboxlogin">
                                      {errors3.processingfees}
                                    </div>
                                  ) : null}
                                </select>
                              </div>

                              <div className="mb-2 pb-2">
                                <div className="form-outline">
                                  <label className="form-label">Address </label>
                                  <input
                                    type="text"
                                    placeholder="Street and House Number"
                                    id="form3Examplev4"
                                    className="form-control form-control-lg"
                                    value={values3.homedetails}
                                    onChange={async (e) => {
                                      handleChange3("homedetails")(e);
                                    }}
                                  />
                                  {touched3.homedetails &&
                                  errors3.homedetails ? (
                                    <div className="errorboxlogin">
                                      {errors3.homedetails}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="mb-2 pb-1">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    placeholder="Landmark Place"
                                    id="form3Examplev4"
                                    className="form-control form-control-lg"
                                    value={values3.landmark}
                                    onChange={async (e) => {
                                      handleChange3("landmark")(e);
                                    }}
                                  />
                                  {touched3.landmark && errors3.landmark ? (
                                    <div className="errorboxlogin">
                                      {errors3.landmark}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="mb-2 pb-1">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    placeholder="City Or District"
                                    id="form3Examplev4"
                                    className="form-control form-control-lg"
                                    value={values3.citydistrict}
                                    onChange={async (e) => {
                                      handleChange3("citydistrict")(e);
                                    }}
                                  />
                                  {touched3.citydistrict &&
                                  errors3.citydistrict ? (
                                    <div className="errorboxlogin">
                                      {errors3.citydistrict}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="mb-2 pb-1">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    placeholder="State"
                                    id="form3Examplev4"
                                    className="form-control form-control-lg"
                                    value={values3.state}
                                    onChange={async (e) => {
                                      handleChange3("state")(e);
                                    }}
                                  />
                                  {touched3.state && errors3.state ? (
                                    <div className="errorboxlogin">
                                      {errors3.state}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-6 mb-4 pb-2 mb-md-2 pb-md-0">
                                  <div className="form-outline">
                                    <input
                                      type="text"
                                      id="form3Examplev5"
                                      className="form-control form-control-lg"
                                      placeholder="Zip Code"
                                      value={values3.zipcode}
                                      onChange={async (e) => {
                                        handleChange3("zipcode")(e);
                                      }}
                                    />
                                    {touched3.zipcode && errors3.zipcode ? (
                                      <div className="errorboxlogin">
                                        {errors3.zipcode}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 bg-info text-black">
                            <div className="p-5">
                              <h3 className="mb-3 text-dark">
                                Contact Details
                              </h3>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Marital Status
                                    </label>
                                    <select
                                      className="form-control form-control-lg"
                                      id="Plans"
                                      onChange={async (e) => {
                                        handleChange3("matiralstatus")(e);
                                      }}
                                      value={values3.matiralstatus}
                                    >
                                      <option>Select One</option>
                                      <option value="Single">Single</option>
                                      <option value="Married">Married</option>
                                      {touched3.matiralstatus &&
                                      errors3.matiralstatus ? (
                                        <div className="errorboxlogin">
                                          {errors3.matiralstatus}
                                        </div>
                                      ) : null}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-6 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Mother Name
                                    </label>
                                    <input
                                      type="text"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      onChange={async (e) => {
                                        handleChange3("mothername")(e);
                                      }}
                                    />
                                    {touched3.mothername &&
                                    errors3.mothername ? (
                                      <div className="errorboxlogin">
                                        {errors3.mothername}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-6 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Father Name
                                    </label>
                                    <input
                                      type="text"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.fathername}
                                      onChange={async (e) => {
                                        handleChange3("fathername")(e);
                                      }}
                                    />
                                    {touched3.fathername &&
                                    errors3.fathername ? (
                                      <div className="errorboxlogin">
                                        {errors3.fathername}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-6 pb-1">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Mobile Number
                                    </label>
                                    <input
                                      type="number"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.mono}
                                      onChange={async (e: any) => {
                                        handleChange3("mono")(e);
                                      }}
                                    />
                                    {touched3.mono && errors3.mono ? (
                                      <div className="errorboxlogin">
                                        {errors3.mono}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-6 pb-4">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Full Name
                                    </label>
                                    <input
                                      type="text"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.fullname}
                                      onChange={async (e) => {
                                        handleChange3("fullname")(e);
                                      }}
                                    />
                                    {touched3.fullname && errors3.fullname ? (
                                      <div className="errorboxlogin">
                                        {errors3.fullname}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <h3 className="text-dark">Bank Details</h3>
                                <div className="col-md-6">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Bank Name
                                    </label>
                                    <input
                                      type="text"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.bankname}
                                      onChange={async (e) => {
                                        handleChange3("bankname")(e);
                                      }}
                                    />
                                    {touched3.bankname && errors3.bankname ? (
                                      <div className="errorboxlogin">
                                        {errors3.bankname}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-6 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Bank Account No:-
                                    </label>
                                    <input
                                      type="number"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.bankaccno}
                                      onChange={async (e: any) => {
                                        handleChange3("bankaccno")(e);
                                      }}
                                    />
                                    {touched3.bankaccno && errors3.bankaccno ? (
                                      <div className="errorboxlogin">
                                        {errors3.bankaccno}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-6 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Bank IFSC Code:-
                                    </label>
                                    <input
                                      type="text"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.bankifsc}
                                      onChange={async (e) => {
                                        handleChange3("bankifsc")(e);
                                      }}
                                    />
                                    {touched3.bankifsc && errors3.bankifsc ? (
                                      <div className="errorboxlogin">
                                        {errors3.bankifsc}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-6 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Bank MCR Code:-
                                    </label>
                                    <input
                                      type="text"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.branchmcr}
                                      onChange={async (e) => {
                                        handleChange3("branchmcr")(e);
                                      }}
                                    />
                                    {touched3.branchmcr && errors3.branchmcr ? (
                                      <div className="errorboxlogin">
                                        {errors3.branchmcr}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="col-md-6 pb-4">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Upi Id:-
                                    </label>
                                    <input
                                      type="text"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.upiid}
                                      onChange={async (e) => {
                                        handleChange3("upiid")(e);
                                      }}
                                    />
                                    {touched3.upiid && errors3.upiid ? (
                                      <div className="errorboxlogin">
                                        {errors3.upiid}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <h3 className="text-dark">Optional Details</h3>
                                <div className="col-md-6">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Fund Settlement Duration
                                    </label>
                                    <select
                                      className="form-control form-control-lg"
                                      id="Plans"
                                      value={values3.fundstatement}
                                      onChange={async (e) => {
                                        handleChange3('fundstatement')(e);
                                      }}
                                    >
                                      <option value="Select">Select One</option>
                                      <option value="daily">Daily</option>
                                      <option value="weekly">Weekly</option>
                                      <option value="monthly">Monthly</option>
                                      {touched3.fundstatement && errors3.fundstatement ? (
                                        <div className="errorboxlogin">
                                          {errors3.fundstatement}
                                        </div>
                                      ) : null}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-6 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Trading Experience ( in Years)
                                    </label>
                                    <input
                                      type="number"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.tradingexp}
                                      onChange={async (e: any) => {
                                        handleChange3("tradingexp")(e);
                                      }}
                                    />
                                    {touched3.tradingexp &&
                                    errors3.tradingexp ? (
                                      <div className="errorboxlogin">
                                        {errors3.tradingexp}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-6 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Annual Income
                                    </label>
                                    <input
                                      type="number"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.annualincome}
                                      onChange={async (e) => {
                                        handleChange3("annualincome")(e);
                                      }}
                                    />
                                    {touched3.annualincome &&
                                    errors3.annualincome ? (
                                      <div className="errorboxlogin">
                                        {errors3.annualincome}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-6 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label">
                                      Occupation
                                    </label>
                                    <input
                                      type="text"
                                      id="form3Examplev3"
                                      className="form-control form-control-lg"
                                      value={values3.occupation}
                                      onChange={async (e) => {
                                        handleChange3("occupation")(e);
                                      }}
                                    />
                                    {touched3.occupation &&
                                    errors3.occupation ? (
                                      <div className="errorboxlogin">
                                        {errors3.occupation}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-dark btn-lg"
                                data-mdb-ripple-color="dark"
                              >
                                Register
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </>
      )}
    </>
  );
};

export default Signup;

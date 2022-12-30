import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";

import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { GlobleContext } from "globleContext";

import toast from "helpers/toast";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

import {
  login,
  resendverificationstep,
  verifyotp,
} from "services/webservices/user/api";

const Signin = () => {
  const { setSessionStatus, setSessionData } = useContext<any>(GlobleContext);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [userId, setuserId] = React.useState<any>();
  let [counter, setCounter] = useState(59);
  const router = useRouter();
  const emailIdRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const onlynumber = /^[0-9\b]+$/;
  const myfun = Yup.object().shape({
    emailId: Yup.string()
      .trim()
      .matches(emailIdRegex, "Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .matches(passwordRegex, "Enter Valid Password")
      .required("Password is required."),
  });

  const {
    handleSubmit: handleSubmit2,
    handleChange: handleChange2,
    values: values2,
  } = useFormik({
    initialValues: {
      otp: "",
    },

    // validationSchema: myfun1,
    onSubmit: async (values2: any) => {
      console.log("otp verification user id", userId);
      const response2 = await verifyotp(userId, values2.otp);
      console.log("Otp Response", response2);
      if (response2.responseMessage === "Successfull") {
        console.log("signInnnnnnn Successgully");
        let result = await signIn("credentials", {
          OTP: values2.otp,
          userId,
          redirect: false,
        });
        console.log("Otp Result", result);
        // setIsLoggedIn(true)

        // console.log("response2.responseData.user", response2.responseData)
        if (result?.error) {
          toast.error(result.error);
          router.replace("/signin");
        } else {
          console.log("object");
          // setSessionStatus()
          router.push("/Dashboard");
        }
      }
      if (response2.responseMessage === "Please enter valied OTP") {
        toast.error(response2.responseMessage);
      }
    },
  });
  const {
    handleSubmit: handleSubmit1,
    handleChange: handleChange1,
    values: values1,
    touched: touched1,
    errors: errors1,
  } = useFormik({
    initialValues: {
      emailId: "",
      password: "",
      redirect: false,
    },
    validationSchema: myfun,
    onSubmit: async (values1: any) => {
      console.log("first");
      
      const response = await login({
        emailId: values1.emailId,
        password: values1.password,
      });
      // console.log('values', values1)
      console.log("Login Response", response);
      if(response.responseMessage === "Please provide valid details"){
        toast.error(response.responseMessage)
      }
      

      if (
        response.responseMessage === "OTP sent to your register email address"
      ) {
        console.log("success Response", response.responseMessage);
        toast.success(response.responseMessage);
        setModalOpen(true);
        setuserId(response.responseData.id);
        console.log("response.responseData.id", response.responseData.id);

        countdown();
      }

      if (response.responseMessage === "Successfull") {
        
        setuserId(response.responseData.id);

        let result = await signIn("credentials", {
          emailId: values1.emailId,
          password: values1.password,
          redirect: false,
        });
        console.log("result", result);
        if (result?.error) {
          toast.error(result.error);
          router.replace("/signin");
        } else {
          console.log("object");
          router.push("/Dashboard");
        }
        
      }
    },
  });
  function countdown() {
    counter = 59;
    let timer = setInterval(() => {
      setCounter(counter--);
      if (counter < 0) {
        // console.log("stop time");
        clearInterval(timer);
      } else {
        // console.log("start time");
      }
    }, 1000);
  }
  const ResendOtp = async () => {
    const response = await resendverificationstep(userId);
    console.log("Resend OTP", response);
    countdown();
  };

  return (
    <>
      <ToastContainer />
      <title> The Trade King</title>
      <div>
        <div className="login-page">
          <div className="formoflogin">
            <img src="https://i.ibb.co/5x9zfVJ/logo.webp" />
            <h3>The Trade King</h3>
            <p>Login To Your Account</p>
            <form className="login-formoflogin" onSubmit={handleSubmit1}>
              <input
                type="email"
                className="input"
                name="emailId"
                placeholder="Enter Your Email"
                onChange={async (e) => {
                  handleChange1("emailId")(e);
                }}
                value={values1.emailId}
              />
              {touched1.emailId && errors1.emailId ? (
                <div className="errorboxlogin">{errors1.emailId}</div>
              ) : null}
              <input
                type="password"
                className="input"
                name="password"
                placeholder="password"
                onChange={async (e) => {
                  handleChange1("password")(e);
                }}
                value={values1.password}
              />
              {touched1.password && errors1.password ? (
                <div className="errorboxlogin">{errors1.password}</div>
              ) : null}
              <Button id="btn" type="submit">
                Login
              </Button>
              <Link href="/ForgotPassword" className="forgotpasssword">
                {" "}
                Forgot Password ?.
              </Link>
              <>
                <Modal
                  toggle={() => setModalOpen(!modalOpen)}
                  isOpen={modalOpen}
                >
                  <div className=" modal-header">
                    <h5 className=" modal-title" id="exampleModalLabel">
                      The Trade King
                    </h5>
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen(!modalOpen)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <>
                    <ModalBody>
                      <form onSubmit={handleSubmit2}>
                        <input
                          type="number"
                          name="otp"
                          onChange={async (e) => {
                            handleChange2("otp")(e);
                          }}
                          value={values2.otp}
                        ></input>
                        <br></br>
                        <p className="otpfont">
                          {" "}
                          Otp Valid Till :- 00: {counter}
                        </p>
                        <ModalFooter>
                          {counter === 0 && (
                            <Button
                              color="danger"
                              type="submit"
                              onClick={ResendOtp}
                            >
                              Resend OTP
                            </Button>
                          )}
                          <Button color="primary" type="submit">
                            Submit
                          </Button>
                        </ModalFooter>
                      </form>
                    </ModalBody>
                  </>
                </Modal>
              </>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

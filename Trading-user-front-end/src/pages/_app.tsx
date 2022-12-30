import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import LandingPageLayout from 'layout/index'
import NextNProgress from 'nextjs-progressbar'
import { SSRProvider } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'theme/global.scss'
import { GlobleContext } from '../globleContext/index'
import {  SessionProvider, useSession } from 'next-auth/react'

const MainApp = ({ Component, pageProps }: AppProps) => {

  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   typeof window !== 'undefined' &&
  //     window.localStorage.getItem('TokenAuth') !== null &&
  //     window.localStorage.getItem('TokenAuth') !== '' &&
  //     window.localStorage.getItem('TokenAuth') !== undefined
  // )
  // const setUserInfo = (data: { loginActivity: string | any[] }) => {
  //   setUserData(data)
  //   const activityId = data.loginActivity.slice(-1)
  //   window.localStorage.setItem('activityId', activityId[0]._id)
  //   window.localStorage.setItem('userData', JSON.stringify(data))
  // }

  // const [userData, setUserData] = React.useState(
  //   JSON.parse(
  //     (typeof window !== 'undefined' &&
  //       window.localStorage.getItem('userData')) ||
  //       '{}'
  //   )
  // )
  // const [appToken] = React.useState(
  //   typeof window !== 'undefined' && window.localStorage.getItem('TokenAuth')
  // )
  // const setUserToken = (data: string) => {
  //   window.localStorage.setItem('TokenAuth', data)
  // }
  const [signIn, setSignIn] = React.useState(null)
  return (
    <SessionProvider session={pageProps.session}>

    <GlobleContext.Provider
      value={{
        // isLoggedIn,
        // setIsLoggedIn,
        // setUserInfo,
        // userData,
        // appToken,
        // setUserToken,
        signIn,
   
        setSignIn,

      }}>
    <SSRProvider>
      <LandingPageLayout>
        <NextNProgress
          height={5}
          color="#0010f1"
          options={{
            showSpinner: false,
          }}
        />
        <Component {...pageProps} />
      </LandingPageLayout>
    </SSRProvider>
    </GlobleContext.Provider>
    </SessionProvider>
  )
}

export default MainApp

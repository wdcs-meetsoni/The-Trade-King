import React, { useEffect } from 'react'
import PrivateRoute from '../../routes/ProtectedRoutes'
import { GlobleContext } from "globleContext";
import Router, { useRouter } from 'next/router';
const Dashboard = () => {
  const {isLoggedIn, setIsLoggedIn} = React.useContext <any>(GlobleContext)
  return (
    <div>
      Hello This Is Dashboard
    </div>
  )
}

export default Dashboard
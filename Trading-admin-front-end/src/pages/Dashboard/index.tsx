import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import Dashboard from 'views/Dashboard'

const adminHome = () => {
  const {data:session,status}=useSession()
  console.log('session,status',session,status)
  return (
    <Dashboard />
  )
}

export default adminHome

// export const getServerSideProps = async (context: any) => {
//   const session = await getSession(context)
//   console.log('session', session);
//   if (!session) {
//     return {
//       redirect: '/sigin',
//       permanent: false
//     }
//   }
//   return {
//     props: {
//       data: session
//     }
//   }
// }
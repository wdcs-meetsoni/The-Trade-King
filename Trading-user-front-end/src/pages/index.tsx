import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import HomePage from 'views/HomePage'

const Index: NextPage = () => {
  const {data:session,status}=useSession()
  console.log('first',session,status)
  return <HomePage />
}

export default Index

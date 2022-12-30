import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import error from '../../public/images/404.jpeg';
const ErrorPage = () => {
    const router = useRouter();
  return (
    <div className='card'>
     <div className='card-header'>
        Content Of Page
        </div>
        <div className='card-body23'>
        404 - Page Not Found !!!!
        <br></br>
        <Image src={error} alt='meet' className='errorphotu'></Image>
        </div>
        <div className='card-footer'>
            Please Go Back to Where you have been
           <br></br> <Button onClick={()=>{router.push("/")}}>Go To Dashboard</Button>
     </div>
    </div>
  )
}

export default ErrorPage

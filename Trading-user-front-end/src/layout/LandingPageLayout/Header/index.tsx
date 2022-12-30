import logo from '../../../../public/images/nafav.jpeg'
import Container from 'react-bootstrap/Container';
import React, { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/router';
import {signOut, useSession } from 'next-auth/react';


const Header = (props) => {
  const router = useRouter()
  const {status}=useSession()
  const [nayan,setNayan]= React.useState(false);
  // const [flag,setFlag]
  useEffect(()=>{
    const status1 = status
    console.log("stats",status);
    if(status1 === 'unauthenticated'){
      return
    }
    if(status1 === "authenticated"){
      setNayan(true)
    }else{
      setNayan(false)
    }
  },[status])

  // useEffect(() => {
  //   console.log("meerawerdsd", session);
  // }, [session])
  
  return (
    <>
      <Navbar className='navbar2323' expand="lg" sticky="top">
      <Container fluid>
      <Image src={logo} alt='meet' width="90"
              height="70"/>
              
      {!nayan   ? (<Navbar.Brand className='thetradeking' href='/'>The Trade King</Navbar.Brand>):
      (<Navbar.Brand className='thetradeking' href='/Dashboard'></Navbar.Brand>)}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
       
            </Nav>

          {!nayan  ? (<><Link href="/signup"  className='navlinks'> Signup </Link>
          <Link href="/AboutUs" className='navlinks'>About</Link>
          <Link href="/pricing" className='navlinks'>Pricing</Link>
          <Link href="/support" className='navlinks'>Support</Link>
          <Link href="/signin" className='navlinks'>Devops</Link> </>):(
          <Link href='/signin' onClick={()=>signOut()} className='navlinks22'>Logout </Link>)}
     
                    
        </Navbar.Collapse>
      </Container>
    </Navbar>


    </>
  )
}

export default Header

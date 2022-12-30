import homepic from '../../../public/images/back.jpeg';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { Router, useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
  return(<>


   <Button className='btn-dark' onClick={()=>{router.push("/signin")}}> Click Here To Login</Button> 
    
  
    </>)
}

export default HomePage

import React, { useEffect } from 'react'
import { DiAptana } from "react-icons/di";
import { GlobleContext } from "globleContext";
import Router, { useRouter } from 'next/router';
import { Button, Card, CardGroup } from 'react-bootstrap';
import { CardBody, CardColumns, CardFooter, CardHeader } from 'reactstrap';
const Dashboard = () => {
  const router = useRouter();
  return (<>

    <div className="container">
      <div className='DashboardContainer'>
  <div className="row">
    <div className="col-sm">
      <Card className='admincard'  onClick={()=>{router.push("/user-management")}}>
        <CardHeader>
        User Management &ensp;
        <DiAptana className='diaplha' />
        
        </CardHeader>
        <CardBody>
        <h6>Operations :-<ol>
            <li>User Request Approve / Delete</li>
            <li>User Authentication</li>
            <li>User Updation Request List</li>
            <li>User Segment Activation</li>
            </ol> </h6>
          </CardBody>
        <CardFooter>
        User Management :- &ensp;
          
          <Button className='btn btn-dark' onClick={()=>{router.push("/user-management")}}> Click Here </Button>
       
        </CardFooter>
      </Card>
    </div>
    <div className="col-sm">
      <Card className='admincard'>
        <CardHeader>
          Meet Soni
        </CardHeader>
        <CardBody>
          User Management :- 
          <Button className='btn btn-dark'> Here</Button>
        </CardBody>
        <CardFooter>
          roles
        </CardFooter>
      </Card>
    </div>
    <div className="col-sm">
      <Card className='admincard'>
        <CardHeader>
          Meet Soni
        </CardHeader>
        <CardBody>
          User Management :- 
          <Button className='btn btn-dark'> Here</Button>
        </CardBody>
        <CardFooter>
         roles
        </CardFooter>
      </Card>
    </div>
  </div>
 
    </div>
    </div>

    </>
  )
}

export default Dashboard

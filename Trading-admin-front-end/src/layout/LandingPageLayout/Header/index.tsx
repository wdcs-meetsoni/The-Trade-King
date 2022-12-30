import logo from "../../../../public/images/nafav.jpeg";
import Container from "react-bootstrap/Container";
import React, { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import toast from "helpers/toast";

const Header = (props) => {
  const router = useRouter();
  const { status } = useSession();
  const [nayan, setNayan] = React.useState(false);
  // const [flag,setFlag]
  useEffect(() => {
    const status1 = status;
    console.log("stats", status);
    if (status1 === "unauthenticated") {
      return;
    }
    if (status1 === "authenticated") {
      setNayan(true);
    } else {
      setNayan(false);
    }
  }, [status]);
  const logout = () => {
    signOut();
    toast.success("Logout Successfully");
  };
  return (
    <>
      <Navbar className="navbar2323" expand="lg" sticky="top">
        <Container fluid>
          <Image src={logo} alt="meet" width="90" height="70" />

          {!nayan ? (
            <Navbar.Brand>
              <>
                <Link href="/" className="thetradeking">
                  The Trade King{" "}
                </Link>
              </>
            </Navbar.Brand>
          ) : (
            <Navbar.Brand className="thetradeking" href="/Dashboard">
              <>
                <Link className="thetradeking" href="/Dashboard">
                  Admin Portal
                </Link>
              </>
            </Navbar.Brand>
          )}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            {!nayan ? (
              <>
                <Link href="/signin" className="navlinks22">
                  {" "}
                  Login{" "}
                </Link>
              </>
            ) : (
              <Link href="/signin" onClick={logout} className="navlinks22">
                Logout <MdLogout />
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

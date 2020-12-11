import React, { useState } from 'react';
import LoginModal from '../containers/LoginModal'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button
} from 'reactstrap';

const MyNavbar = ({loggedIn, setLoggedIn}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // console.log("Navbar.js - loggedIn: "+loggedIn)

  return (
    <div>
      <Navbar color="warning" light expand="md">
        <NavbarBrand href="/">Nextagram</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto " navbar>
          </Nav>
          {loggedIn
          ? (
              <> 
                <p className="text-center mr-3 mt-3 text-dark"> Welcome, {localStorage.getItem("username")}!</p>
                <Button href="/profile" color="light"className="mx-1" >My Profile</Button>
              </>
            )
          : null
          }
          <LoginModal loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
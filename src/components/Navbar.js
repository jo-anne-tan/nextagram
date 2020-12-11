// import {Link} from 'react-router-dom'
import React, { useState } from 'react';
import LoginModal from '../containers/LoginModal'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
} from 'reactstrap';
import MyProfilePage from '../pages/MyProfilePage';

const Example = ({loggedIn, setLoggedIn}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  console.log("Navbar.js - loggedIn: "+loggedIn)

  const showUserProfile=()=>{
    if(loggedIn){
      //code to display user profile
    } else return null
  }



  return (
    <div>
      <Navbar color="warning" light expand="md">
        <NavbarBrand href="/">Nextagram</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto " navbar>
            <NavItem>
              {showUserProfile}
            </NavItem>
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

export default Example;







































// const Navbar =()=>{

//     //to do:
//     // have links to home
//     // make navbar stay at top of page
//     return(
//         <div style={{
//             // border:"2px solid grey", 
//             position:"fixed", 
//             top:"0", 
//             width:"100%", 
//             height:"5vh", 
//             backgroundColor:"white",
//             lineHeight:"5vh",
//             fontSize:"14px",
//             paddingLeft:"5vh",
//             boxSizing: "border-box",
            
//             }}>
            
//             <Link to="/" style={{textDecoration:"none", color:"#FFCAD4"}}>Home</Link>
//         </div>

//     )
// }

// export default Navbar
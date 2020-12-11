import React, { useState } from 'react';
import { Button, Modal } from 'reactstrap';

import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { toast } from 'react-toastify';


let LoginModal=({loggedIn, setLoggedIn})=>{
    const [modal, setModal] = useState(false);

    // flag to toggle between sign up and sign in
    const [signUpFlag, setSignUpFlag] = useState(true)    
    const toggleForm=()=> setSignUpFlag(!signUpFlag)

    const toggle = () => setModal(!modal);

    const handleBtnText=()=>{
        if (loggedIn) return "Logout"
        else return "Login"
    }

    const handleBtnClick =()=>{
        if(loggedIn){
            // If user is logged in, text shows "Logout"
            // Log out sequence:
            // clear local storage of login info
            localStorage.removeItem("jwt")
            localStorage.removeItem("id")
            localStorage.removeItem("username")
            localStorage.removeItem("profilePic")

            // loggedIn set to false
            setLoggedIn(null)

            toast.info(`You have been logged out.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });

        } else toggle()
    }

    // console.log("LoginModal.js - loggedIn: "+loggedIn)

    return(
        <div>
            <Button color="light" onClick={handleBtnClick}>{handleBtnText()}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                {
                !signUpFlag
                ? <SignUpForm toggle={toggle} toggleForm={toggleForm}/> 
                : <LoginForm toggle={toggle} toggleForm={toggleForm} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> 
                }
            </Modal>
        </div>
    )
}

export default LoginModal
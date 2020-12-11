import React, { useState } from 'react';
import {Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

import { ModalHeader, ModalBody } from 'reactstrap';
import axios from'axios'
import { toast } from 'react-toastify';

import {useHistory} from 'react-router-dom'

const Example = ({toggleForm, toggle, setLoggedIn}) => {

  const history = useHistory()

  // user input fields
  const [username, setUsername]=useState("")
  const [email,setEmail] = useState("")
  const [pw,setPw] = useState("")
  const [pwConfirm,setPwConfirm] = useState("")

  // validation fields
  const [delay,setDelay]=useState(null)
  const [usernameValid,setUsernameValid]=useState(false)
  
//-----------------live input validation section-----------------------------------------------
//------username------
  const getInputProp = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6 || username.length >=20) {
      return { invalid: true };
    }

    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getFormFeedback=()=>{
    if(!username.length) {
      return null
    }
    if(username.length <=6 || username.length >=20){
      return <FormFeedback invalid>Must be between 6 and 20 characters</FormFeedback>
    }
    if (usernameValid){
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>
    } else{
      return <FormFeedback invalid>Sorry! That username is taken.</FormFeedback> 
    }
  }

//------password------
  const getInputPwProp = () => {
    if (!pw.length){
      return null
    }
    if (pw.length<8 || pw.length>50){
      return {invalid:true}
    } else return {valid:true}
  }

  const getFormPwFeedback=()=>{
    if(!pw.length){
      return null
    }
    if(pw.length<8 || pw.length>50){
      return <FormFeedback invalid>Must be between 8 and 50 characters long. </FormFeedback>
    }
  }

//------password confirmation------
const getInputPwConfirmProp = () => {
  if (!pwConfirm.length){
    return null
  }
  if (pwConfirm !== pw){
    return {invalid:true}
  } else return {valid:true}
}

const getFormPwConfirmFeedback=()=>{
  if(!pwConfirm.length){
    return null
  }
  if(pwConfirm !== pw){
    return <FormFeedback invalid> Passwords do not match. Please check again.</FormFeedback>
  } else return <FormFeedback valid>Passwords match! You're good to go!</FormFeedback>
}

  
  //------email------
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const getInputEmailProp = () => {
    if (!email.length){
      return null
    } 
    // email check
    if(!email.match(mailformat)){
      return {invalid:true}
    } else return {valid:true}
  }

  const getFormEmailFeedback=()=>{
    if(!email.length){
      return null
    }

    if(!email.match(mailformat)){
      return <FormFeedback invalid>Email format is not valid. Please check.</FormFeedback>
    } else 
    return <FormFeedback valid>Email format looks legit! </FormFeedback>
  }


// --------------username availability check section ---------------------    
  // initiate 500ms delay for each new keystroke:
  // then initiate axios call
  const handleUsername=(e)=>{      
    clearTimeout(delay)
    const newUsername = e.target.value
    setUsername(newUsername)
    
    const newDelay= 
      setTimeout(() => {
        checkUsername(newUsername) //send axios request after 500ms delay
      }, 500);
      setDelay(newDelay)
  }

  // function to trigger axios request to check username availability
  const checkUsername=newUsername=>{
    axios
    .get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`)
    .then(res=>{
      console.log(res.data.valid)
      res.data.valid
      ? setUsernameValid(true)
      : setUsernameValid(false)
    })
  }

// ---------------------- email, pw, pwconfirm input handlers -----------------------------
  const handleEmail=e=>{
    setEmail(e.target.value)
  }
  
  const handlePw=e=>{
    setPw(e.target.value)
  }

  const handlePwConfirm=e=>{
    setPwConfirm(e.target.value)
  }


  const handleSubmit =()=>{
    console.log(username, email, pw, pwConfirm)

    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/users/',
      data: {
        username: username,
        email: email,
        password: pw
      }
    })
    .then(response => {

      // Log user in
      
      localStorage.setItem('jwt', response.data.auth_token)
      localStorage.setItem('id', response.data.user.id)
      localStorage.setItem('username', response.data.user.username)
      localStorage.setItem('profilePic', response.data.user.profile_picture)

      setLoggedIn(true)
      toggle()


      toast.success(`Yay! Welcome aboard, ${localStorage.getItem("username")}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      //Redirect user to their profile page
      history.push("/profile")
    })
    .catch(error => {
      console.log(error)
      if (error.response ===undefined){
        if(error.data.message===undefined){
        toast.error("Unknown error, please try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          })
        } else {
          toast.sucess(error.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }


      } else{
        console.error( error.response) // so that we know what went wrong if the request failed
        error.response.data.message.forEach(message=>{
          console.log(message)

          toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
          })
      }
    })
  }

// ---------------------- start of HTML section -----------------------------
    return (
      <>
        <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
        <ModalBody>
        {/* Form start */}
          <Form>
            <FormGroup>
              <Label for="inputUsername">Username</Label>
              <Input onChange={handleUsername} value={username} type="username" name="username" id="inputUsername" {...getInputProp()}  />
              {getFormFeedback()}
              <FormText>Enter a username between 6 and 20 characters</FormText>
            </FormGroup>

            <FormGroup>
                <Label for="inputEmail">Email</Label>
                <Input onChange={handleEmail} value={email} type="email" name="email" id="inputEmail" {...getInputEmailProp()}/>
                {getFormEmailFeedback()}
            </FormGroup>    

            <FormGroup>
              <Label for="inputPassword">Password</Label>
              <Input onChange={handlePw} value={pw} type="password" name="password" id="inputPassword" {...getInputPwProp()}/>
              {getFormPwFeedback()}
            </FormGroup>

            <FormGroup>
              <Label for="inputConfirmPassword">Confirm Password</Label>
              <Input onChange={handlePwConfirm} value={pwConfirm} type="password" name="confirmPassword" id="inputConfirmPassword" {...getInputPwConfirmProp()}/>
              {getFormPwConfirmFeedback()}
            </FormGroup>
            
            <Button color="primary" onClick={handleSubmit} disabled={!(username&&pw&&pwConfirm&&email)}>Sign Up</Button>
            <Button className="mx-1" onClick={toggle} >Cancel</Button>
          </Form>
        {/* Form end */}
            <small>Already a member?</small>
            <small style={{cursor:"pointer"}} className="text-primary" onClick={toggleForm}>Log in here. </small>
        </ModalBody>
      </>
    );
  }
  
  export default Example;
  
import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios'
import { toast } from 'react-toastify';


const LoginForm = ({toggleForm,toggle, loggedIn, setLoggedIn}) => {

    console.log("LoginModal.js -start - loggedIn: "+loggedIn)

    const [username, setUsername]=useState("")
    const [pw,setPw] = useState("")

    const handleUsername=(e)=>{      
    setUsername(e.target.value)
    console.log(e.target.value)
    }

    const handlePw=e=>{
    setPw(e.target.value)
    console.log(e.target.value)
    }

    const handleSubmit = (e) =>{
      console.log("LoginModal.js - handlesubmit function - loggedIn: "+loggedIn)
      e.preventDefault()

      axios({
        method: 'post',
        url: 'https://insta.nextacademy.com/api/v1/login',
        data: {
          username: username,
          password: pw
        }
      })
      .then(result => {
        localStorage.setItem('jwt', result.data.auth_token)
        localStorage.setItem('id', result.data.user.id)
        localStorage.setItem('username', result.data.user.username)
        localStorage.setItem('profilePic', result.data.user.profile_picture)

        setLoggedIn(true)
        toggle()

        toast.success(`Hey there, ${localStorage.getItem("username")}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch(err=>{
        console.log(err)
      })
    }

    return (
      <>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {/* Form start */}
          <Form>
            <FormGroup>
              <Label for="exampleUsername">Username</Label>
              <Input onChange={handleUsername} value={username} type="username" name="username" id="exampleUsername"  />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input onChange={handlePw} value={pw} type="password" name="password" id="examplePassword"/>
            </FormGroup>

            <Button color="primary" onClick={handleSubmit}>Login</Button>
            <Button className="mx-1" onClick={toggle} >Cancel</Button>
          </Form>
          {/* Form end */}
          <small>New member?</small>
          <small style={{cursor:"pointer"}} className="text-primary" onClick={toggleForm}> Sign up here. </small>
        </ModalBody>
      </>
    );
  }
  
  export default LoginForm;
  
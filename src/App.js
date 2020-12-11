import './App.css';
import Homepage from './pages/Homepage'
import UserProfilePage from './pages/UserProfilePage';
import {Redirect, Route, useHistory} from 'react-router-dom'


import { ToastContainer } from 'react-toastify';

// import {Link} from 'react-router-dom'

import Navbar from './components/MyNavbar'
import { useState } from 'react';
import MyProfilePage from './pages/MyProfilePage';
import UploadPage from './pages/UploadPage';

function App() {

  // loggedIn state
  const [loggedIn,setLoggedIn]=useState(
    localStorage.getItem("jwt") !== null
  )


  return (
    <div>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>

      <Route exact path = "/" component ={Homepage}/>
      <Route path = "/users/:id" component = {UserProfilePage} />
      <Route exact path="/profile">
        {!loggedIn? <Redirect to ="/" /> : <MyProfilePage />}
      </Route>  
      <Route path="/upload">
        {!loggedIn? <Redirect to ="/" /> : <UploadPage />}        
      </Route>


      {/* TO DO (Done) - Figure out a way to pass loggedIn state as a prop to MyProfilePage */}
      {/* Recall that we shouldn't pass props through routes. */}
      {/* These props or axios calls should be reiniated within these pages */}

      <ToastContainer />

    </div>
  );
}

export default App;

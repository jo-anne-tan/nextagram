import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'
import LoadingSpinner from "../components/LoadingSpinner"
import { Button } from 'reactstrap'

import UserImages from '../containers/UserImages'

const MyProfilePage=()=>{
    const loggedIn = (localStorage.getItem("jwt") !== null)
    const [loadStatus,setLoadStatus] = useState(true)
    const id = localStorage.getItem("id")
    const profilePhoto = localStorage.getItem("profilePic")
    const username = localStorage.getItem("username")
    
    useEffect(()=>{
        if (loggedIn){
            let jwt = localStorage.getItem("jwt")
            console.log("Initiating axios call")
            axios.get('https://insta.nextacademy.com/api/v1/images/me',
            {
                headers: {'Authorization' : `Bearer ${jwt}`}
            })
            .then(res=>{ 
                console.log("API request successful.")
                console.log(res) 
                setLoadStatus(false)
            })
            .catch(err=>{ 
                console.error("API request failed.")
                console.error(err) 
            })
        }
    }, [loggedIn]) // to check if code breaks. replaced [] with [loggedIn] state





    return(
        <div style={{padding:"10px"}}> 

            <LoadingSpinner loadStatus = {loadStatus} floatSet={true}/>

            <div style={{display:"flex", padding:"20px", marginTop:"2vh", backgroundColor:"#FFE5D9"}}>
                <div style={{padding:"px"}} > {/*profile*/}
                    <img alt="User profile" src={profilePhoto} style={{width:"200px", borderRadius:"15px"}}/>
                    <p style={{textAlign:"center"}}>{username}</p>
                    <Button href="/upload" className="mx-auto" color="danger" style={{padding:"10px", display:"block"}}>Upload Photos</Button>

                </div>
                <div style= {{marginLeft: "20px"}}>
                    <UserImages id={id}/>    
                </div>
            </div>


        </div>
    )
}

export default MyProfilePage
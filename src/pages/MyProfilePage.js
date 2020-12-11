import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'
import LoadingSpinner from "../components/LoadingSpinner"
import { Button } from 'reactstrap'

const MyProfilePage=()=>{
    const loggedIn = (localStorage.getItem("jwt") !== null)
    const [loadStatus,setLoadStatus] = useState(true)

    useEffect(()=>{
        if (loggedIn){
            let jwt = localStorage.getItem("jwt")
            console.log("jwt: "+jwt)
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
    },[])

    return(
        <div style={{padding:"10px"}}> 
            <Button href="/upload">Upload Photos</Button>
            <LoadingSpinner loadStatus = {loadStatus}/>
        </div>
    )
}

export default MyProfilePage
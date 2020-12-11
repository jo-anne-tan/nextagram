import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LoadingSpinner from "../components/LoadingSpinner"
import UserImages from '../containers/UserImages'

import {Link} from 'react-router-dom'

const Homepage =()=>{
    const [users, updateUsers] = useState([])
    const [loadStatus,setLoadStatus] = useState(true)

    useEffect(()=>{
        axios.get(`https://insta.nextacademy.com/api/v1/users`)
        .then((response)=>{
          updateUsers(response.data)
          setLoadStatus(false)
        })
      },[])
    
    return(
        <>
            <div style={{margin:"20px", marginTop:"5vh" }} >
                <LoadingSpinner loadStatus = {loadStatus}/>
                <div>  {/* All User Profiles */}
                    {users.map((user)=>(
                        // For each individual profile:
                        // wrap in link related to user.id
                        <Link to={`/users/${user.id}`} key={user.id} style={{display:"flex",color:"black", textDecoration:"none", marginBottom:"10vh"}} > 
                                <div>
                                    <img src = {user.profileImage} style={{width:"200px", height:"200px", borderRadius:"15px"}}/>
                                    <p style={{textAlign:"center"}}> {user.username}</p>
                                </div>
                                <div style={{marginLeft: "20px"}}>
                                    <UserImages id={user.id} />
                                </div>
                        </Link>
                    ))}
                </div>      
            </div>
        </>
    )
}

export default Homepage
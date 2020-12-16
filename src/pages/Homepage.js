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
                <LoadingSpinner loadStatus = {loadStatus} floatSet={null}/>
                <div>  {/* All User Profiles */}
                    {users.map((user)=>(
                        <div className="d-flex" key={user.id}>
                        {/*  For each individual profile:
                         wrap in link related to user.id */}
                         <div>
                            <img alt={user.profileImage} src = {user.profileImage} style={{width:"200px", height:"200px", borderRadius:"15px"}}/>
                            <Link className="link" to={`/users/${user.id}`} key={user.id} style={{fontSize:"20px", marginBottom:"10vh"}}> 
                                <p style={{textAlign:"center"}}> {user.username}</p>
                            </Link>
                        </div>
                            <div style={{marginLeft: "20px"}}>
                                <UserImages id={user.id} />
                            </div>
                        </div>
                    ))}
                </div>      
            </div>
        </>
    )
}

export default Homepage
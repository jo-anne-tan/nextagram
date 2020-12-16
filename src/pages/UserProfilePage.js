import React, {useEffect, useState} from 'react'
import UserImages from '../containers/UserImages'
import {useParams} from 'react-router-dom'
import axios from 'axios'


const UserProfilePage =()=>{
    let id = useParams().id
    const jwt = localStorage.getItem("jwt")
    console.log(`UserProfilePage jwt: ${jwt}`)
    const [username, updateUsername] = useState("")
    const[profilePhoto, updatePhoto] = useState("")

    useEffect(()=>{
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
        .then((res)=>{
            updatePhoto(res.data.profileImage)
            updateUsername(res.data.username)
        })
    },[id])

    return(
        <div style={{display:"flex", padding:"20px", marginTop:"5vh"}}>
            <div style={{padding:"px"}} > {/*profile*/}
                <img alt="User profile" src={profilePhoto} style={{width:"200px", borderRadius:"15px"}}/>
                <p style={{textAlign:"center"}}>{username}</p>
            </div>
            <div style= {{marginLeft: "20px"}}>
                <UserImages id={id} jwt={jwt}/>    
            </div>
            
        </div>
    )
}

export default UserProfilePage

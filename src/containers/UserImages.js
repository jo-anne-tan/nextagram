import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'


const UserImages =({id})=>{

    const [images, updateImg] = useState([])
    const [loadStatus,setLoadStatus] = useState(true)

    useEffect(()=>{
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${id}`)
        .then((result)=>{
            updateImg(result.data)
            setLoadStatus(false)

        })
        .catch(error => console.log(error))
    },[id])
    

    return( 
        <div style={{display:"flex", flexWrap:"wrap", backgroundColor:"white", borderRadius:"5px"}}>
            <LoadingSpinner loadStatus = {loadStatus} floatSet={true} />

            {
                images.map((image,index)=>{
                    return(
                        <Link key={`link-${id}.${index}`} to={`/viewphoto/${image.id}`} >
                            <div className="images" style={{ width:"25vw", margin:"5px", padding:"5px", borderRadius:"5px"}}>
                                <img key={image.id} alt={image.url} src = {image.url} style={{margin:"auto",maxWidth:"100%", maxHeight:"100%",display:"block",borderRadius:"5px"}}></img>
                            </div>
                        </Link>
                    )
                })
            }
        </div>        
    )
}

export default UserImages
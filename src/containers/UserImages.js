import React, {useEffect, useState} from 'react'
import axios from 'axios'
//https://insta.nextacademy.com/api/v2/images/<id>

const UserImages =({id})=>{
    const [images, updateImg] = useState([])


    useEffect(()=>{
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${id}`)
        .then((result)=>{
            // console.log(result)
            updateImg(result.data)
        })
        .catch(error => console.log(error))
    },[id])
    
    // console.log(id)
    return( 
        <div style={{display:"flex", flexWrap:"wrap", backgroundColor:"white", borderRadius:"5px"}}>
            {
                images.map((image)=>{
                    return(
                        <div style={{height:"25vw", width:"25vw", margin:"auto", padding:"5px"}}>
                            <img src = {image.url} style={{margin:"auto",maxWidth:"100%", maxHeight:"100%",display:"block",borderRadius:"5px"}}></img>
                        </div>
                    )
                })
            }
            {/* {console.log(id)}
            {images.map((image)=>(
                <img src = {image.url}></img>

            )}
            {console.log("--")} */}

        </div>
        
    )
}

export default UserImages
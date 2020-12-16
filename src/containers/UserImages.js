import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
// import Comment from './Comment'
//https://insta.nextacademy.com/api/v2/images/<id>

const UserImages =({id, jwt})=>{

    const [images, updateImg] = useState([])
    // const [commentStatus, setCommentStatus]= useState(false)

    useEffect(()=>{
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${id}`)
        .then((result)=>{
            updateImg(result.data)
        })
        .catch(error => console.log(error))
    },[id])
    

    return( 
        <div style={{display:"flex", flexWrap:"wrap", backgroundColor:"white", borderRadius:"5px"}}>
            {
                images.map((image,index)=>{
                    return(
                        <Link key={`link-${id}.${index}`} to={`/viewphoto/${image.id}`} >
                            <div className="images" style={{ width:"25vw", margin:"5px", padding:"5px", borderRadius:"5px"}}>
                                <img key={image.id} alt={image.url} src = {image.url} style={{margin:"auto",maxWidth:"100%", maxHeight:"100%",display:"block",borderRadius:"5px"}}></img>
                                {/* <Comment imageID={image.id} jwt={jwt}/> */}
                            </div>
                        </Link>
                    )
                })
            }
        </div>        
    )
}

export default UserImages
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { Button } from 'reactstrap'

import CommentSection from '../containers/CommentSection'


const ViewPhotoPage=()=>{
    let imageID = useParams().imageID
    const jwt = localStorage.getItem("jwt")

    const [img, setImg]=useState("")
    const [likeCount, updateLikeCount] = useState([])

    // 
    const [like, setLike] = useState(false)

    useEffect(()=>{
        console.log("Initiating axios GET request for image...")
        axios
        .get(`https://insta.nextacademy.com/api/v2/images/${imageID}`,
        {headers:{
            Authorization: `Bearer ${jwt}`
        }}
        )
        
        // )
        .then(res=>{
            // console.log(res)
            console.log("axios GET request for image successful.")
            setImg(res.data.url)
            setLike(res.data.liked)
            updateLikeCount(res.data.likes)
        })
        .catch(err=>{
            console.log("axios GET request for image failed.")
            console.error(err)
        })
    },[like])

    const toggleLike=()=>{

        console.log("Initiating axios POST for image toggle like...")
        axios
        .post(`https://insta.nextacademy.com/api/v1/images/${imageID}/toggle_like`,null,
        { headers:{
            Authorization: `Bearer ${jwt}`
        }}
        )
        .then(res=>{
            console.log("axios GET request for image toggle like successful.")            
            console.log(res)
            setLike(res.data.liked)


        })
        .catch(err=>{
            console.log("axios GET request for image toggle like failed.")            
            console.error(err)
        })
    }


    const likeCountCheck =()=>{
        if(likeCount.length===1) {
            return("1 Like")
        } else if (likeCount.length>1){
            return(`${likeCount.length} Likes`)
        } else return("No likes yet. :( Be the first to like this photo!")
    }

    return(
        <div className="d-flex mx-3 row">
            <div className="col d-flex flex-column align-items-center mr-3 mt-3">
                {/* User image */}
                <img src={img} style={{width:"50vw"}}/>

                <div className="d-flex justify-content-between my-2" style={{width:"100%"}}>
                    {/* Toggle like button */}
                    {/* Nice to have: Change button to heart icon */}
                    <Button onClick={toggleLike} className= "btn-danger" style={{border:"none", margin:"0"}}> {like? "Unlike" : "Like"}</Button>

                    {/* Like count */}
                    <small className="my-3" style={{fontStyle:"italic"}}>
                        {likeCountCheck()}
                    </small>
                </div>
            </div>
            <div className="col mt-2">
                <CommentSection imageID={imageID} jwt={jwt}/>

            </div>
        </div>

    )
}

export default ViewPhotoPage
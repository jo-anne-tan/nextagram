import React, { useEffect, useState } from 'react'
import {Form, Input, ListGroup, ListGroupItem} from 'reactstrap'
import axios from 'axios'

const CommentSection =({ imageID, jwt})=>{

    const [input,setInput] = useState("")
    const [comment,setComment] = useState(null)
    const [commentList,updateCommentList]=useState([])

    const handleChange=(e)=>{
        setInput(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setComment({"content":input})
        setInput("")
    }

    // Submit comment
    useEffect(()=>{
        if(comment){
            console.log("Triggering axios POST for image comment...")
            axios
            .post(`https://insta.nextacademy.com/api/v1/images/${imageID}/comments`, comment,
            { headers:{
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': `application/json`
            }})
            .then( res=>{
                console.log(res)
                setComment(null)
             })
            .catch( err=>console.error(err))
        }       
    },[comment, jwt, imageID])

    // Retrieve comments list
    useEffect(()=>{
        axios
        .get(`https://insta.nextacademy.com/api/v1/images/${imageID}/comments`,
        {headers:{Authorization:`Bearer ${jwt}`}}
        )
        .then(res=>{
            console.log(res)
            updateCommentList(res.data)
        })
        .catch(err=>{
            console.err(err)
        })
    },[comment, jwt, imageID])
    

    //Retrieve username 
    // useEffect(()=>{
    //     axios
    //     .get(`https://insta.nextacademy.com/api/v1/users/${userID}`)
    //     .then(res=>(console.log(res)))
    //     .catch(err=>console.error(err))
    // },[])

    return(
        <div className="pt-2"style={{width:"100%", height:"70vh", overflow:"auto"}}>
            {/* Comment input form */}
            <Form onSubmit={handleSubmit} className="my-2" >
                <Input onChange={handleChange} type="text" value={input} placeholder="Comment here..." style={{border:"1px solid gold"}}/>
            </Form>

            {/* Comments section */}
            <ListGroup style={{ listStyle:"none", padding:"0"}}>
                <small>{commentList.length} comments</small>
                {
                    commentList.map(comment=>{
                        return(
                            <ListGroupItem key={comment.id} className="px-3 py-2" style={{border: "1px solid gold", borderRadius:"5px"}}>
                                <div className="d-flex ">
                                    <div>
                                        <img alt={comment.posted_by.profileImage} src ={comment.posted_by.profileImage}  style={{width:"50px"}}/>
                                        <p  style={{fontSize:"12px"}}>{comment.posted_by.id}</p>
                                    </div>
                                    <p className="mx-3">{comment.content}</p>
                                </div>                                
                                <p className="text-right" style={{fontSize:"10px", fontStyle:"italic"}}>Posted on {comment.created_at}</p>
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}    


export default CommentSection
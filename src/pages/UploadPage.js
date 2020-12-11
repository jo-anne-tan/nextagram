import Axios from 'axios';
import React, {useState} from 'react'
import {Button, Form, FormText, FormGroup, Input } from 'reactstrap';
import LivePreview from '../containers/LivePreview';
import { toast } from 'react-toastify';



const UploadPage=()=>{
    const [loadStatus,setLoadStatus] = useState(null)

    const [imageFile, setImageFile] = useState(null)
    
    
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState("")

    const fileUploadHandle=(e)=>{
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0]) 
    }

    const handleSubmitFile=(e)=>{
        setLoadStatus(true)
        // Prevent the default behaviour of the form submitting
        e.preventDefault();        
        let jwt = localStorage.getItem("jwt")

        // Formdata object to hold the image file to send to the server
        // "new" keyword is used to create an instance of an object that has a constructor function.
        // On calling "new", A new empty object is created
        let formData = new FormData();
        formData.append("image", imageFile);

        Axios.post("https://insta.nextacademy.com/api/v1/images/",formData,
        {
            headers: {Authorization: `Bearer ${jwt}`}
        })
        .then(res=>{
            console.log(res)
            setLoadStatus(false)
            toast.success(`Image uploaded!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
      
        })
        .catch(err=>{
            console.error(err)
        })
    }

    return(
        <div style={{padding:"10px"}}>
            <p className="h6">Upload your image below</p>
            <hr/>
            <div className="d-flex">
                <LivePreview previewImage={previewImage} message={message} loadStatus={loadStatus}/>
                <Form 
                style={{height:"40vh"}}
                className="d-flex flex-column"
                onSubmit={handleSubmitFile}>
                    <FormGroup>
                        <Input
                        className="file-upload"
                        multiple="false"
                        type="file"
                        name="image-file"
                        onChange={ fileUploadHandle
                            // The function to call when you have selected a file will be called here
                            }
                        />
                        <FormText color="muted">
                        Make sure the image being uploaded is a supported format.
                        </FormText>

                    </FormGroup>
                    <Button type="submit" color="danger">
                        Upload
                    </Button>
                </Form>
            </div>

        </div>
    )
}

export default UploadPage
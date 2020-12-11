import React from 'react'
import LoadingSpinner from '../components/LoadingSpinner'

const LivePreview=({previewImage,message,loadStatus})=>{

  const pictureHandler=()=>{
    console.log('In pictureHandler - load Status: '+loadStatus)

    return(
      <>
        {previewImage ? (
          <img
            alt="Upload preview"
            className="mx-auto"
            src={previewImage}
            width="100%"
            height="100%"
            style={{borderRadius:"5px", filter:loadStatus? "opacity(50%)":"opacity(100%)"}}
          />
          ) : (
          <h3  className="text-center" style={{lineHeight:"40vh"}}>

            {message ? message : "Live Preview"}
          </h3>
        )}
        
        {loadStatus
        ?<div style={{width:"100%", height:"100%", position:"absolute"}}>
            <LoadingSpinner loadStatus = {loadStatus} floatSet={true}/>
            <p className="text-center" style={{lineHeight:"35vh"}}>Uploading photo...</p>
          </div>
        : null
        }
      </>
    )
  }  

  return(
      <div className="card mr-3" >
        {pictureHandler()}
      </div>
  )
}

export default LivePreview
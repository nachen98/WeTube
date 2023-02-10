import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./EditVideo.css"
import { updateVideo } from '../../store/video';



const EditVideoForm = ({ showVideoEditModal, setShowVideoEditModal, videoId, old_title, old_description, username, old_videourl, old_imgurl}) => {

    const dispatch = useDispatch();
    const history = useHistory()

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState(old_title);
    const [description, setDescription] = useState(old_description);
    const [thumbnailPic, setThumbNailPic] = useState(null);
    const [video, setVideo] = useState(null)
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        const allErrors = []
    
        if (title?.length > 255) {
            allErrors.push("The title must be less than 255 characters")
        }
 
        if (description?.length > 255) {
            allErrors.push("The description must be less than 255 characters.")
        }

        if(video!==null){
            if (video?.type !== "video/mp4" && video?.type !== "video/mkv") allErrors.push("File format must be either .mp4 or .mkv")
            if (video?.size > 50000000) allErrors.push("Video size is limited to 50MB.")
        }

        if (thumbnailPic!==null && thumbnailPic?.type !== "image/png" && thumbnailPic?.type !== "image/gif" && thumbnailPic?.type !== "image/jpg" && thumbnailPic?.type !== "image/jpeg")
            allErrors.push("The accepted extentions for thumbnail pictures are .png, .gif, .jpg, .jpeg.")

        setErrors(allErrors)


    }, [title, description, video, thumbnailPic])


    const handleSubmit = async (e) => {
  
        e.preventDefault();
 
        if (errors.length > 0) return;
     
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
     
        if(thumbnailPic!==null)
            formData.append("thumbnail_pic", thumbnailPic)
        if(video!==null)
            formData.append("content", video)

        // console.log('formData!!!!!!!!!', formData)
        setIsLoading(true)

        await dispatch(updateVideo(formData, videoId)).then(
            async (res) => {

                if (res && res.errors?.length > 0) {
                    setErrors(res.errors)

                    setIsLoading(false)
                } else {
                    setShowVideoEditModal(false)
                    setIsLoading(false)
                    history.push(`/channel/@${username}`)
                }
            }
        )

    }

    return (
        <div id="form-container">
            <div id="form-header">
                Edit your video:
                <ul>
                    {errors.map(error => (
                        <li>{error}</li>
                    ))}
                </ul>
            </div>

            <div id="form-body">
                <form onSubmit={handleSubmit}>

                        <div className="input-field" >

                            <label className="custom-field">
                                <input className="title-description-input"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}

                                />
                                <span className="placeholder">Title</span>
                            </label>
                        </div>
                        
                        <div>
                            <label className="custom-field">
                                <input className="title-description-input"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <span className="placeholder">Description</span>
                            </label>
                        </div>

                  
                    <div className="file-container">
                            <label> Choose your video file here
                                <input id="video-file-input-area"
                                    type="file"
                                    accept="video/mp4, video/mkv"
                                    onChange={(e) => setVideo(e.target.files[0])
                                    }
                                    
                                />
                            </label>

                        </div>
                        <div className="file-container">
                            <label> Choose thumbnail picture
                                <input id="picture-file-input-area"
                                    type="file"
                                    accept="image/jpeg, image/jpg, image/png, image/gif"
                                    onChange={(e) => setThumbNailPic(e.target.files[0])}

                                />
                            </label>
                        
                        </div>
                    <div >
                        <input className="submit-button" type="submit" value="Submit" />
                        {isLoading && <p>Loading...</p>}
                    </div>
                </form>
            </div>
      
        </div>
      
    )
}
export default EditVideoForm
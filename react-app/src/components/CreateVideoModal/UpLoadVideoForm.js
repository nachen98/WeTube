import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadVideo } from "../../store/video";
import "./CreateVideo.css"

const UpLoadVideoForm = ({ setShowModal, setShowUpLoadVideo, videofile=null}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [video, setVideo] = useState(null);
    

    useEffect(() => {
        const allErrors = []

        if (video?.type !== "video/mp4" && video?.type !== "video/mkv") {
            allErrors.push("File format must be either .mp4 or .mkv")
        }
        if (video?.size > 50000000) allErrors.push("Video size is limited to 50MB.")

        setErrors(allErrors)

    }, [video])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.length > 0) setIsLoading(false) 

        //make sure that the name of the field you attach to your FormData object matches what you are looking for on the backend end (i.e. the name in formData.append("<some name>", image); 
        //should match image = request.files["<some name>"]).
        // const formData = new FormData()
        // formData.append("content", video)

        else{
            setIsLoading(true)
            setVideo(videofile)  
        } 

        // dispatch(uploadVideo(formData)).then(
        //     async (res) => {
        //         if (res && res.errors?.length > 0) {
        //             setErrors(res.errors)

        //             setIsLoading(false)
        //         } else {
        //             setShowUpLoadVideo(false)
        //             setIsLoading(false)
        //         }
        //     }
        // )

    

    }

    return (
        <div id="form-container">
            <div id="form-header">
                Upload a Video
            </div>
            <div>

                <ul>
                    {errors?.map(error => (
                        <li>{error}</li>
                    ))}
                </ul>
            </div>


            <div id="form-body">
                <form onSubmit={handleSubmit}>

                    <div id="uploadvideo-inputfield-container">
                        <div className="input-field" >
                            
                            <label for="videos" className="drop-container">
                                <span>Drop your video file here</span>
                              
                                <input
                                    type="file"
                                    placeholder="Drop your video file(.mp4 and .mkv format)"
                                    //value={video}
                                    accept="video/mp4, video/mkv"
                                    onChange={(e) => setVideo(e.target.files[0])
                                    }
                                    required
                                />
                            </label>

                        </div>
                        <div className="submit-button">
                            <button
                                type="submit"
                                disabled={!hasSubmitted && errors.length > 0}>
                               Next
                            </button>
                            {isLoading && <p>Loading...</p>}
                        </div>
                     
                    
                    </div>
                </form>
            </div>

        </div>
    )
}

export default UpLoadVideoForm;
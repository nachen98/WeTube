import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadVideo } from "../../store/video";
import "./CreateVideo.css"

const UpLoadVideoForm = ({setShowUpLoadVideo, setVideoFile, videoFile}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    //const dropContainer = document.getElementById("dropContainer")
    const fileInput = document.getElementById("fileInput")
    useEffect(() => {
        const drop = document.getElementById("dropContainer");
        if(drop!==null){
            drop.addEventListener("dragover", function (ev) {
                ev.preventDefault();
            }, false);
            
            drop.addEventListener("drop", function (ev) {
                ev.preventDefault();//取消事件的默认动作。
                const new_errors = [];
                //console.log("xxxxxxxxxx errors=", errors)
                const file=ev.dataTransfer.files[0]
                if (file?.type !== "video/mp4" && file?.type !== "video/mkv") new_errors.push("File format must be either .mp4 or .mkv")
                if (file?.size > 50000000) new_errors.push("Video size is limited to 50MB.")
                setErrors(new_errors)
                if(new_errors.length === 0 ) {
                    setVideoFile(file)
                    setShowUpLoadVideo(false)
                    //console.log("looks good @@@@@@@@@@@@@")
                }else{
                    //console.log(new_errors, "looks bad##############")
                }
    
            }, false);
        }
        

    }, [])
        
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

                    <div id="uploadvideo-inputfield-container">
                        <div className="input-field" >
                            
                            <div id="dropContainer">
                                Drop your video file here
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                placeholder="Drop your video file(.mp4 and .mkv format)"
                                //value={videoFile?.name}
                                accept="video/mp4, video/mkv"
                                
                                required
                            />
                            

                        </div>
                        <div className="submit-button">
                            <button
                                type="submit"
                                disabled={!hasSubmitted && errors.length > 0}
                                onClick={()=>setShowUpLoadVideo(true)}>
                               Next
                            </button>
                            {isLoading && <p>Loading...</p>}
                        </div>
                     
                    
                    </div>
            </div>

        </div>
    )
}

export default UpLoadVideoForm;
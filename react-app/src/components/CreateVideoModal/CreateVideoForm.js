import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadVideo } from "../../store/video";
import "./CreateVideo.css"

const CreateVideoForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const currUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailPic, setThumbNailPic] = useState(null);
    const [video, setVideo] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        const allErrors = []

        if (title.length > 255) {
            allErrors.push("The title must be less than 255 characters")
        }
        if (description?.length > 255) {
            allErrors.push("The description must be less than 255 characters.")
        }

        if (video?.type !== "video/mp4" && video?.type !== "video/mkv") {
            allErrors.push("File format must be either .mp4 or .mkv")
        }
        if (video?.size > 50000000) allErrors.push("Video size is limited to 50MB.")

        if (thumbnailPic?.type !== "image/png" && thumbnailPic?.type !== "image/gif" && thumbnailPic?.type !== "image/jpg" && thumbnailPic?.type !== "image/jpeg") {

            allErrors.push("The accepted extentions for thumbnail pictures are .png, .gif, .jpg, .jpeg.")
        }

        setErrors(allErrors)

    }, [title, description, video, thumbnailPic])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.length > 0) return;

        //make sure that the name of the field you attach to your FormData object matches what you are looking for on the backend end (i.e. the name in formData.append("<some name>", image); 
        //should match image = request.files["<some name>"]).
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("thumbnail_pic", thumbnailPic)
        formData.append("content", video)

        // console.log("formData!!!!!!!!!!!", formData)
        setIsLoading(true)

        dispatch(uploadVideo(formData)).then(
            async (res) => {
                if (res && res.errors?.length > 0) {
                    setErrors(res.errors)

                    setIsLoading(false)
                } else {
                    setShowModal(false)
                    setIsLoading(false)
                    history.push(`/channel/${currUser.username}`)
                }
            }
        )

    }

    return (
        <div id="form-container">
            <div id="form-header">
                Upload a Video
            </div>
            <div>

                <ul>
                    {errors.map(error => (
                        <li>{error}</li>
                    ))}
                </ul>
            </div>


            <div id="form-body" className="flx-col-justify-align-ctr">
                <form onSubmit={handleSubmit}>

                    <div id="uploadvideo-inputfield-container">
                        <div className="input-field" >
                    
                            <label className="custom-field">
                                <input className="title-description-input"
                                    type="text"
                                   
                                    required
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
                                    required
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
                                    placeholder="Drop your video file(.mp4 and .mkv format)"
                                    //value={video}
                                    accept="video/mp4, video/mkv"
                                    onChange={(e) => setVideo(e.target.files[0])
                                    }
                                    required
                                />
                            </label>

                        </div >
                        <div className="file-container">
                            <label> Choose thumbnail picture
                                <input id="picture-file-input-area"
                                    type="file"
                                    placeholder="Thumbnail picture(.jpg, jpeg, png, gif)"
                                    //value={thumbnailPic}
                                    accept="image/jpeg, image/jpg, image/png, image/gif"
                                    onChange={(e) => setThumbNailPic(e.target.files[0])}

                                />
                            </label>
                        
                        </div>
                        <div >
                            <button className="submit-button"
                                type="submit"
                                disabled={!hasSubmitted && errors.length > 0}>
                                Submit
                            </button>
                            {isLoading && <p>Loading...</p>}
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateVideoForm;
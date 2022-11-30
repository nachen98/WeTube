import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadVideo } from "../../store/video";
import "./CreateVideo.css"

const FillVideoInfo = ({ setShowModal, videofile }) => {
    const dispatch = useDispatch();
    const history = useHistory();

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


        if (thumbnailPic?.type !== "image/png" && thumbnailPic?.type !== "image/gif" && thumbnailPic?.type !== "image/jpg" && thumbnailPic?.type !== "image/jpeg") {

            allErrors.push("The accepted extentions for thumbnail pictures are .png, .gif, .jpg, .jpeg.")
        }

        setErrors(allErrors)

    }, [title, description, thumbnailPic])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.length > 0) return;

        //make sure that the name of the field you attach to your FormData object matches what you are looking for on the backend end (i.e. the name in formData.append("<some name>", image); 
        //should match image = request.files["<some name>"]).
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("thumbnail_pic", thumbnailPic)
        formData.append("content", videofile)

        // console.log("formData!!!!!!!!!!!", formData)
        setIsLoading(true)

        dispatch(uploadVideo(formData)).then(
            async (res) => {

                let newVideo = res
                if (res && res.errors?.length > 0) {
                    setErrors(res.errors)

                    setIsLoading(false)
                } else {
                    setShowModal(false)
                    setIsLoading(false)
                    history.push(`/videos/${newVideo.id}`)
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


            <div id="form-body">
                <form onSubmit={handleSubmit}>

                    <div id="uploadvideo-inputfield-container">
                        <div>
                            <label className="custom-field">
                                <input
                                    type="text"
                                   
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}

                                />
                                <spacn className="placeholder">Title</spacn>
                            </label>
                        </div>
                        <div>
                            <label className="custom-field">
                                <input
                                    type="text"
                                    
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <spacn className="placeholder">Description</spacn>
                            </label>

                            <label for="images" className="drop-container">
                                <span>Drop your thumbnail picture here</span>
                                <input
                                    type="file"
                                    placeholder="Thumbnail picture(.jpg, jpeg, png, gif)"
                                    //value={thumbnailPic}
                                    accept="image/jpeg, image/jpg, image/png, image/gif"
                                    onChange={(e) => setThumbNailPic(e.target.files[0])}

                                />
                            </label>

                        </div>
                        <div className="submit-button">
                            <button
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

export default FillVideoInfo;
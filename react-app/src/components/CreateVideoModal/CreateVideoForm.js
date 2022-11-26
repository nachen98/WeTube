import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadVideo } from "../../store/video";
import "./CreateVideo.css"

const CreateVideoForm = ({setShowModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const currUser = useSelector(state => state.session.user);

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailPic, setThumbNailPic] = useState(null);
    const [video, setVideo] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        const allErrors = []

        if (video?.type !== "video/mp4" && video?.type !== "video/mkv") allErrors.push("File format must be either .mp4 or .mpk")
        console.log("1video@@@@@@@@@@@@@@@@@@@@", video)

        if (video?.size > 50000000) allErrors.push("Video size is limited to 50MB.")
        console.log("2video@@@@@@@@@@@@@@@@@@@@", video?.size, allErrors)
        if (thumbnailPic?.type !== "image/png" && thumbnailPic?.type !== "image/gif" && thumbnailPic?.type !== "image/jpg" && thumbnailPic?.type !== "image/jpeg") {

            allErrors.push("The accepted extentions for thumbnail pictures are .png, .gif, .jpg, .jpeg.")
        }
        console.log("3video@@@@@@@@@@@@@@@@@@@@", video)
        setErrors(allErrors)

    }, [video, thumbnailPic])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("errors@@@@@@@@@@@@@@@@@@@@", errors)
        if(errors.length>0) return;

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("thumbnail_pic", thumbnailPic)
        formData.append("content", video)
        //const formData =  {"title": title, "description": description, "thumbnailPic": thumbnailPic, "content": video}
        //console.log("title************", title, description, thumbnailPic)
        console.log('formData!!!!!!!!!', formData)
        setIsLoading(true)

        dispatch(uploadVideo(formData)).then(
            async (res) => {
                console.log(res, "res#################")
                let newVideo = res
                if (res && res.errors?.length>0) {
                    setErrors(res.errors)
                    console.log(errors, "ERRORS~~~~~~~~~~~~~~~~~~~")
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
                Upload a Video:
                <ul>
                    {errors.map(error => (
                        <li>{error}</li>
                    ))}
                </ul>
            </div>

            <div id="form-body">
                <form onSubmit={handleSubmit}>

                    <div id="uploadvideo-inputfield-container">
                        <div className="input-field">
                            <label>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}

                                />
                            </label>
                            <label> Drop your file here
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
                            <label>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>

                            <label>
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

export default CreateVideoForm;
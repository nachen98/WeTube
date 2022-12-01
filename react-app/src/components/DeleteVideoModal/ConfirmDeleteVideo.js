import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteVideo } from "../../store/video"
import "./ConfirmDeleteVideo.css"
// why cann't it be arrow function
//export default ConfirmDeleteVideo = ({ videoId, setShowVideoDeleteModal }) => {
export function ConfirmDeleteVideo({ videoId, setShowVideoDeleteModal }) {

    const dispatch = useDispatch()
    const history = useHistory()

    const deleteVideoButton = async (e) => {

        e.preventDefault();
        await dispatch(deleteVideo(videoId))
        history.push('/')
    }

    const cancelDeleteButton = async (e) => {
        e.preventDefault()
        setShowVideoDeleteModal(false)
    }

    return (
        <div className="delete-modal-container">
            <div className="delete-header">
                Delete Video
            </div>
            <div className="delete-messages">
                Delete your video permanently?
            </div>
            <div className="confirm-delete-comments-buttons flx-row-end">
                <button className="cancel-delete-comment-and-video" onClick={cancelDeleteButton}>Cancel</button>
                <button  className="confirm-delete-comment-and-video" onClick={deleteVideoButton}>Delete</button>

            </div>
        </div>

    )
}

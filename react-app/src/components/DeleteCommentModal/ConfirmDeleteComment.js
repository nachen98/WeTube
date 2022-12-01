import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeComment } from "../../store/comment"
import "./ConfirmDeleteComment.css"

function ConfirmDeleteComment({ commentContent, setShowCommentDeleteModal }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { videoId } = useParams()


    const deleteCommentButton = async (e) => {
        e.preventDefault();

        await dispatch(removeComment(commentContent.id))
        setShowCommentDeleteModal(false)
        history.push(`/videos/${videoId}`)
    }

    const cancelDeleteButton = async (e) => {
        e.preventDefault()
        setShowCommentDeleteModal(false)
    }

    return (
        <div className="delete-modal-container">
            <div className="delete-header">
                Delete comment
            </div>
            <div className="delete-messages">
                Delete your comment permanently?
            </div>
            <div className="confirm-delete-comments-buttons flx-row-end">
                <button id="cancel-delete-comment" onClick={cancelDeleteButton}>Cancel</button>
                <button id="confirm-delete-comment" onClick={deleteCommentButton}>Delete</button>
            </div>

        </div>
    )


}

export default ConfirmDeleteComment
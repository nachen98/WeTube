import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeComment } from "../../store/comment"
import "./DeleteComment.css"

function DeleteCommentForm( {commentContent, showCommentDeleteModal, setShowCommentDeleteModal}){
    const dispatch = useDispatch()
    const history = useHistory()
    const {videoId} = useParams()


    const deleteCommentButton = async (e) => {
        e.preventDefault();
        await dispatch(removeComment(commentContent.id))
        setShowCommentDeleteModal(false)
        history.push(`/videos/${videoId}`)
    }

    const cancelDeleteButton = async (e)=>{
        e.preventDefault()
        setShowCommentDeleteModal(false)
    }

    return (
        <div id="delete-modal-container">
             <div id="delete-header">
            Delete comment
            </div>
            <div>
            Delete your comment permanently?
            </div>
            
            <button onClick={cancelDeleteButton}>Cancel</button>
            <button onClick={deleteCommentButton}>Delete</button>
        

        </div>
    )

    
}

export default DeleteCommentForm
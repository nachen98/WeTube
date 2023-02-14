import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateComment.css"
import { useParams } from "react-router-dom";
import { addComment, editComment } from "../../store/comment";
import { getOneVideo } from "../../store/video";
import { getProfileIcon } from "../../util/helper";


export function CreateCommentForm({ videoId, commentId, content, placeholder, buttonName, setEditable }) {
    const dispatch = useDispatch()

    const hidden = "display-none"
    const currUser = useSelector(state => state.session.user)
    const [comment, setComment] = useState(content)
    const [disabled, setDisabled] = useState(true)
    const [errors, setErrors] = useState([])


    const handleCancel = (e) => {
        e.preventDefault()
        setComment("")
        if (setEditable !== undefined) setEditable(false)
        document.getElementById(`buttons_${buttonName}`).className = hidden
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (errors.length > 0) return
        document.getElementById(`buttons_${buttonName}`).className = hidden
        if (commentId > 0) {
            await dispatch(editComment(commentId, comment))
                .then(() => dispatch(getOneVideo(videoId)))
                .then(() => setEditable(false))

        } else {
            await dispatch(addComment(videoId, comment))
                .then(() => dispatch(getOneVideo(videoId)))
                .then(() => setComment(""))
        }



        // dispatch (addComment(videoId, comment)).then(
        //     async(res) => {
        //         if(res && res.errors){
        //             setErrors(res.errors);
        //         } else {
        //             dispatch(getOneVideo(videoId))

        //         }
        //     }
        // )
    }

    useEffect(() => {

        if (comment.trim().length >= 1 && comment.length < 255) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }

    }, [comment])



    useEffect(() => {
        let validationErrors = []
        if (comment.length > 255) validationErrors.push("Comment is at most 255 characters")

        setErrors(validationErrors)

    }, [comment])


    return (
        <div className="post-comment-form-container flx-col-start">
            {errors.length ? <div id="comment-error-messages">{errors}</div> : null}
            <div className="create-comment-container flx-row-start">
                <div className="comment-maker-icon" >
                    {getProfileIcon(currUser)}
                </div>


                <form className="comment-input-container flx-col-just-align-flex-start">


                    <input
                        type="text"
                        className="comment-input"
                        value={comment}
                        onFocus={() => { document.getElementById(`buttons_${buttonName}`).className = "" }}
                        placeholder={placeholder}
                        onChange={(e) => setComment(e.target.value)}
                    />
        
                    <div className="comment-buttons-container flx-row-end">
                        <div id={`buttons_${buttonName}`} className={commentId === 0 ? "display-none" : ""}>
                        <button type="submit" id="cancel-button" onClick={handleCancel}>Cancel</button>
                        <button type="submit" id="submit-button" disabled={disabled} onClick={handleSubmit}>{buttonName}</button>
                        </div>
                    </div>
                </form>

            </div>
        </div >
    )
}

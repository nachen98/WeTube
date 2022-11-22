import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EditComment.css"
import { useParams } from "react-router-dom";
import { editComment } from "../../store/comment";
import { getOneVideo } from "../../store/video";
import { getProfileIcon } from "../../util/helper";

export function EditComment( {commentContent }){
    const {commentId} = useParams()
    const dispatch = useDispatch()
    const oldContent = commentContent.content
    const hidden="display-none"
    const currUser = useSelector(state=> state.session.user)

    const [comment, setComment] = useState("")
    const [disabled, setDisabled] = useState(true)

    const handleCancel=(e)=> {
        e.preventDefault()
        setComment("")
        document.getElementById("_buttons_").className=hidden
    }
    const handleSubmit = (e)=> {
        e.preventDefault()
        
        dispatch(editComment(commentId, comment))
             .then(()=>dispatch(getOneVideo(commentContent.video.id)))
        
        setComment("")
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

    useEffect(()=> {

        if(comment.trim().length >= 1){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }
    }, [comment])

   
    return(
        <div id="form-container">
            <div >
                    {getProfileIcon(currUser)}
            </div>
            <div id="comment-content">
                <form>
                    <input
                        type="text"
                        value={comment}
                        onFocus={()=>{document.getElementById("_buttons_").className=""}}
                        placeholder={oldContent}
                        onChange={(e)=> setComment(e.target.value)}
                    />
                    <div id="_buttons_" className="">
                        <button type="submit" disabled={disabled} onClick={handleSubmit}>SAVE</button>
                        <button type="submit"  onClick={handleCancel}>CANCEL</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}
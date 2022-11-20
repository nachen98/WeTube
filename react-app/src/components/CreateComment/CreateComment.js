import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateComment.css"
import { useParams } from "react-router-dom";
import { addComment } from "../../store/comment";
import { getOneVideo } from "../../store/video";
import { getProfileIcon } from "../../util/helper";

export function CreateCommentForm(){
    const {videoId} = useParams()
    const dispatch = useDispatch()
    
    const hidden="display-none"
    const currUser = useSelector(state=> state.session.user)

    const [comment, setComment] = useState("")
    const [disabled, setDisabled] = useState(true)

    const handleCancel=(e)=> {
        e.preventDefault()
        setComment("")
        document.getElementById("buttons_").className=hidden
    }
    const handleSubmit = (e)=> {
        e.preventDefault()
        
        dispatch(addComment(comment,videoId))
            .then(()=>dispatch(getOneVideo(videoId)))
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
                        onFocus={()=>{document.getElementById("buttons_").className=""}}
                        placeholder="Add a comment..."
                        onChange={(e)=> setComment(e.target.value)}
                    />
                    <div id="buttons_" className="display-none">
                        <button type="submit" disabled={disabled} onClick={handleSubmit}>COMMENT</button>
                        <button type="submit"  onClick={handleCancel}>CANCEL</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

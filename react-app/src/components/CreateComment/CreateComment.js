import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateComment.css"
import { useParams } from "react-router-dom";
import { addComment, editComment } from "../../store/comment";
import { getOneVideo } from "../../store/video";
import { getProfileIcon } from "../../util/helper";


export function CreateCommentForm({videoId, commentId, content, placeholder, buttonName, setEditable}){
    const dispatch = useDispatch()
    
    const hidden="display-none"
    const currUser = useSelector(state=> state.session.user)
    const [comment, setComment] = useState(content)
    const [disabled, setDisabled] = useState(true)

    const handleCancel=(e)=> {
        e.preventDefault()
        setComment("")
        if(setEditable !== undefined) setEditable(false)
        document.getElementById(`buttons_${buttonName}`).className=hidden
    }
    const handleSubmit = (e)=> {
        e.preventDefault()
        document.getElementById(`buttons_${buttonName}`).className=hidden
        if(commentId>0){
            dispatch(editComment(commentId, comment))
             .then(()=>dispatch(getOneVideo(videoId)))
             .then(()=>setEditable(false))

        }else{
            dispatch(addComment(videoId, comment))
             .then(()=>dispatch(getOneVideo(videoId)))
             .then(()=>setComment(""))
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
                        onFocus={()=>{document.getElementById(`buttons_${buttonName}`).className=""}}
                        placeholder={placeholder}
                        onChange={(e)=> setComment(e.target.value)}
                    />
                    <div id={`buttons_${buttonName}`} className={commentId===0?"display-none":""}>
                        <button type="submit"  onClick={handleCancel}>Cancel</button>
                        <button type="submit" disabled={disabled} onClick={handleSubmit}>{buttonName}</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}
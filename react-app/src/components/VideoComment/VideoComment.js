import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './VideoComment.css'
import { useParams } from "react-router-dom";
import { getProfileIcon } from "../../util/helper";
import { formatDate } from "../../util/helper";
import { timeDifference } from "../../util/helper";

export function VideoComment({commentContent}){
    console.log("content!!!!!!!!!!", commentContent)
    const {videoId} = useParams()
    const dispatch = useDispatch()
    const currUser = useSelector(state=>state.session.user)

    const current = new Date()
    
    const uploadedTime = new Date(formatDate(commentContent.created_at))

    const formatedTime = timeDifference(current, uploadedTime)

    return (
        <div id="comment-container">
            <div id="individual-comment">
                <div id="profile-icon">

                    {getProfileIcon(commentContent.user)}
                </div>

                <div id="comment-username">
                    {commentContent.user.username}
                </div>

                <div id="posted-time">
                    {formatedTime}

                </div>

                <div id="comment-content">
                    {commentContent.content}
                </div>
            </div>

        </div>
    )
}

import React from "react"
import './SingleVideo.css';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteVideo, getOneVideo } from '../../store/video';
import { getAllComments } from '../../store/comment';
import ReactPlayer from "react-player"
import { getProfileIcon } from "../../util/helper"
import { CreateCommentForm } from "../CreateComment/CreateComment";
import {VideoComment} from "../VideoComment/VideoComment";
import { currUserIsOwner } from "../../util/helper";

export function SingleVideo(){
    const {videoId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory()

    const videos = useSelector(state => state.videosReducer)
    const video = videos[videoId]
    
    
    const currUser = useSelector(state => state.session.user)
    
    const comments = useSelector(state => state.commentsReducer)

    
    const commentContents = Object.values(comments.video)
    const numComments = commentContents.length
    const playerRef = React.useRef(null)
    
    useEffect(()=>{
        dispatch(getOneVideo(videoId))
        dispatch(getAllComments(videoId))
    }, [videoId])

    let currUserIsOwner = (video && currUser && "id" in currUser && currUser.id === video.user.id);

    const deleteVideoButton = async (e) => {
        e.preventDefault();
        await dispatch(deleteVideo(videoId))
        history.push('/')
    }
    if (!video || Object.keys(video).length === 0) return <div>waiting...</div>
    
    return (
        <div className="player-wrapper">
            <ReactPlayer
                className="react-player"
                ref={playerRef}
                url={video.url}
                controls={true}
            />
                <div id="video-title">
                    {video.title}
                </div>
                
                <div>
                    {getProfileIcon(video.user)}
                </div>
                <div id="video-description">
                    {video.description}
                </div>
                <div id="num-comments">
                    {numComments} Comments
                </div>

               

                {!!currUser && !currUserIsOwner &&(
                    <CreateCommentForm videoId={videoId} commentId={0} content="" placeholder="Add a comment..." buttonName="Comment"/>
                )}
                
                <div id="comment-outer-container">
                    {commentContents.map(commentContent=> {
                        return (<VideoComment key={commentContent.id} commentContent={commentContent}/>)
                    })}
                </div>

                {/* <div id="side-videos"> 
                    <SideVideos/>
                </div>  */}
        </div>
    )
}
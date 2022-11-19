
import React from "react"
import './SingleVideo.css';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteVideo, getOneVideo } from '../../store/video';
import { getAllComments } from '../../store/comment';
import ReactPlayer from "react-player"
import { getProfileIcon } from "../../util/helper"

export function SingleVideo(){
    const {videoId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const videos = useSelector(state => state.videosReducer)
    const video = videos[videoId]
    console.log('onevideo!!!!!!!!!!!', video, videos)
    const currUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.commentsReducer)
    const playerRef = React.useRef(null)
    
    const numComments = comments.length()
    console.log("number of comments!!!!!!!!!", numComments)
    const commentsBody = Object.values(comments)
    useEffect(()=>{
        dispatch(getOneVideo(videoId))
        dispatch(getAllComments())
    }, [])

    let currUserIsOwner = false;
    console.log(currUser, "$$$$$$$$$$$$$$")
    console.log(video, "&&&&&&&&&&&&&&&&&")
    if (!(video===null || video===null)) currUserIsOwner = true;

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
                url={video.body}
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

                <div id="profile-icon">
                    {getProfileIcon(currUser)}
                </div>

                {!currUserIsOwner && (
                    <CreateCommentFrom videoId = {videoId}/>
                )}

                <div id="side-videos"> 
                    <SideVideos/>
                </div>
        </div>
    )
}
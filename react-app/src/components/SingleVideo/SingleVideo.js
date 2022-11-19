
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
    const dispatch = useDispatch;
    const history = useHistory()
    const videos = useSelector(state => state.videosReducer)
    const video = videos[videoId]
    console.log('onevideo!!!!!!!!!!!', video)
    const currUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.commentsReducer)
    const playerRef = React.useRef(null)
    
    const commentsBody = Object.values(comments)

    useEffect(()=>{
        dispatch(getOneVideo(videoId))
        //dispatch(getAllComments())
    }, [dispatch, videoId])

    let currUserIsOwner = false;
    if (currUser && "id" in currUser && currUser.id === video.userId) currUserIsOwner = true;

    const deleteVideoButton = async (e) => {
        e.preventDefault();
        await dispatch(deleteVideo(videoId))
        history.push('/')
    }
    if (Object.keys(video).length === 0) return null

    
    return (
        <div className="player-wrapper">
            <ReactPlayer
                className="react-player"
                ref={playerRef}
                url={video.body}
                light={video.thumbnail_pic}
                width="100%"
                height="100%"
                playing
                playIcon={<button>Play</button>}
                controls={true}
            />
             
                <div>
                    {getProfileIcon(video.user)}
                </div>
                <div id="video-title">
                        {video.title}
                </div>
        </div>
    )
}
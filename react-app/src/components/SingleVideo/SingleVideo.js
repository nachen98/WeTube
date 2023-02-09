
import React from "react"
import './SingleVideo.css';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteVideo, getOneVideo } from '../../store/video';
import { getAllComments } from '../../store/comment';
import ReactPlayer from "react-player"
import { getProfileIcon } from "../../util/helper"
import { CreateCommentForm } from "../CreateComment/CreateComment";
import { VideoComment } from "../VideoComment/VideoComment";
import EditVideoModal from "../EditVideoModal";
import DeleteVideoModal from "../DeleteVideoModal"
import { SideVideos } from "../SideVideos/SideVideos"
import { VideoLikeDislike } from "../VideoLikeDislike/VideoLikeDislike";
import { getCurrUserSubscription, subscribeToUser, unsubscribeToUser } from "../../store/subscription";



export function SingleVideo() {
    const { videoId } = useParams();
    const dispatch = useDispatch();


    const [showVideoDeleteModal, setShowVideoDeleteModal] = useState(false)

    const [video, setVideoData] = useState({})
    const [currUserSubscriptions, setCurrUserSubscriptions] = useState([])
    const [uploaderId, setUploaderId] = useState(0)

    const [numSubscribers, setNumSubscribers] = useState(0)

    const currUser = useSelector(state => state.session.user)

    const comments = useSelector(state => state.commentsReducer)

    // const currUserSubscriptions = useSelector(state => state.subscriptionReducer.subscriptions)
    //console.log('$$$$$$$$$$$$$$$currUserSubscrptions', currUserSubscriptions)

    const commentContents = Object.values(comments.video)

    const numComments = commentContents.length

    const playerRef = React.useRef(null)


    useEffect(() => {

        dispatch(getOneVideo(videoId)).then(
            (res) => {
                setVideoData(res);

                setNumSubscribers(res.user.subscribed_by)
                setUploaderId(res.user.id)
            })
        dispatch(getAllComments(videoId))
        if (!!currUser) {

            dispatch(getCurrUserSubscription(currUser.id)).then(
                (res) => setCurrUserSubscriptions(res)
            )
        }
    }, [videoId, numSubscribers])


    let currUserIsOwner = (video && currUser && "id" in currUser && currUser.id === video?.user?.id);

    if (!video || Object.keys(video).length === 0) return <div>waiting...</div>

    return (
        <div id="single-video-page-outer-container">
            <div className="video-comment-container">
                <div id="player-container" className="player-wrapper">
                    <ReactPlayer
                        id="single-video-player"
                        className="react-player"
                        ref={playerRef}
                        url={video.url}
                        controls={true}
                        width="95%"
                        height="auto"
                    />
                    <div className="video-description-component">


                        <div className="flx-row-space-btw">
                            <div id="video-title">
                                {video.title}
                            </div>
        
                        </div>
                        <div className='video-user-like flx-row-space-btw'>
                            <div className="uploader-subscription flx-row-space-around">
                                <div className="video-uploader-info flx-row-space-btw">
                                    {getProfileIcon(video.user)}
                                    <div className="video-uploader-name-subscribers">
                                        <div className="video-uploader-name">

                                            {video.user.first_name} {video.user.last_name}
                                        </div>
                                        <div className="number-of-subscribers">
                                            {numSubscribers} {numSubscribers == 1 ? 'subscriber' : 'subscribers'}

                                        </div>
                                    </div>
                                </div>
                                <div className="subscribe-unsubscribe-buttons">
                                    {!!currUser && !currUserIsOwner && (
                                        <>
                                            {currUserSubscriptions.includes(uploaderId) ?
                                                <button className="unsubscribe-button"
                                                    onClick={() => {
                                                        dispatch(unsubscribeToUser(uploaderId))
                                                        setNumSubscribers(numSubscribers - 1)
                                                    }
                                                    }
                                                >
                                                    Unsubscribe
                                                </button>
                                                :
                                                <button className="subscribe-button"
                                                    onClick={() => {
                                                        dispatch(subscribeToUser(uploaderId))
                                                        setNumSubscribers(numSubscribers + 1)
                                                    }
                                                    }
                                                >
                                                    Subscribe
                                                </button>
                                            }
                                        </>
                                    )}
                                </div>
                            </div>





                            <div className="video-like-dislike-section flx-row-space-btw">
                                <VideoLikeDislike videoId={videoId} />

                            </div>
                        </div>

                        <div id="video-description">
                            {video.description}
                        </div>
                        <div id="num-comments">
                            {numComments} Comments
                        </div>



                        {!!currUser && !currUserIsOwner && (
                            <CreateCommentForm videoId={videoId} commentId={0} content="" placeholder="Add a comment..." buttonName="Comment" />
                        )}

                        <div id="comment-outer-container">
                            {commentContents.map(commentContent => {
                                return (<VideoComment key={commentContent.id} commentContent={commentContent} />)
                            })}
                        </div>


                    </div>
                </div>
            </div>


            <div id="side-videos">
                <SideVideos />
            </div>

        </div>
    )
}
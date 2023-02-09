import React from "react"
import './VideoLikeDislike.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { postVideoLike } from "../../store/videolike";
import { getAllLikes } from "../../store/videolike";

export function VideoLikeDislike({ videoId }) {
    const dispatch = useDispatch();
    const videos = useSelector(state => state.videosReducer)
    const video = videos[videoId]
    const [numLikes, setNumLikes] = useState(video.video_likes)

    const currUser = useSelector(state => state.session.user)

    let [like, setLike] = useState(undefined)
    const [thumbUpClick, setThumbUpClick] = useState('fa-regular fa-thumbs-up fa-xl')
    const [thumbDownClick, setThumbDownClick] = useState('fa-regular fa-thumbs-down fa-xl')


    //console.log("############################# like", like)


    //the useEffect below is to 初始化一些值， 在页面on mount的时候，拿到数据库里面已有的is_like的值，一开始如果没有like or dislike,
    //videoLikes is empty. so we set it to 0 if is_like is undefined. Then if it's already beenliked, we set the thumb up to solid
    //since _like only has two values either 1 or 0 so we can do ternary. 
    useEffect(async () => {
        setLike(undefined)
        setNumLikes(video.video_likes)
        if (currUser === null)
            return

        //res in the .then() is the same as the allLikes in the thunk of getAllLikes
        await dispatch(getAllLikes(videoId))
            .then((res) => {
                const _like = res[`${video.id}-${currUser.id}`]?.is_like

                setLike(_like === undefined ? 0 : _like)
                setThumbUpClick(_like === 1 ? 'fa-solid fa-thumbs-up fa-xl' : 'fa-regular fa-thumbs-up fa-xl')
                setThumbDownClick(_like === -1 ? 'fa-solid fa-thumbs-down fa-xl' : 'fa-regular fa-thumbs-down fa-xl')
            })
    }, [videoId])


    const update = async (like_) => {
        //console.log("$$$$$$$$$$$$$ like use effect", like_)
        await dispatch(postVideoLike(videoId, like_))
        setThumbUpClick(like_ === 1 ? 'fa-solid fa-thumbs-up fa-xl' : 'fa-regular fa-thumbs-up fa-xl')
        setThumbDownClick(like_ === -1 ? 'fa-solid fa-thumbs-down fa-xl' : 'fa-regular fa-thumbs-down fa-xl')
    }


    //below is the button onClick functions. if the video is already liked (meaning if like === 1), we'd set Like to 0,
    //then call the update function which triger dispatch to post the new like, 
    const likeButton = async () => {
        //console.log("--------------------- like", like)
        if (!currUser)
            alert('Like this video? Please sign in to make your opinion count.')
        else if (like === 1) {
            setLike(0)
            update(0)
            setThumbUpClick('fa-regular fa-thumbs-up fa-xl')


            setNumLikes(numLikes - 1)

        } else if (like === -1) {
            setLike(1)
            update(1)
            setThumbUpClick('fa-solid fa-thumbs-up fa-xl')
            setThumbDownClick('fa-regular fa-thumbs-down fa-xl')

            setNumLikes(numLikes + 1)

        }

        else if (like === 0) {
            setLike(1)
            update(1)
            setThumbUpClick('fa-solid fa-thumbs-up fa-xl')
            setNumLikes(numLikes + 1)
            // if (thumbDownClick === 'fa-solid fa-thumbs-down fa-xl') setThumbDownClick('fa-regular fa-thumbs-down fa-xl')
        }
    }
    const dislikeButton = async () => {

        if (!currUser) alert('Dislike this video? Please sign in to make your opinion count.')
        else if (like === 0) {
            setLike(-1)
            update(-1)
            setThumbDownClick('fa-solid fa-thumbs-down fa-xl')


        } else if (like === 1) {
            setLike(-1)
            update(-1)
            setThumbDownClick('fa-solid fa-thumbs-down fa-xl')
            setThumbUpClick('fa-regular fa-thumbs-up fa-xl')

            setNumLikes(numLikes - 1)
        }


        else if (like === -1) {
            setLike(0)
            update(0)
            setThumbDownClick('fa-regular fa-thumbs-down fa-xl')

        }
    }


    return (
        <>
            <div id="like-button" onClick={likeButton}>

                <i className={thumbUpClick} id="thumb-up-icon"></i>

                <span id="likes-count">{numLikes}</span>
            </div>

            <div id='likes-dislikes-spacer'></div>
            <div id="dislike-button" onClick={dislikeButton}>
               
                    <i className={thumbDownClick} id="thumb-down-icon"></i>

            </div>


        </>

    )
}





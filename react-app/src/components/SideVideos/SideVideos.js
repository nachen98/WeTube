import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VideoCards } from '../VideoCards/VideoCards';
import { getAllVideos } from '../../store/video';
import "./SideVideos.css"

export function SideVideos() {
    const { videoId } = useParams()
    const dispatch = useDispatch();

    const [hasLoaded, setHasLoaded] = useState(false)
    const videosList = useSelector(state => state.videosReducer)
    //console.log('videoList@@@@@@@@@@@@', videosList)
    const allVideos = Object.values(videosList)
    //console.log("allVideos!!!!!!!!!!!!!!", allVideos)
    const displayedVideos = allVideos.filter((video) => video.id !== Number(videoId))
        .map((video) => ({video, "sort": Math.random()}))
        .sort((a,b)=>a.sort - b.sort)
        .map(({video}) => video)
    
    useEffect(async () => {
        await dispatch(getAllVideos())
            .then(() => setHasLoaded(true))
    }, [dispatch])

    if (!displayedVideos) return null;

    return (

        <>
            {displayedVideos.map((video) => (
                <div id='sidevideos-inner-container'>
                    <VideoCards key={video.id} video={video} />
                </div>
            ))}
        </>

    )

}


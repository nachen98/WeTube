import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VideoCards } from '../VideoCards/VideoCards';
import { getAllVideos } from '../../store/video';
import "./SideVideos.css"

export function SideVideos() {
    // const { videoId } = useParams()
    // const dispatch = useDispatch();

    // const [hasLoaded, setHasLoaded] = useState(false)
    // const videosList = useSelector(state => state.videosReducer)
    // //console.log('videoList@@@@@@@@@@@@', videosList)
    // const allVideos = Object.values(videosList)
    // //console.log("allVideos!!!!!!!!!!!!!!", allVideos)
    // const displayedVideos = allVideos.filter((video) => video.id !== Number(videoId))
    //     .map((video) => ({video, "sort": Math.random()}))
    //     .sort((a,b)=>a.sort - b.sort)
    //     .map(({video}) => video)
    
    // useEffect(async () => {
    //     await dispatch(getAllVideos())
    //         .then(() => setHasLoaded(true))
    // }, [dispatch])

    // if (!displayedVideos) return null;

    const [videos, setVideos] = useState([]);
    const { videoId } = useParams()
    const dispatch = useDispatch();
    

    useEffect(async()=>{
        await dispatch(getAllVideos())
        .then((videosList)=>{
            console.log("#################################### videoList", videosList)
            const displayedVideos = videosList.Videos.filter((video)=>video.id !== Number(videoId))
            const tmp = displayedVideos.map((video) =>
            ({video, "sort": Math.random()}))
            .sort((a,b)=>a.sort - b.sort)
            .map(({video}) => video)
        
        setVideos(tmp)
        })
    }, [videoId])

    if (!videos) return null;
    return (

        <>
            {videos.map((video) => (
                <div id='sidevideos-inner-container'>
                    <VideoCards key={video.id} video={video} />
                </div>
            ))}
        </>

    )

}


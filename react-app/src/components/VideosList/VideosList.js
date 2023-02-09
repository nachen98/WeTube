import { useEffect } from 'react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideos } from '../../store/video';
import { VideoCards } from '../VideoCards/VideoCards';
import "./VideosList.css"
const VideosList = () => {
    const dispatch = useDispatch();
    const [videos, setVideos] = useState([]);
    
    useEffect(async ()=>{
        await dispatch(getAllVideos())
        .then((videosList)=>{
            //console.log("eeeeeeeeeeeeeeeeeeeeeee", videosList)
            const tmp = videosList.Videos.map((video) =>
                ({video, "sort": Math.random()}))
            .sort((a,b)=>a.sort - b.sort)
            .map(({video}) => video)
            
            setVideos(tmp)
        })
    }, [dispatch])

    if(!videos) return null;

    return (
        <div id='videoslist-container'>
            
        {videos.map((video) => (
            <div id='videolist-inner-container'>
                <VideoCards key={video.id} video={video} />
            </div>
        ))}

        </div>
    )
}
export default VideosList
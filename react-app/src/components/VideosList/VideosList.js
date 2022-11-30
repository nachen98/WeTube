import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideos } from '../../store/video';
import { VideoCards } from '../VideoCards/VideoCards';
import "./VideosList.css"
const VideosList = () => {
    const dispatch = useDispatch();
    const videosList = useSelector(state=> state.videosReducer)
    // console.log("videoList!!!!!!!!!!!!!", videosList)
    const videos = Object.values(videosList)
        .map((video) => ({video, "sort": Math.random()}))
        .sort((a,b)=>a.sort - b.sort)
        .map(({video}) => video)
    

    useEffect(()=>{
        dispatch(getAllVideos())
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
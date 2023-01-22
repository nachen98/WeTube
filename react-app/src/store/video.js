const GET_ALL_VIDEOS = '/videos/getAllVideos';
const GET_ONE_VIDEO_BY_ID = 'videos/getOneVideo';
const CREATE_ONE_VIDEO = 'videos/createOneVideo';
const UPDATE_ONE_VIDEO = 'videos/updateOneVideo';
const DELETE_ONE_VIDEO = 'videos/deleteOneVideo';

const loadVideos = (videos) => {
    return {
        type: GET_ALL_VIDEOS,
        videos
    }
}

const loadOneVideo = (video) => {
    return {
        type: GET_ONE_VIDEO_BY_ID,
        video
    }
}

const createOneVideo = (video)=> {
    return {
        type: CREATE_ONE_VIDEO,
        video
    }
}

const updateOneVideo = (video) => {
    return {
        type: UPDATE_ONE_VIDEO,
        video
    }
}

const deleteOneVideo = (videoId) => {
    return {
        type: DELETE_ONE_VIDEO,
        videoId
    }
}

//thunk action creator
//In the reducer, the videos from action.videos is what's coming back from the response.json() aka videos.

export const getAllVideos = () => async(dispatch) => {
    const response = await fetch('/api/videos/')
    .catch(res=> res)
    
    if(response.ok){
        const videos=await response.json()
        
        await dispatch(loadVideos(videos))
        return videos
    }
}

export const getOneVideo = (videoId) => async(dispatch) => {
    const response = await fetch(`/api/videos/${videoId}`)
    .catch(res=>res)

    if (response.ok){
        const oneVideo = await response.json()
        await dispatch(loadOneVideo(oneVideo))
        return oneVideo
    }
    return undefined
}

// when uploading to aws, note that you must NOT set the Content-Type header on your request. 
//If you leave the Content-Type field blank, the Content-Type will be generated and set correctly by your browser
// (check it out in the network tab!). If you include Content-Type, your request will be missing information and your Flask backend will be unable to locate the attached files.
export const uploadVideo = (video) => async(dispatch) => {
    
    const response = await fetch (`/api/videos/upload-video`, { 
        method: "POST",
        body: video

    }).catch(res=>res)
    if(response.ok){
        const newVideo = await response.json()
        await dispatch(createOneVideo(newVideo))
        return newVideo
    }else {
        const result = await response.json()
        return result
    }
}


export const updateVideo = (videoBody, videoId) => async(dispatch)=> {
    const response = await fetch(`/api/videos/${videoId}/update-video`, {
        method: "POST",
        body: videoBody
    }).catch(res=>res)

    if(response.ok){
        const updatedVideo = await response.json()
        await dispatch(updateOneVideo(updatedVideo))
        return updatedVideo
    }else{
        const result = await response.json()
        return result
    }
}

export const deleteVideo = (videoId) => async(dispatch)=>{
    const response = await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE'
    });
    if(response.ok){
        await dispatch(deleteOneVideo(videoId))
    }
}

const initialState={}
//reducer
const videosReducer = (state=initialState, action) => {
    let newState= {...state}
    switch(action.type){
        case GET_ALL_VIDEOS:
            //see above thunk creator for explaination of this part, Videos is from the video route {"Videos": data} this way
            //action.videos.Videos is all the information of the videos. 
            console.log("action.videos!!!!!!!!!!!!!!!!!!", action.videos)
            action.videos.Videos.forEach((video)=>newState[video.id] = video)
            console.log("##########")
            //console.log("newState!!!!!!!!!!!!!!!!!!", newState)
            return newState;
        
        case GET_ONE_VIDEO_BY_ID:
       
            newState[action.video.id]= action.video
            return newState;
        
        case CREATE_ONE_VIDEO:
            newState[action.video.id] = action.video
            return newState;
        
        case UPDATE_ONE_VIDEO:
            newState[action.video.id] = action.video
            return newState;
        
        case DELETE_ONE_VIDEO:
            delete newState[action.videoId]
            return newState
        
        default:
            return state
    }
}

export default videosReducer;
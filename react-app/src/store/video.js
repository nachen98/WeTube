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
export const getAllVideos = () => async(dispatch) => {
    const response = await fetch('/api/videos')
    console.log("response!!!!!!!!!!!", response)
    if(response.ok){
        const videos=await response.json()
        console.log('videos!!!!!!!!!!!!!', videos)
        dispatch(loadVideos(videos))
    }
}

export const getOneVideo = (videoId) => async(dispatch) => {
    const response = await fetch(`/api/videos/${videoId}`)
    .catch(res=>{
        console.log("errror", res)
        return res
    })
    if (response.ok){
        const oneVideo = await response.json()
        dispatch(loadOneVideo(oneVideo))
    }
}

export const addVideo =(videoBody, user) => async(dispatch) => {
    const response = await fetch (`/api/videos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(videoBody)

    }).catch(res=>res)

    if(response.ok){
        const newVideo = await response.json()
        dispatch(createOneVideo(newVideo))
        return newVideo
    }else {
        const result = await response.json()
        return result
    }
}

export const updateVideo = (videoBody, videoId) => async(dispatch)=> {
    const response = await fetch(`/api/videos/${videoId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(videoBody)
    }).catch(res=>res)

    if(response.ok){
        const updatedVideo = await response.json()
        dispatch(updateOneVideo(updatedVideo))
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
        dispatch(deleteOneVideo(videoId))
    }
}

const initialState={}
//reducer
const videosReducer = (state=initialState, action) => {
    let newState= {...state}
    switch(action.type){
        case GET_ALL_VIDEOS:
            action.videos.Videos.forEach((video)=>newState[video.id] = video)
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
const GET_ALL_VIDEO_LIKES = '/videolikes/getAllLikes';

const CREATE_VIDEO_LIKE = 'videolikes/createOneLike';
const REMOVE_VIDEO_LIKE = 'videolikes/removeOneLike'

const loadVideoLikes = (likes) => {
    return {
        type: GET_ALL_VIDEO_LIKES,
        likes
    }
}

const createVideoLike = (like)=> {
    return {
        type:  CREATE_VIDEO_LIKE,
        like
    }
}

const deleteOneLike = (likeId) => {
    return {
        type: REMOVE_VIDEO_LIKE,
        likeId
    }
}

//thunk action creator
export const getAllLikes = (videoId) => async(dispatch) => {
    const response = await fetch(`/api/videos/${videoId}/likes`)

    if(response.ok){
        const likes = await response.json()
        dispatch(loadVideoLikes(likes))
        return null;
    } else{
        return response
    }
}


export const postVideoLike = (videoId, newLike) => async(dispatch) => {
    
    const response = await fetch (`/api/videos/${videoId}/likes`, { 
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newLike)

    })
    if(response.ok){
        const newLike = await response.json()
        dispatch(createVideoLike(newLike))
        return newLike
    }else {
        const result = await response.json()
        return result
    }
}


export const deleteVideoLike = (videoId, likeId) => async(dispatch)=>{
    const response = await fetch(`/api/videos/${videoId}/likes/${likeId}`, {
        method: 'DELETE'
    });
    if(response.ok){
        dispatch(deleteOneLike(likeId))
    }
}

const initialState={}
//reducer
const videoLikesReducer = (state=initialState, action) => {
    let newState= {...state}
    switch(action.type){
        case GET_ALL_VIDEO_LIKES:
            return {
                newState, 
                ...action.likes
            };

        case CREATE_ONE_VIDEO:
            newState[action.like.id] = action.like
            return newState;
    
        
        case DELETE_ONE_VIDEO:
            delete newState[action.likeId]
            return newState
        
        default:
            return state
    }
}

export default videoLikesReducer;
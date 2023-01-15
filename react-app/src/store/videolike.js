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
        const result = await response.json()
        let allLikes = {}
        // console.log("$$$$$$$$$$$$$$$$$$, likes", result)
        //the reason we do the normalize here is to return the state and use it in the VideoLikes component.
        //and then it would be easy to key into there, without using for loop. 
        result.VideoLikes.forEach((videoLike) => {
            console.log("@@@@@@@@@@@@@@@@@@@@@ individual videoLike", videoLike)
            allLikes[`${videoLike.video_id}-${videoLike.user_id}`] = videoLike
        })
        await dispatch(loadVideoLikes(allLikes))
        return allLikes;
    } else{
        throw response
    }
}


export const postVideoLike = (videoId, newLike) => async(dispatch) => {
    console.log("xxxxxxxxxxxxxxxxx", newLike)
    const response = await fetch (`/api/videos/${videoId}/likes`, { 
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({'is_like': newLike})

    })
    if (response.ok){
        const _newLike = await response.json()
        console.log("ttttttttttttttttt _newLike", _newLike)
        await dispatch(createVideoLike(_newLike))
        return _newLike
    }else{
        return response
    }
}


export const deleteVideoLike = (videoId, likeId) => async(dispatch)=>{
    const response = await fetch(`/api/videos/${videoId}/likes/${likeId}`, {
        method: 'DELETE'
    });
    if(response.ok){
        await dispatch(deleteOneLike(likeId))
    }
}

const initialState={}
//reducer
const videoLikesReducer = (state=initialState, action) => {
    let newState= {...state}
    switch(action.type){
        case GET_ALL_VIDEO_LIKES:
            //likes in the line below is the same as allLikes in the thunk, it is what returned from the database and then normalized.
            console.log('action.likes!!!!!!!!!!!!!!!!!', action.likes)
            newState = {...action.likes}
            return newState

        case CREATE_VIDEO_LIKE:
            // newState[action.like.id] = action.like
            newState[`${action.like.video_id}-${action.like.user_id}`]=action.like
            return newState;
    
        
        case REMOVE_VIDEO_LIKE:
            delete newState[action.likeId]
            return newState
        
        default:
            return state
    }
}

export default videoLikesReducer;
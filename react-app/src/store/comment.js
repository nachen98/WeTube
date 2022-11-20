const GET_ALL_COMMENTS_BY_VIDEO = 'reviews/getAllComments';
const CREATE_ONE_COMMENT = 'comments/createOneComment';
const UPDATE_ONE_COMMENT = 'comments/updateOneComment';
const DELETE_ONE_COMMENT = 'comments/deleteOneComment';

const getCommentsByVideo=(comments)=>{
    return {
        type: GET_ALL_COMMENTS_BY_VIDEO,
        comments
    }
}

const createComment = (comment)=> {
    return {
        type: CREATE_ONE_COMMENT,
        comment
    }
}

const updateComment = (comment)=> {
    return {
        type: UPDATE_ONE_COMMENT,
        comment
    }
}

const deleteComment = (commentId)=> {
    return {
        type: DELETE_ONE_COMMENT,
        commentId
    }
}

export const getAllComments =(videoId) => async(dispatch) =>{
    const response = await fetch(`/api/videos/${videoId}/comments`);
    if(response.ok){
        const comments = await response.json()
        dispatch(getCommentsByVideo(comments))
    }
}

export const addComment = (videoId, commentBody)=>async(dispatch)=>{
    const response = await fetch(`/api/videos/${videoId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify(commentBody)
    }).catch(res=>res)

    if(response.ok){
        const newComment = response.json()
        dispatch(createComment(newComment))
        return newComment
    }else{
        const result = await response.json();
        return result
    }
}

export const editComment = (commentId, commentBody) => async(dispatch)=> {
    const response = await fetch(`/api/videos/comments/${commentId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentBody)
    
    }).catch(res=>res)

    if(response.ok){
        const updatedComment = response.json()
        dispatch(updateComment(updatedComment))
        return updatedComment
    }else{
        const result = await response.json();
        return result
    }
}

export const removeComment = (commentId) => async(dispatch)=>{
    const response = await fetch(`/api/videos/comments/${commentId}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(deleteComment(commentId))
    }
}

const initialState = {video: {}, user: {}}

const commentsReducer = (state=initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case GET_ALL_COMMENTS_BY_VIDEO:
            console.log("runs here!!!!!!!!!!!")
            const allComments={}
            action.comments.Comments.forEach((comment)=>{
                allComments[comment.id] = comment
            })
            newState.video = allComments
            return newState
        
        case CREATE_ONE_COMMENT:
            newState={video:{...state.video}, user:{...state.user}}
            newState.video[action.comment.id] = action.comment
            return newState
        
        case UPDATE_ONE_COMMENT:
            newState={ video: {...state.video}, user: {...state.user}}
            newState.video[action.comment.id] = action.comment
            return newState

        case DELETE_ONE_COMMENT:
            newState = {video: {...state.video}, user: {...state.user}}
            delete newState.video[action.commentId]
            delete newState.user[action.commentId]
            return newState
        
        default:
            return state
    }
}
export default commentsReducer
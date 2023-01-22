const GET_CURRENT_USER_SUBSCRIPTION='subscriptions/GET_CURRENT_USER_SUBSCRIPTION';
const SUBSCRIBE_USER = 'subscription/SUBSCRIBE_USER';
const UNSUBSCRIBE_USER= 'subscription/UNSUBSCRIBE_USER';

const getCurrentUserSubscription = (subscriptions)=>{
    return {
        type: GET_CURRENT_USER_SUBSCRIPTION,
        subscriptions
    }
}

const subscribeUser = (userId) =>{
    return {

        type: SUBSCRIBE_USER,
        userId
    }
}

const unsubscribeUser = (userId) => {
    return {
        type: UNSUBSCRIBE_USER,
        userId
    }
}


export const getCurrUserSubscription = (userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}`)
    .catch(res=>res)

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~response', response)
    if(response.ok){
        const subscriptions = await response.json()
        console.log('~~~~~~~~~~~~~~~~~~~~~~~ subscriptions', subscriptions)
        await dispatch(getCurrentUserSubscription(subscriptions.subscriptions))
        return subscriptions.subscriptions
    }
}

export const subscribeToUser = (userId)=> async (dispatch)=>{
    const response = await fetch(`/api/users/current/subscribing/${userId}`, {
        method: 'POST'
    })
    if(response.ok){
        await dispatch(subscribeUser(userId))
    }
}

export const unsubscribeToUser = (userId) => async (dispatch) =>{
    const response = await fetch(`/api/users/current/subscribing/${userId}`, {
        method: 'DELETE'
    })
    if(response.ok){
        await dispatch(unsubscribeUser(userId))
    }
}

const initialState = {}

const subscriptionReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case GET_CURRENT_USER_SUBSCRIPTION:
            console.log("action.subscriptions!!!!!!!!!!!!!!!!!!", action.subscriptions)
            newState.subscriptions = [...action.subscriptions]
            return newState
            
        case SUBSCRIBE_USER:
            console.log("action.userId@@@@@@@@@@@@@@@@@", action.userId)
            newState.subscriptions=[...state.subscriptions, action.userId]
            return newState

        case UNSUBSCRIBE_USER:
            console.log("%%%%%%%%%%%%%%%%, newState.subscriptions", newState.subscriptions)
            newState.subscriptions = state.subscriptions.filter(val=>val!==action.userId)
            console.log("%%%%%%%%%%%%%%%%, newState.subscriptions", newState.subscriptions)
            return newState
        default:
            return state
    }
}

export default subscriptionReducer
const GET_CURRENT_USER_SUBSCRIPTION='subscriptions/GET_CURRENT_USER_SUBSCRIPTION';
const SUBSCRIBE_USER = 'subscription/SUBSCRIBE_USER';
const UNSUBSCRIBE_USER= 'subscription/UNSUBSCRIBE_USER';

const getCurrentUserSubscription = (subscription)=>{
    return {
        type: GET_CURRENT_USER_SUBSCRIPTION,
        subscription
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

    if(response.ok){
        const subscriptions = await response.json()
        await dispatch(getCurrentUserSubscription(subscriptions))
        return subscriptions
    }
}

export const subscribeToUser = (userId)=> async (dispatch)=>{
    const response = await fetch(`/api/users/${userId}/subscribing`, {
        method: 'POST'
    })
    if(response.ok){
        await dispatch(subscribeUser(userId))
    }
}

export const unsubscribeToUser = (userId) => async (dispatch) =>{
    const response = await fetch(`/api/users/${userId}/subscribing`, {
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
            newState = {...action.subscriptions}
            return newState

        case SUBSCRIBE_USER:
            newState[action.userId.id] = action.userId

        case UNSUBSCRIBE_USER:
            delete newState[action.userId.id]
            return newState
        default:
            return state
    }
}

export default subscriptionReducer
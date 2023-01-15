import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileIcon } from '../../util/helper';


import "./ChannelPage.css"
const ChannelPage = () => {

    const dispatch = useDispatch();
    let selectedUser = useSelector(state => state.session.user)


    const channelProfileIcon = (user) => {
        const COLORS = ['red', 'green', 'purple', 'blue', 'yellow', 'gray']

        const colorInd = user === null ? 0 : user.id % COLORS.length
        const firstLetter = user === null ? '?' : user.username[0]
        return (
            <button className={`channel-profile-icon ${COLORS[colorInd]}-bg`}>{firstLetter}</button>
        )
    }
    return (
        <>
            <div className='channelpage-container'>

                <div className="channeluser-info-container flx-row">
                    <div >
                        {channelProfileIcon(selectedUser)}
                    </div>
                    <div className='user-name-container flx-col-start'>
                        <span className='channel-user-name'>{selectedUser.first_name} {selectedUser.last_name}</span>
                        <div className='channel-username'>@{selectedUser.username}</div>
                    </div>
                </div>

                <div className='channel-tabs-container'>
                    
                </div>
            </div>

        </>
    )
}
export default ChannelPage
import { useState } from 'react';
import { useRouteMatch, NavLink, Switch } from 'react-router-dom';
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux';
import { UserUpLoad } from '../UserUpLoads/UserUpLoads';
import NavBar from '../NavBar/NavBar';
import "./ChannelPage.css"
const ChannelPage = () => {

    let selectedUser = useSelector(state => state.session.user)

    const [tab, setTab] = useState(0)
    const videos = useSelector(state => state.videosReducer)
    const videoArr = Object.values(videos)
    const userUploads = videoArr.filter(video => video.user.id == selectedUser.id)
    const [numSubscribers, setNumSubscribers] = useState(selectedUser.subscribed_by)
    
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

                <div className="channeluser-info-container flx-col ">
                    <div className='user-icon-name flx-row'>
                        <div >
                            {channelProfileIcon(selectedUser)}
                        </div>
                        <div className='user-name-container flx-col-start'>
                            <span className='channel-user-name'>{selectedUser.first_name} {selectedUser.last_name}</span>
                            <div className='channel-username'>@{selectedUser.username}</div>
                            <div className="number-of-subscribers">
                                            {numSubscribers} {numSubscribers <= 1 ? 'subscriber' : 'subscribers'}

                                        </div>
                        </div>
                    </div>

                    <div className='channel-tabs-container '>

                        <button className='single-tab'
                         
                            onClick={() => 
                                setTab(0)}
                                style={{borderBottom: tab===0? "3px solid grey": "none"}}
                            
                        >
                            Uploads
                        </button>

                        <button className='single-tab'
                            onClick={() => setTab(2)}
                            style={{
                                borderBottom: tab===2? "3px solid grey": "none",
                            }}
                        >
                            About
                        </button>
                    </div>
                    <div className='upload-section'>

                        {tab === 0 && userUploads.length > 0 && (
                            userUploads.map(upload => {
                                return (<UserUpLoad key={upload.id} upload={upload} />)
                            })
                        )}

                        {tab === 0 && userUploads.length === 0 &&
                            <div>
                                No uploads yet.
                            </div>
                        }
                    </div>

                    <div>
                    {tab === 2 &&
                            <div>
                                No description yet.
                            </div>
                        }
                    </div>


                </div>

                {/* <Switch>
                    <ProtectedRoute exact path='/channel/@:username/uploads'>
                        <div>
             
                            {userUploads.map(upload => <UserUpLoads key={upload.id} upload={upload} />)}
                        </div>

                    </ProtectedRoute>

                    <ProtectedRoute exact path = '/channel/@:username/about'>
                        {userUploads.map(upload=><UserUpLoads key={upload.id} upload={upload}/>)}
                    </ProtectedRoute>
                </Switch> */}


            </div>

        </>
    )
}
export default ChannelPage
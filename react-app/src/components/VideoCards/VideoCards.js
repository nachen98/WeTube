import "./VideoCards.css"
import React from "react"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"
import { getProfileIcon } from "../../util/helper"
import { timeDifference } from "../../util/helper"


export function VideoCards({ video }) {
    const playerRef = React.useRef(null)

    const formatedTime = timeDifference(video.updated_at)

    const thumbnail_pic = video.thumbnail_pic

    return (
        <div className='link-for-video' >
            <Link to={`/videos/${video.id}`}>
                <div className="player-wrapper">
                    <ReactPlayer
                        id="cards-player"
                        className="react-player"
                        ref={playerRef}
                        url={video.url}
                        light={thumbnail_pic}
                        width="100%"
                        height="100%"
                        // playIcon={<button style={{backgrounColor: "none"}}>Play</button>}
                        controls={false}

                    />
                </div>
                <div className="icon-title-time flx-row">
                    <div className="video-card-profile-icon">

                        {getProfileIcon(video.user)}
                    </div>
                    <div className="video-time flx-col-start">

                        <div className="video-title">
                            {video.title}
                        </div>

                        <div className="posted-time">
                            {formatedTime}

                        </div>
                    </div>
                </div>
            </Link>

        </div>

    )
}
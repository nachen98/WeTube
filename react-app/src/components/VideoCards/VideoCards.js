import "./VideoCards.css"
import React from "react"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"
import { getProfileIcon } from "../../util/helper"
export default function VideoCards({ video }) {
    const playerRef = React.useRef(null)
    return (
        <div className='link-for-video'>
            <Link to={`/videos/${video.id}`}>
                <div className="player-wrapper">
                    <ReactPlayer
                        className="react-player"
                        ref={playerRef}
                        url={video.body}
                        light={video.thumbnail_pic}
                        width="100%"
                        height="100%"
                        playing
                        playIcon={<button>Play</button>}
                        controls={true}
                    />
                </div>
                <div>
                    {getProfileIcon(video.user)}
                    <div id="video-title">
                        {video.title}
                    </div>
                </div>
            </Link>   

        </div>

    )
}
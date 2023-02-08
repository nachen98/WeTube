import React from "react"
import { Link } from "react-router-dom";
import ReactPlayer from "react-player"
import './UserUpLoad.css'
export function UserUpLoad({ upload }) {
    const playerRef = React.useRef(null)

    const thumbnail_pic = upload.thumbnail_pic

    return (
        <div className='link-for-video-channel flx-row-space-btw ' >
            <Link to={`/videos/${upload.id}`}>
                <div className="player-wrapper">
                    <ReactPlayer
                        id="cards-player"
                        className="react-player"
                        ref={playerRef}
                        url={upload.url}
                        light={thumbnail_pic}
                        width="100%"
                        height="100%"
                        // playIcon={<button style={{backgrounColor: "none"}}>Play</button>}
                        controls={false}

                    />
                </div>
            </Link>
            <div className="video-title-channel">
                {upload.title}
            </div>
        </div>
    )
}


import "./VideoCards.css"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"
export default function VideoCards({video}){
    return (
        <div className='link-for-video'>
            <Link to={`/videos/${video.id}`} >
                <div className="player-wrapper">
                    <ReactPlayer
                        className="react-player"
                        url={video.body}
                        width="100%"
                        height="100%"
                        controls={true}
                />

                </div>
            </Link>
        </div>
    )
}
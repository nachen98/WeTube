import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './UserUpLoad.css'

export function UserUpLoad({ upload }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false)

    const thumbnail_pic = upload.thumbnail_pic
    const openMenu=()=> {
        if(showMenu) return;
        setShowMenu(true);
    };
    return (
        <div className='link-for-video-channel' >
            
            <Link to={`/videos/${upload.id}`}>
            <img src={thumbnail_pic} className="video-pic" alt={upload.title}></img>
                 

            <div className="video-title-channel">
                {upload.title}
            </div>
            </Link>

            <button onClick={openMenu} className="three-dots-icon-channel">
            <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
        </div>
    )
}


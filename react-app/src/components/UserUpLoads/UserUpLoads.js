import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditVideoModal from "../EditVideoModal";
import DeleteVideoModal from "../DeleteVideoModal"
import './UserUpLoad.css'

export function UserUpLoad({ upload }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showVideoDeleteModal, setShowVideoDeleteModal] = useState(false)
    const [showVideoEditModal, setShowVideoEditModal] = useState(false)
    const thumbnail_pic = upload.thumbnail_pic
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
            if (e.target.className.includes('edit-delete-dropdown-channel')) return;
            setShowMenu(false)
        };
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    return (
        <div className='link-for-video-channel' >
            <div className="inner-container">

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


            {showMenu && (
                <div id="edit-delete-dropdown-channelpage" className="edit-delete-dropdown-channel flx-col-justify-align-ctr">

                    <button className="edit-delete-dropdown-channel" onClick={() => setShowVideoEditModal(true)}>
                        <i className="edit-delete-dropdown-channel fa-solid fa-pencil"></i>
                        Edit
                    </button>
                    {showVideoEditModal && <EditVideoModal videoId={upload.id} showVideoEditModal={showVideoEditModal} setShowVideoEditModal={setShowVideoEditModal} old_title={upload.title} old_description={upload.description} old_videourl={upload.url} old_imgurl={upload.thumbnail_pic} />}

                    <button className="edit-delete-dropdown-channel" onClick={() => setShowVideoDeleteModal(true)}>
                        <i className="edit-delete-dropdown-channel fa-regular fa-trash-can"></i>
                        Delete
                    </button>
                    {showVideoDeleteModal && <DeleteVideoModal videoId={upload.id} showVideoDeleteModal={showVideoDeleteModal} setShowVideoDeleteModal={setShowVideoDeleteModal} />}

                </div>
            )}
        </div>
    )
}


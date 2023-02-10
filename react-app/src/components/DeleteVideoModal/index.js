import React from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import { ConfirmDeleteVideo } from './ConfirmDeleteVideo';

function DeleteVideoModal({ videoId, showVideoDeleteModal, setShowVideoDeleteModal, username }) {
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            {showVideoDeleteModal && (
                <Modal onClose={() => setShowVideoDeleteModal(false)}>
                    <ConfirmDeleteVideo videoId={videoId} setShowVideoDeleteModal={setShowVideoDeleteModal} username={username}/>
                </Modal>
            )}

        </>
    );
}


export default DeleteVideoModal;

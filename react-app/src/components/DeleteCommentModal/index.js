import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import ConfirmDeleteComment from './ConfirmDeleteComment';

function DeleteCommentModal({ commentContent, showCommentDeleteModal, setShowCommentDeleteModal }) {
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            {showCommentDeleteModal && (
                <Modal onClose={() => setShowCommentDeleteModal(false)}>
                    <ConfirmDeleteComment setShowCommentDeleteModal={setShowCommentDeleteModal} commentContent={commentContent} />
                </Modal>
            )}

        </>
    );
}


export default DeleteCommentModal;

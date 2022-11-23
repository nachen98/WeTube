import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import DeleteCommentForm from './DeleteComment';

function CommentDeleteModal({ showCommentDeleteModal, setShowCommentDeleteModal }) {
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            {showCommentDeleteModal && (
                <Modal onClose={() => setShowCommentDeleteModal(false)}>
                    <DeleteCommentForm setShowCommentDeleteModal={setShowCommentDeleteModal} />
                </Modal>
            )}

        </>
    );
}


export default CommentDeleteModal;

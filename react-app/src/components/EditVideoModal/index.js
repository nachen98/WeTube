import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditVideoForm from './EditVideoForm.js';
import "./EditVideo.css"
function EditVideoModal({videoId, old_title, old_description}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} id="edit-video-button">Edit Video</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditVideoForm setShowModal={setShowModal} videoId={videoId} old_title={old_title} old_description={old_description}/>
        </Modal>
      )}
    </>
  );
}

export default EditVideoModal;
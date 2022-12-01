import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateVideoForm from './CreateVideoForm.js';
import cameraicon1 from "../Images/pluscamera.png"
function CreateVideoModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} id="upload-video-button">
        <img src={cameraicon1} id="upload-video" alt="upload-video" />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateVideoForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateVideoModal;
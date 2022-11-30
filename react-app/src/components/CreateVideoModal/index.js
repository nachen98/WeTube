import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpLoadVideoForm from './UpLoadVideoForm';
import FillVideoInfo from './FillVideoInfo';
import CreateVideoForm from './CreateVideoForm.js';
import cameraicon1 from "../Images/pluscamera.png"

function CreateVideoModal() {
  const [showModal, setShowModal] = useState(false);
  const [showUpLoadVideo, setShowUpLoadVideo] = useState(true)

  return (
    <>
      <button onClick={() => setShowModal(true)} id="upload-video-button">
        <img src={cameraicon1} id="upload-video" alt="upload-video" />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {showUpLoadVideo && (<UpLoadVideoForm setShowModal={setShowModal} setShowUpLoadVideo={setShowUpLoadVideo}/>)}
          {!showUpLoadVideo && (<FillVideoInfo /> )}
        </Modal>
      )}
    </>
  );
}

export default CreateVideoModal;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpLoadVideoForm from './UpLoadVideoForm';
import FillVideoInfo from './FillVideoInfo';
import CreateVideoForm from './CreateVideoForm.js';
import cameraicon1 from "../Images/pluscamera.png"

function CreateVideoModal() {
  const [showModal, setShowModal] = useState(false);
  const [showUpLoadVideo, setShowUpLoadVideo] = useState(true)
  const [videoFile, setVideoFile] = useState(null)

  return (
    <>
      <button onClick={() => setShowModal(true)} id="upload-video-button">
        <img src={cameraicon1} id="upload-video" alt="upload-video" />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {showUpLoadVideo && (<UpLoadVideoForm setShowUpLoadVideo={setShowUpLoadVideo} setVideoFile={setVideoFile} videoFile={videoFile}/>)}
          {!showUpLoadVideo && (<FillVideoInfo setShowModal={setShowModal} videofile={videoFile}/> )}
        </Modal>
      )}
    </>
  );
}

export default CreateVideoModal;
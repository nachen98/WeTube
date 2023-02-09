import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditVideoForm from './EditVideoForm.js';
import "./EditVideo.css"
function EditVideoModal({videoId, showVideoEditModal, setShowVideoEditModal, old_title, old_description}) {

  return (
    <>
      
      {showVideoEditModal&& (
        <Modal onClose={() => setShowVideoEditModal(false)}>
          <EditVideoForm videoId={videoId} old_title={old_title} old_description={old_description}/>
        </Modal>
      )}
    </>
  );
}

export default EditVideoModal;
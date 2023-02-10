import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditVideoForm from './EditVideoForm.js';
import "./EditVideo.css"
function EditVideoModal({videoId, showVideoEditModal, setShowVideoEditModal, old_title, old_description, old_videourl, old_imgurl, username}) {
  
  return (
    <>
      
      {showVideoEditModal&& (
        <Modal onClose={() => setShowVideoEditModal(false)}>
          <EditVideoForm videoId={videoId} 
            showVideoEditModal={showVideoEditModal}
            setShowVideoEditModal={setShowVideoEditModal} 
            old_title={old_title} 
            old_description={old_description}    
            old_videourl={old_videourl}
            old_imgurl={old_imgurl}
            username={username}/>
        </Modal>
      )}
    </>
  );
}

export default EditVideoModal;
import React, { useState, useEffect } from "react";
import DeleteCommentModal from "../DeleteCommentModal";
import { Modal } from '../../context/Modal';
import "./EditDeleteDropDown.css"
export function EditDeleteDropDown ({commentContent, setEditable}){
    
    const [showMenu, setShowMenu] = useState(false);
    const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false)

    const openMenu=()=> {
        if(showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (e.target.className.includes('edit-delete-ele')) return;
          setShowMenu(false);
        };
    
        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      return (
        <>
            <button onClick={openMenu} id="three-dots-icon">
            <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>

            {showMenu && (
              <div id="edit-delete-dropdown" className="edit-delete-ele">
                <div id="edit-comment-button" className="edit-delete-ele">
                  <button className="edit-delete-ele" onClick={()=>setEditable(true)}>
                    <i className="edit-delete-ele fa-solid fa-pencil"></i>
                      Edit
                  </button>
                </div>
                
                {showMenu && (
                  <>
                    <button className="edit-delete-ele" onClick={() => setShowCommentDeleteModal(true)}>
                     <i className="edit-delete-ele fa-regular fa-trash-can"></i>
                     Delete
                    </button>
                    {showCommentDeleteModal && <DeleteCommentModal commentContent={commentContent} showCommentDeleteModal={showCommentDeleteModal} setShowCommentDeleteModal={setShowCommentDeleteModal} />}
                  </>
                     
                )}
              </div>
            )}
        </>
      )

}
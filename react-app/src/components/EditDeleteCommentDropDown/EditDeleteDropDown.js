import React, { useState, useEffect } from "react";
import { EditComment } from "../EditComment/EditComment";

export function EditDeleteDropDown ({commentContent, setEditable}){
    
    const [showMenu, setShowMenu] = useState(false);

    const openMenu=()=> {
        if(showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = () => {
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
              <div id="edit-delete-menu">
                <div id="edit-comment-button">
                  <button onClick={()=>setEditable(true)}>
                    <i class="fa-solid fa-pencil"></i>
                      Edit
                  </button>
                </div>
                
                {/* <div id="delete-comment-button">
                  <button onClick={<DeleteComment commentContent={commentContent}/>}>Delete
                    <i class="fa-regular fa-trash-can"></i>
                    Delete
                  </button>
                </div> */}
                
              </div>
            )}
        </>
      )

}
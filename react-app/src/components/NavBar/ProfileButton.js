import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LogoutButton from "../auth/LogoutButton";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
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
      {/* <CreateVideoModal /> */}
      <button onClick={openMenu} className='profile-button'>
        <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="div-profile-dropdown">
            <div className="user-info">{user.username}</div>
            <div className="user-info">{user.email}</div>
            <div id="logout-button">
              {LogoutButton}
            </div>
        </div>

      )}
    </>
  );
}

export default ProfileButton;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import LogoutButton from "../auth/LogoutButton";
import CreateVideoModal from "../CreateVideoModal";
import { getProfileIcon } from "../../util/helper"
import "./NavBar.css"
function ProfileButton({ user }) {
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

  const COLORS = ['red', 'green', 'purple', 'blue', 'yellow', 'gray']
  const colorInd = user.id % COLORS.length
  const firstLetter = user.username[0]
  return (
    <>
      <div className="flx-row-space-btw">
        <CreateVideoModal />
        <button onClick={openMenu} className={`profile-icon ${COLORS[colorInd]}-bg pos-rel`}>
          {firstLetter}
        </button>
      </div>
      {showMenu && (
        <div className="div-profile-dropdown">
          <div className="user-info-container flx-row">
            <div className="dropdown-profile-icon">
              {getProfileIcon(user)}
            </div>
            <div className="user-name-container flx-col-start">

              <span>{user.first_name} {user.last_name}</span>
              <div>@{user.username}</div>
            </div>
          </div>
          <div className="channel-logout-container flx-col-start">
            <div className="channel-button">

              <Link to={`/channel/@${user.username}`}>
                <i class="fa-regular fa-user fa-lg"></i>
                <span>Your channel</span>
              </Link>
            </div>

            <div className="logout-button">
              <i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
              {LogoutButton()}
            </div>
          </div>
        </div>

      )}
    </>
  );
}

export default ProfileButton;
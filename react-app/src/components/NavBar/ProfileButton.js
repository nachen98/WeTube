import React, { useState, useEffect } from "react";
import LogoutButton from "../auth/LogoutButton";
import CreateVideoModal from "../CreateVideoModal";

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
        <button onClick={openMenu} className={`profile-icon ${COLORS[colorInd]}-bg`}>
          {firstLetter}
        </button>
      </div>
      {showMenu && (
        <div className="div-profile-dropdown">
          <div className="user-info">{user.username}</div>
          <div className="user-info">{user.email}</div>
          <div id="logout-button">
            {LogoutButton()}
          </div>
        </div>

      )}
    </>
  );
}

export default ProfileButton;
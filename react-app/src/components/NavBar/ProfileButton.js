import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
// import LogoutButton from "../auth/LogoutButton";
import CreateVideoModal from "../CreateVideoModal";
import { getProfileIcon } from "../../util/helper"
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import "./NavBar.css"


function ProfileButton({ user }) {
  const dispatch = useDispatch()
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout()).then(() => history.push('/'))
  };

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


            <Link to={`/channel/@${user.username}`} className="channel-button">
              <i class="fa-regular fa-user fa-lg"></i>
              <span>Your channel</span>
            </Link>


            <div className="logout-button" onClick={onLogout}>
              <i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
              {/* {LogoutButton()} */}
              <button id="logout-inner-button">Sign out</button>
            </div>
          </div>
        </div>

      )}
    </>
  );
}

export default ProfileButton;

import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../Images/WeTube-logo.png';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar/SearchBar';
import './NavBar.css'

function NavBar() {
  const currentUser = useSelector(state => state.session.user);

  let sessionLink
  if (currentUser) {
    sessionLink = (
      <ProfileButton user={currentUser} />
    )
  } else {
    sessionLink = (
      <NavLink to={"/login"}>
        <button id="mainpage-login-button" >
          <i class="fa-regular fa-user"></i>
          Sign in
        </button>
      </NavLink>
    )
  }

  return (
    <div id="nav-container">
      <div id="inner-nav-container">
        <nav>
          <NavLink exact to="/" id="navlink" className='flx-row-justify-align-ctr'>
            <img src={logo} id="home-logo" alt="logo" />
            <span id="wetube-name">WeTube</span>
          </NavLink>
        </nav>
        
        {/* <div className='search-bar-container flx-row-align-ctr'>
          <SearchBar />
        </div> */}
        
        <div id="right-nav">
          {sessionLink}
        </div>

      </div>
    </div>
  )
}

export default NavBar;

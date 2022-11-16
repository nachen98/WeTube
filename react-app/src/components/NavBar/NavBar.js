
import React from 'react';
import { NavLink } from 'react-router-dom';
//import LogoutButton from '../auth/LogoutButton';

function NavBar(){
  const currentUser=useSelector(state=>state.session.user);

  let sessionLink
  if(currentUser){
    sessionLink=(
      <profileButton user={currentUser} />
    )
  }else{
    sessionLink=(
      <LoginForm/>
    )
  }

  return (
    <div id="NavContainer">
      <NavLink exact to="/" id="navlink">
        <img src={logo} id="logo-picture" alt="logo" />
        <h1>WeTube</h1>
      </NavLink>
      <div id="RightNav">
        {sessionLink}
      </div>
    </div>
  )
}
// const NavBar = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink to='/' exact={true} activeClassName='active'>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/login' exact={true} activeClassName='active'>
//             Login
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/sign-up' exact={true} activeClassName='active'>
//             Sign Up
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/users' exact={true} activeClassName='active'>
//             Users
//           </NavLink>
//         </li>
//         <li>
//           <LogoutButton />
//         </li>
//       </ul>
//     </nav>
//   );
// }

export default NavBar;

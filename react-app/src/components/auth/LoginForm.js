import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { getAllVideos } from '../../store/video'
import logo from "../Images/logo.png"
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      const formatedErrors = data.map(err => {
        const errMsgArr = err.split(":");
        return errMsgArr.length > 1 ? errMsgArr.slice(1) : errMsgArr
      })
      setErrors(formatedErrors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUserLogin = (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'))
  }

  if (user) {
    (async () => {
      await dispatch(getAllVideos())
    })();
    return <Redirect to='/' />;
  }

  return (
    <div id="login-container">


      <div id="login-box">
        <div id="inner-container">


          <div className='flx-col-justify-algn-ctr'>
            <img src={logo} id="home-logo" alt="logo" />
          </div>
          <div id="sign-in" className='flx-col-justify-algn-ctr'>Sign in</div>
          <div id="under-sign-in" className='flx-col-justify-algn-ctr'>to continue to WeTube</div>
          <form onSubmit={onLogin} className='flx-col'>
            <div id="error-messages">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <label className="custom-field">
                <input className='login-input'
                  type='text'
                  value={email}
                  onChange={updateEmail}
                  required
                />
                <span className="placeholder">Email</span>
              </label>
            </div>
            <div>
              <label className="custom-field">
                <input className="login-input"
                  
                  type='text'
                  value={password}
  
                  onChange={updatePassword}
                  required
                />
                <span className="placeholder">Password</span>
              </label>
              <div id="signup-meessage">
                <div id="need-account">Create account</div>
                {/* <Link to={"/sign-up"} id="linktosignup">Register</Link> */}
              </div>
              <button type='submit' id="login-button">Log In</button>
              <div id="or-message">or</div>
              <button type='submit' id="demo-user" onClick={demoUserLogin}>Log In As Demo User</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;

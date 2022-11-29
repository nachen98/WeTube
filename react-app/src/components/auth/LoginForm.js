import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { getAllVideos } from '../../store/video'
import logo from "../Images/WeTube-logo.png"
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    setEmail(email.trimEnd())
    const data = await dispatch(login(email.trimEnd(), password));
    if (data) {
      const formatedErrors = data.map(err => {
        const errMsgArr = err.split(":");
        return errMsgArr.length > 1 ? errMsgArr.slice(1) : errMsgArr
      })
      setErrors(formatedErrors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value.trimStart());
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


      <div id="login-box" className="flx-col-justify-align-ctr">
        <div id="inner-container">


          <div className='flx-col-justify-algn-ctr ctr-algn-text'>
            <img src={logo} id="home-logo" className='flx-col-justify-algn-ctr' alt="logo" />
          </div>
          <div id="sign-in" className='flx-col-justify-algn-ctr ctr-algn-text'>Sign in</div>
          <div id="under-sign-in" className='flx-col-justify-algn-ctr ctr-algn-text'>to continue to WeTube</div>
          <form onSubmit={onLogin} className='flx-col'>
            <div id="error-messages">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <label className="custom-field">
                <input className='login-input'
                  type='email'
                  value={email}
                  onChange={updateEmail}
                  required
                />
                <span className="placeholder">{!email.length ? "Email" : ""}</span>
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
                <span className="placeholder">{!password.length ? "Password" : ""}</span>
              </label>
              <div id="create-account" className='justify-space-btw'>

                <button id="signup-meessage-button" type="button">
                  <Link to={"/sign-up"} id="linktosignup">
                    Create account
                  </Link>
                </button>
                <button type='submit' id="login-button">Log In</button>
              </div>
              <div id="or-message" className='ctr-algn-text'>or</div>
              <button type='submit' id="demo-user" className="ctr-algn-text" onClick={demoUserLogin}>Log In As Demo User</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
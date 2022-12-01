import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from "../Images/WeTube-logo.png"
import "./SignUpForm.css"

const SignUpForm = () => {

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!hasSubmitted) return;

    let validationErrors = [];

    if (firstName.trim().length > 40) {
      validationErrors.push("The first name is limited to 40 characters.")
    }

    if (firstName.trim().length === 0) {
      validationErrors.push("First name cannot be empty spaces.")
    }

    if (lastName.trim().length > 40) {
      validationErrors.push("The last name is limited to 40 characters.")
    }

    if (lastName.trim().length === 0) {
      validationErrors.push("Last name cannot be empty spaces.")
    }

    if (username.length < 6) {
      validationErrors.push("Username must be at least 6 characters.")

    }

    if (username.length > 40) {
      validationErrors.push("Username is limit to 40 characters.")
    }

    if (password.length < 6) {
      validationErrors.push("Password needs to be more than 6 characters.")
    }

    if (password.length > 255) {
      validationErrors.push("Password is limit to 255 characters.")
    }

    if (password !== repeatPassword) {
      validationErrors.push("Password does not match.")
    }

    setErrors(validationErrors)

  }, [firstName, lastName, email, username, password, repeatPassword])


  const onSignUp = async (e) => {
    if (!hasSubmitted) setHasSubmitted(true);

    e.preventDefault();
    let validationErrors = [];

    if (firstName.trim().length > 40) {
      validationErrors.push("The first name is limited to 40 characters.")
    }

    if (firstName.trim().length === 0) {
      validationErrors.push("First name cannot be empty spaces.")
    }

    if (lastName.trim().length > 40) {
      validationErrors.push("The last name is limited to 40 characters.")
    }

    if (lastName.trim().length === 0) {
      validationErrors.push("Last name cannot be empty spaces.")
    }

    if (username.length < 6) {
      validationErrors.push("Username must be at least 6 characters.")
    }

    if (username.length > 40) {
      validationErrors.push("Username is limit to 40 characters.")
    }

    if (password.length < 6) {
      validationErrors.push("Password must be at least 6 characters.")
    }

    if (password.length > 255) {
      validationErrors.push("Password is limit to 255 characters.")
    }

    if (password !== repeatPassword) {
      validationErrors.push("Passwords do not match.")
    }

    if (validationErrors.length > 0) return setErrors(validationErrors)

    const data = await dispatch(signUp(firstName, lastName, username, email, password));

    if (data) {
      const formatedErrors = data.map(err => {
        const errMsgArr = err.split(":");
        return errMsgArr.length > 1 ? errMsgArr.slice(1) : errMsgArr
      })
      setErrors(formatedErrors)
      return
    }
    return <Redirect to="/" />
  }



  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="signup-container">

      <div id="signup-box" className="flx-col-justify-align-ctr">


        <img src={logo} id="home-logo" alt="logo" />

        <div id="create-an-account" className='flx-col-justify-algn-ctr'>Create your WeTube Account</div>
        <form id="signup-form" onSubmit={onSignUp}>
          <div id="error-messages">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <div className="justify-space-btw">
            <div>
              <label className="custom-field">
                <input id="first-name-input" className='signup-input'
                  type='text'
                  value={firstName}
                  onChange={updateFirstName}
                  required
                />
                <span className="placeholder">First name</span>
              </label>
            </div>
            <div>
              <label className="custom-field">
                <input className='signup-input'
                  type='text'
                  value={lastName}
                  onChange={updateLastName}
                  required
                />
                <span className="placeholder">Last name</span>
              </label>
            </div>
          </div>
          <div>
            <label className="custom-field">
              <input className='email-username-sign-up-input signup-input'
                type='email'
                value={email}
                onChange={updateEmail}
                required
              />
              <span className="placeholder">{!email.length ? "Your email address" : ""}</span>
            </label>
          </div>

          <div>
            <label className="custom-field">
              <input className='email-username-sign-up-input signup-input'
                type='text'
                value={username}
                onChange={updateUsername}
                required
              />
              <span className="placeholder">Your username</span>
            </label>
          </div>
          <div className="justify-space-btw">
            <div>
              <label className="custom-field">
                <input className='signup-input'
                  type='text'
                  value={password}
                  onChange={updatePassword}
                  required
                />
                <span className="placeholder">Password</span>
              </label>
            </div>
            <div>
              <label className="custom-field">
                <input className='signup-input'
                  type='text'
                  value={repeatPassword}
                  onChange={updateRepeatPassword}
                  required
                />
                <span className="placeholder">Confirm</span>
              </label>
            </div>
          </div>
          <div id="signup-page-buttons" className='justify-space-btw'>
            <button id="login-link-button" type="button">
              <Link to={"/login"} id="linktologin">Sign in instead</Link>
            </button>
            <button type='submit' id="signup-button">Sign Up</button>
          </div>
        </form>

      </div>
    </div>
  );
};


export default SignUpForm;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from "../Images/WeTube-logo.png"
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
  const [firstNameErrors, setFirstNameErrors] = useState("")
  const [lastNameErrors, setLastNameErrors] = useState("")
  const [emailErrors, setEmailErrors] = useState("")
  const [userNameErrors, setUserNameErrors] = useState("")
  const [passwordErrors, setPasswordErrors] = useState("")
  const [repeatPasswordErrors, setRepeatPasswordErrors] = useState("")

  useEffect(()=> {
    if(!firstNameErrors) return;
    setFirstNameErrors("")
  }, [firstName])

  useEffect(()=> {
    if(!lastNameErrors) return;
    setLastNameErrors("")
  }, [lastName])

  useEffect(()=> {
    if(!emailErrors) return;
    setEmailErrors("")
  }, [firstName])

  useEffect(()=> {
    if (!userNameErrors) return;
    setUserNameErrors("")
  }, [username])

  useEffect(()=>{
    if (!passwordErrors) return;
    setPasswordErrors("")
  }, [password])

  useEffect(()=>{
    if (!repeatPasswordErrors) return;
    setRepeatPasswordErrors("")
  }, [repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    if(firstName.trim().length > 40){
      validationErrors.push("The first name is limited to 40 characters.")
      setFirstNameErrors("The first name is limited to 40 characters.")
    }

    if(firstName.trim().length === 0) {
      validationErrors.push("First name cannot be empty spaces.")
      setFirstNameErrors("First name cannot be empty spaces.")
    }

    if(lastName.trim().length > 40){
      validationErrors.push("The last name is limited to 40 characters.")
      setLastNameErrors("The last name is limited to 40 characters.")
    }

    if(lastName.trim().length === 0) {
      validationErrors.push("Last name cannot be empty spaces.")
      setFirstNameErrors("Last name cannot be empty spaces.")
    }

    if(username.length < 6){
      validationErrors.push("Username must be at least 6 characters.")
      setUserNameErrors("Username must be at least 6 characters.")
    }
    
    if(username.length > 40){
      validationErrors.push("Username is limit to 40 characters.")
      setUserNameErrors("Username is limit to 40 characters.")
    }

    if(password.length < 6){
      validationErrors.push("Password must be at least 6 characters.")
      setPasswordErrors("Password must be at least 6 characters.")
    }

    if(password.length > 255){
      validationErrors.push("Password is limit to 255 characters.")
      setPasswordErrors("Password is limit to 255 characters.")
    }

    if (password !== repeatPassword) {
      validationErrors.push("Passwords do not match.")
      setRepeatPasswordErrors("Passwords do not match.")
    }

    if(validationErrors.length > 0) return setErrors(validationErrors)

    const data = await dispatch(signUp(firstName, lastName, username, email, password));
   
    if (data) {
      const formatedErrors = data.map(err => {
        const errMsgArr = err.split(":");
        return errMsgArr.length >1 ? errMsgArr.slice(1) : errMsgArr
        })
      setErrors(formatedErrors)
      return
      }
      return <Redirect to ="/" />
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

      <div id="signup-box">
        <div id="signup-inner-container">
        <div className='flx-col-justify-algn-ctr'>
            <img src={logo} id="home-logo" alt="logo" />
          </div>
          <div id="create-an-account" className='flx-col-justify-algn-ctr'>Create your WeTube Account</div>
          <form onSubmit={onSignUp}>
            <div id="error-messages">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>

            <div>
              <label className="custom-field">
                <input className='login-input'
                  type='text'
                  value={firstName}
                  onChange={updateFirstName}
                  required
                />
                <span className="placeholder">{!firstName.length? "First name": ""}</span>
              </label>
            </div>
            <div>
              <label className="custom-field">
                <input className='login-input'
                  type='text'
                  value={lastName}
                  onChange={updateLastName}
                  required
                />
                <span className="placeholder">{!lastName.length? "Last name": ""}</span>
              </label>
            </div>

            <div>
              <label className="custom-field">
                <input className='login-input'
                  type='email'
                  value={email}
                  onChange={updateEmail}
                  required
                />
                <span className="placeholder">{!email.length? "Your email address": ""}</span>
              </label>
            </div>

            <div>
              <label className="custom-field">
                <input className='login-input'
                  type='text'
                  value={username}
                  onChange={updateUsername}
                  required
                />
                <span className="placeholder">{!username.length? "Your username": ""}</span>
              </label>
            </div>
            <div>
              <label className="custom-field">
                <input className='login-input'
                  type='text'
                  value={password}
                  onChange={updatePassword}
                  required
                />
                <span className="placeholder">{!password.length? "Password": ""}</span>
              </label>
            </div>
            <div>
              <label className="custom-field">
                <input className='login-input'
                  type='text'
                  value={repeatPassword}
                  onChange={updateRepeatPassword}
                  required
                />
                <span className="placeholder">{!password.length? "Confirm": ""}</span>
              </label>
            </div>
            <Link to={"/login"} id="linktologin">Sign in instead</Link>
            <button type='submit' id="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default SignUpForm;

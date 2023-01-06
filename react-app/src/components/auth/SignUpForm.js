import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Modal } from '../../context/Modal';
import './auth.css'

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => state.session.user);

  const onSignUp = async (e) => {
    e.preventDefault();

    const errorsArr = []
    if (username.length > 39) {
      errorsArr.push("Username must be less than 40 characters")
    }
    if (email.length > 254) {
      errorsArr.push("Email length must be less than 255 characters")
    }
    if (password.length > 30) {
      errorsArr.push("Password length must be less than 30 characters")
    }
    if (password !== repeatPassword){
      errorsArr.push("Passwords do not match")
    }

    if (errorsArr.length) {
      setErrors(errorsArr)
      return;
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

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
    <div>
      <button onClick={()=> setShowModal(true)} className='navbar-button'>Register</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="login-container">
            <form onSubmit={onSignUp}>
              <h2>Create your account</h2>
              <p id='registration-txt'>Registration is easy.</p>
              <div id='errors'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div className='login-form-input'>
                <label>Email address{' '}<span className='asterisk'>*</span></label>
                <input
                  required
                  type='email'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div className='login-form-input'>
                <label>Username&nbsp;<span className='asterisk'>*</span></label>
                <input
                  required
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div className='login-form-input'>
                <label>Password&nbsp;<span className='asterisk'>*</span></label>
                <input
                  required
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div className='login-form-input'>
                <label>Repeat Password&nbsp;<span className='asterisk'>*</span></label>
                <input
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <button id='login-button' type='submit'>Register</button>
              <p id='login-form-term'>By clicking Sign in, you agree to Emarty's Terms of Use and Privacy Policy. Emarty may send you communications; you may change your preferences in your account settings. We'll never post without your permission.</p>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SignUpForm;

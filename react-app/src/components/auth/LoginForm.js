import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Modal } from '../../context/Modal';
import './auth.css'

const LoginForm = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => state.session.user);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = () => {
    setEmail('demo@aa.io');
    setPassword('password')
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <button onClick={()=> setShowModal(true)} className='navbar-button'>Login</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="login-container">
          <form onSubmit={onLogin}>
            <h2>Sign in</h2>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor='email'>Email address</label>
              <input
                name='email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div id='login-form-bottom'>
              <button type='submit'>Login</button>
              <p>Trouble signing in?</p>
              <p>------- or --------</p>
              <button id='demo-user-button' type='submit' onClick={() => demoLogin()}>Demo User</button>
              <p id='login-form-term'>By clicking Sign in, you agree to Earty's Terms of Use and Privacy Policy. Earty may send you communications; you may change your preferences in your account settings. We'll never post without your permission.</p>
            </div>
          </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LoginForm;

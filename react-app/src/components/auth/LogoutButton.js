import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './auth.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} id='sign-out-button'><i class="fa-solid fa-right-from-bracket"></i>Sign out</button>;
};

export default LogoutButton;

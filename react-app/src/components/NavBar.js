import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => Object.values(state.session)[0])
    let content
    if (!user) {
        content = (
          <div className='navbar-right'>
            <div>
              <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/login' exact={true} activeClassName='active'>
                <button className='navbar-button'>Login</button>
              </NavLink>
            </div>
            <div>
              <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/sign-up' exact={true} activeClassName='active'>
                <button className='navbar-button'>Sign Up</button>
              </NavLink>
              </div>
          </div>
        )
    } else {
      content = (
        <div className='navbar-right'>
          <div>
            <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/login' exact={true} activeClassName='active'>
              <i class="fa-regular fa-user"></i>
            </NavLink>
          </div>
          <div>
            <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/sign-up' exact={true} activeClassName='active'>
              <i class="fa-solid fa-cart-shopping"></i>
            </NavLink>
          </div>
        </div>
      )
    }


  return (
    <nav>
      <div className='navbar-container'>
        <div>
          <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/' exact={true} activeClassName='active'>
            <p id='logo'>Emart</p>
          </NavLink>
        </div>
        {/* <div className='navbar-right'>
          <div>
            <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/login' exact={true} activeClassName='active'>
              <button className='navbar-button'>Login</button>
            </NavLink>
          </div>
          <div>
            <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/sign-up' exact={true} activeClassName='active'>
              <button className='navbar-button'>Sign Up</button>
            </NavLink>
          </div>
        </div> */}
        {content}
      </div>
        <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;

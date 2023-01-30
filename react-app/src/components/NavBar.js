import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import './NavBar.css'

const NavBar = () => {
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = () => {
          setShowMenu(false);
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };

    const user = useSelector(state => Object.values(state.session)[0])

    let content
    if (!user) {
        content = (
          <div className='navbar-right'>
            {/* <div>
              <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/login' exact={true} activeClassName='active'>
                <button className='navbar-button'>Login</button>
              </NavLink>
            </div> */}
            <LoginForm />
            {/* <div>
              <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/sign-up' exact={true} activeClassName='active'>
                <button className='navbar-button'>Sign Up</button>
              </NavLink>
            </div> */}
            <SignUpForm />
          </div>
        )
    } else {
      content = (
        <div className='navbar-right'>
            <div className='navbar-element'>
              <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/products/current' exact={true} activeClassName='active'>
                <button className='navbar-button'><i class="fa-solid fa-store"></i></button>
              </NavLink>
            </div>
            <div className='navbar-element'>
              <button className='navbar-button' onClick={openMenu}>
                <i className="fa-solid fa-user"></i> {"  "}
                <i class="fa-solid fa-caret-down"></i>
              </button>
              {showMenu && (
                <ul className="profile-dropdown">
                  <li className='dropdown-txt'><i class="fa-solid fa-user">&nbsp;&nbsp;</i>{user.username}</li>
                  <li className='dropdown-txt'><i class="fa-solid fa-envelope">&nbsp;&nbsp;</i>{user.email}</li>
                  <li className='dropdown-txt'>
                    <NavLink style={{ color: 'black'}} key='review' to='/reviews'><i className="fa-solid fa-clipboard"></i>My Reviews</NavLink>
                  </li>
                  <li className='dropdown-txt'>
                    <NavLink style={{ color: 'black'}} key='favorite' to='/favorites'><i className="fa-solid fa-heart"></i>Favorite Items</NavLink>
                  </li>
                  <li id='dropdown-signout'>
                    <LogoutButton />
                  </li>
                </ul>
              )}
          </div>
          <div className='navbar-element'>
            <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/carts' exact={true} activeClassName='active'>
              <button className='navbar-button'><i class="fa-solid fa-cart-shopping"></i></button>
            </NavLink>
          </div>
        </div>
      )
    }


  return (
    <nav>
      <div className='navbar-container'>
        <div className='navbar-element'>
          <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/' exact={true} activeClassName='active'>
            <p id='logo'>Emarty</p>
          </NavLink>
        </div>
        <div id='search'>
          <form action="/" method="GET" className="form">
            <input
              type="search"
              placeholder="Search for anything"
              onChange={handleChange}
              value={searchInput} />
            <button type="submit"  onClick={(e) => {e.preventDefault(); history.push('/coming-soon')}}><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
        {content}
      </div>
    </nav>
  );
}

export default NavBar;

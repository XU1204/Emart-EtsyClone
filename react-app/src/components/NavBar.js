import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import './NavBar.css'
import { getProducts } from '../store/product';

const NavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch()

    const [showMenu, setShowMenu] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const [input, setInput] = useState('')

    useEffect(() => {
      dispatch(getProducts())
    },[dispatch])

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

    const user = useSelector(state => Object.values(state.session)[0])
    const products = useSelector(state => Object.values(state.products))

    let content
    if (!user) {
        content = (
          <div className='navbar-right'>
            <LoginForm />
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


    const handleFilter = async (e) => {
      console.log('+++++++++', e.target.value)
      await setInput(e.target.value)
      console.log('+++++++++input', input)
      const filter = products.filter((product) => {
          return product.name.toLowerCase().includes(input.toLowerCase())
      })
      if (input === '') setFilterData([])
      else setFilterData(filter)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      // if (searchInput) {
      //     history.push(`/s?k=${searchInput.replace(" ", "+")}`);
      // } else {
      //     history.push("/");
      // }
      // formRef.current.classList.remove(styles.formFocus);
      setFilterData([])
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
              type="text"
              placeholder="Search for anything"
              onChange={handleFilter}
              value={input} />
            {!!input.length && <div className='search-cancel-btn' onClick={() => {setInput(''); setFilterData([])}}><i className="fa-solid fa-xmark"></i></div>}
            <button type="submit" onClick={handleSubmit} ><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
          {filterData.length != 0 && (
                < div className='searchResults'>
                    {filterData.map((value, i) => {
                      return (
                      <button style={{border:'none', backgroundColor:'white', textAlign:'left', padding:'0'}} onClick={() => setFilterData([])}>
                        <NavLink style={{ textDecoration:'none', color: 'black' }} key={i} to={`/products/${value.id}`}><div id='search-name'>{value.name.slice(0, 100)}...</div></NavLink>
                      </button>)
                    })}
                </div>
            )}
        </div>
        {content}
      </div>
    </nav>
  );
}

export default NavBar;

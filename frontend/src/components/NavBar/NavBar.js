/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutAction } from '../../actions/loginActions';
import './NavBar.css';

function NavBar() {
  const [open, setOpen] = useState(false);
  const loginData = useSelector((state) => state.login);
  const dispatch = useDispatch();

  function logout() {
    dispatch(logOutAction());
    setOpen(false);
  }

  return (
    <>
      <div className="navBar">
        <div className="navBarTitle" onClick={() => setOpen(false)}>
          <h1>GreenBay</h1>
        </div>
        <div className="navBarLogos">
          {loginData.money && (<h2 className="money">{`$${loginData.money}`}</h2>)}
          <i onClick={() => setOpen(!open)} className="fas fa-user-circle fa-lg" />
          {loginData.username && (<Link to="/newItem" style={{ textDecoration: 'none' }}><i onClick={() => setOpen(false)} className="fas fa-plus-circle fa-lg" /></Link>)}
          {!loginData.username && (<i onClick={() => setOpen(false)} className="fas fa-plus-circle fa-lg" />)}
          {loginData.username && (<Link to="/store" style={{ textDecoration: 'none' }}><i onClick={() => setOpen(false)} className="fas fa-store fa-lg" /></Link>)}
          {!loginData.username && (<i onClick={() => setOpen(false)} className="fas fa-store fa-lg" />)}
        </div>
      </div>
      <div className="navBarUserMenu" style={{ display: open ? 'flex' : 'none' }}>
        {!loginData.username
        && (
        <div className="navBarUserMenuVisitor">
          <Link to="/login" style={{ textDecoration: 'none' }}><div onClick={() => setOpen(!open)}>Login</div></Link>
          <Link to="/register" style={{ textDecoration: 'none' }}><div onClick={() => setOpen(!open)}>Sign up</div></Link>
        </div>
        )}
        {loginData.username
        && (
        <div className="navBarUserMenuCustomer">
          <Link to="/profile" style={{ textDecoration: 'none' }}><div onClick={() => setOpen(!open)}>Profile</div></Link>
          <Link to="/myItems" style={{ textDecoration: 'none' }}><div onClick={() => setOpen(!open)}>My Items</div></Link>
          <Link to="/favorites" style={{ textDecoration: 'none' }}><div onClick={() => setOpen(!open)}>Favorites</div></Link>
          <Link to="/" style={{ textDecoration: 'none' }}><div onClick={logout}>Logout</div></Link>
        </div>
        )}
      </div>
    </>
  );
}

export default NavBar;

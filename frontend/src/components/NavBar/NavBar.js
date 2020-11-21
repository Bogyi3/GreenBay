/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { logOutAction } from '../../actions/loginActions';
import './NavBar.css';

function NavBar() {
  const loginData = useSelector((state) => state.login);
  const money = useSelector((state) => state.userData.userData.money);
  const dispatch = useDispatch();

  function logout() {
    dispatch(logOutAction());
  }

  return (
    <>
      <div className="navBar">
        <div className="navBarTitle">
          <h1>GreenBay</h1>
        </div>
        {!loginData.username && (
        <div className="navBarButtons">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              SIGN IN
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              REGISTER
            </Button>
          </Link>
        </div>
        )}
        {loginData.username && (
        <div className="navBarLogos">
          <h2 className="money">{`$${money}`}</h2>
          <Link to="/newItem" style={{ textDecoration: 'none' }}><i className="fas fa-plus-circle fa-lg" /></Link>
          <Link to="/store" style={{ textDecoration: 'none' }}><i className="fas fa-store fa-lg" /></Link>
          <Link to="/" style={{ textDecoration: 'none' }}><i onClick={() => logout()} className="fas fa-sign-out-alt fa-lg" /></Link>
        </div>
        )}
      </div>
    </>
  );
}

export default NavBar;

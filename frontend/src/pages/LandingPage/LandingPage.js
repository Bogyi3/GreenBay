import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

import './LandingPage.css';

function LandingPage() {
  const token = useSelector((state) => state.login.token);
  const history = useHistory();

  return (
    <>
      {token
        ? history.push('/store')
        : (
          <div className="landingPage page">
            <Typography color="primary" variant="h1">Welcome to GreenBay!</Typography>
            <div className="instruction">
              <Typography color="secondary" variant="h3">Please, </Typography>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                  SIGN IN
                </Button>
              </Link>
              <Typography color="secondary" variant="h3">or</Typography>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                  REGISTER
                </Button>
              </Link>
              <Typography color="secondary" variant="h3">to continue.</Typography>
            </div>
          </div>
        )}
      ;
    </>
  );
}

export default LandingPage;

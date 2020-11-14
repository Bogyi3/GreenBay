import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import StorePage from './pages/StorePage/StorePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SellItemPage from './pages/SellItemPage/SellItemPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/store" component={StorePage} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/sell" component={SellItemPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

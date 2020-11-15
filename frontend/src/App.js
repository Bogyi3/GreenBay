import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

import LandingPage from './pages/LandingPage/LandingPage';
import StorePage from './pages/StorePage/StorePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import myItemsPage from './pages/MyItemsPage/MyItemsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CreateItemPage from './pages/CreateItemPage/CreateItemPage';
import SingleItemPage from './pages/SingleItemPage/SingleItemPage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/store" component={StorePage} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/myItems" component={myItemsPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/favorites" component={FavoritesPage} />
          <Route exact path="/newItem" component={CreateItemPage} />
          <Route exact path="/singleItem" component={SingleItemPage} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;

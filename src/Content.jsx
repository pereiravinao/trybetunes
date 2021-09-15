import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites"><Favorites /></Route>
        <Route path="/profile/edit"><ProfileEdit /></Route>
        <Route path="/profile"><Profile /></Route>
        <Route
          exact
          path="/"
          render={ (props) => <Login { ...props } /> }
        />
        <Route path="*"><NotFound /></Route>
      </Switch>
    );
  }
}

export default Content;

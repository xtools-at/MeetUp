import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Login from 'Login';
import AddEvent from 'AddEvent';
import EventList from 'EventList';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/login');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="login" component={Login} onEnter={redirectIfLoggedIn} />
      <Route path="add" component={AddEvent} onEnter={requireLogin} />
      <Route path="events" component={EventList}/>
      <IndexRoute component={AddEvent}/>
    </Route>
  </Router>
);

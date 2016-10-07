import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Login from 'Login';
import AddEvent from 'AddEvent';
import EventList from 'EventList';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/login');
    //console.log('redirect to login');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/');
    //console.log('already logged in, redirect to home');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="login" component={Login} login={true} onEnter={redirectIfLoggedIn} />
      <Route path="register" component={Login} login={false} onEnter={redirectIfLoggedIn} />
      <Route path="add" component={AddEvent} onEnter={requireLogin} />
      <IndexRoute component={EventList}/>
    </Route>
  </Router>
);

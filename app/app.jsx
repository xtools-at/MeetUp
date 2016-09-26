var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

import Main from 'Main';

var actions = require('actions');
var store = require('configureStore').configure();

import firebase from 'app/firebase/';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    //store.dispatch(actions.login(user.uid));
    //store.dispatch(actions.startAddTodos());
    //hashHistory.push('/todos');
  } else {
    //store.dispatch(actions.logout());
    //hashHistory.push('/');
  }
});


// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);

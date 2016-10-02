import * as redux from 'redux';
import thunk from 'redux-thunk';

import {additionalFieldsReducer, authReducer, eventsReducer, storageReducer} from 'reducers'

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    additionalFields: additionalFieldsReducer,
    auth: authReducer,
    events: eventsReducer,
    storage: storageReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};

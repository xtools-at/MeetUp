import moment from 'moment';

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export var eventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [
        ...state,
        action.event
      ];
    case 'GET_EVENTS':
      return [
        ...state,
        ...action.events
      ];
    case 'LOGOUT':
      return [...state];
    default:
      return state;
  }
};

export var storageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_LOCATION':
      return {
        ...state,
        userLat : action.userLat,
        userLng : action.userLng
      };
    case 'STORE_GOOGLE':
      return {
        ...state,
        ...action.google
      };
    case 'STORE_MAP':
      return {
        ...state,
        ...action.map
      };
    case 'LOGOUT':
      return {
        ...state
      };
    default:
      return state;
  }
};

export var additionalFieldsReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW':
      return !state;
    default:
      return state;
  }
};
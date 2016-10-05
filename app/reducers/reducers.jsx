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

export var storageReducer = (state = {
  userLat: '',
  userLng: '',
  activeEvent: '',
  toggleMap: false
  }, action) => {
  switch (action.type) {
    case 'STORE_LOCATION':
      return {
        ...state,
        userLat : action.userLat,
        userLng : action.userLng
      };
    case 'SET_ACTIVE_EVENT':
      return {
        ...state,
        activeEvent: action.activeEvent
      };
    case 'SET_MAP_CENTER':
      return {
        ...state,
        mapCenter: action.mapCenter
      };
    case 'TOGGLE_MAP':
      var toggle = !(state.toggleMap);
      return {
        ...state,
        toggleMap: toggle
      };
    case 'SET_TOGGLE_MAP':
      return {
        ...state,
        toggleMap: action.toggleMap
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
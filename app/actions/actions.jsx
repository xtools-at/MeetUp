import moment from 'moment';
import axios from 'axios';
var {hashHistory} = require('react-router');
import Helper from 'Helper';

import firebase, {dbRef} from 'app/firebase/';


//Auth
export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startOauthLogin = (provider) => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(provider).then((result) => {
      //console.log('Auth worked', result);
    }, (error) => {
      //console.log('Unable to Oauth', error);
    });
  };
};

export var startRegister = (email, encryptedPassword, username) => {
  return (dispatch) => {
    return firebase.auth().createUserWithEmailAndPassword(email, encryptedPassword).then(
      ()=>{
        Helper.toast('You have registered succesfully!');
        //Save Username
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: username,
        }).then(function() {
          //console.log('saved displayName to DB');
        }, function(error) {
          //console.log('Error saving displayName to DB', error);
        });
      }, (error)=>{
      //console.log('Unable to Register', error);
      Helper.toast('Unable to Register - please try again!');
    });
  };
};

/*
export var saveUsername = (username) => {
  var user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: username,
  }).then(function() {
    console.log('saved displayName to DB');
  }, function(error) {
    console.log('Error saving displayName to DB', error);
  });
}
*/

export var startLogin = (email, encryptedPassword) => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(email, encryptedPassword).then(
      ()=>{
        Helper.toast('You have logged in succesfully!');
      }).catch((error)=>{
      //console.log('Unable to Login', error);
      Helper.toast('Could not log you in - please check your Email and Password!');
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      Helper.toast('Succesfully signed out!');
    });
  };
};


//Store custom Data
export var storeLocation = (lat, lng) => {
  return {
    type: 'STORE_LOCATION',
    userLat: lat,
    userLng: lng
  };
};

export var setActiveEvent = (eventId) => {
  return {
    type: 'SET_ACTIVE_EVENT',
    activeEvent: eventId
  }
}

export var setMapCenter = (lat, lng) => {
  return {
    type: 'SET_MAP_CENTER',
    mapCenter: {lat, lng}
  }
}

export var toggleMap = () => {
  return {
    type: 'TOGGLE_MAP'
  }
}

export var setToggleMap = (setTo) => {
  return {
    type: 'SET_TOGGLE_MAP',
    toggleMap: setTo
  }
}

/*
export var fetchIpLocation = () => {
  return (dispatch, getState) => {
    var coords = axios.get('http://ipinfo.io');
    return coords.then((res) => {
      if (res.data.loc){
        try{
          var latLngArray = res.data.loc.split(',');

          dispatch(storeLocation(latLngArray[0],latLngArray[1]));
        } catch (e){
          console.log(e);
        }
      }
    });
  };
}
*/

//Add Events
export var addEvent = (event) => {
  return {
    type: 'ADD_EVENT',
    event
  };
};

export var startAddEvent = (title, description, type, address, lat = '',lng = '', timeStart, timeEnd, host, guests) => {
  return (dispatch, getState) => {
    var event = {
      title, 
      description, 
      type, 
      address, 
      lat,
      lng, 
      timeStart, 
      timeEnd, 
      host, 
      guests
    };
    
    var eventSave = dbRef.child('events').push(event);
    return eventSave.then(() => {
      dispatch(addEvent(event));
      hashHistory.push('/');
      Helper.toast('Event has been created succesfully!');
    }).catch((error)=>{
      Helper.toast('Unable to save Event - please try again!');
    });
  };
};


export var getEvents = (events) => {
  return {
    type: 'GET_EVENTS',
    events
  };
};

export var startGetEvents = () => {
  return (dispatch, getState) => {

    var eventsRef = dbRef.child('events');

    return eventsRef.once('value').then((snapshot) => {
      var events = snapshot.val() || {};
      var parsedEvents = [];

      Object.keys(events).forEach((eventId) => {
        parsedEvents.push({
          id: eventId,
          ...events[eventId]
        });
      });

      dispatch(getEvents(parsedEvents));
    });
  };
};

export var toggleAdditionalFields = () => {
  return {
    type: 'TOGGLE_SHOW'
  };
};
import React from 'react';
import * as Redux from 'react-redux';
import firebase from 'app/firebase/';
import sideNav from 'materialize-css/dist/js/materialize.min'
//import {hashHistory} from 'react-router';

import * as actions from 'actions';

export var Header = React.createClass({
	componentDidMount() {
    	$(".button-collapse").sideNav();
	},
	onLogout(ev){
		ev.preventDefault();
		this.hideNav();
	    var {dispatch} = this.props;
	    dispatch(actions.startLogout());
  	},
  	hideNav(){
  		$(".button-collapse").sideNav('hide');
  	},
  	toggleMap(ev){
  		ev.preventDefault();
  		var {dispatch} = this.props;
  		dispatch(actions.toggleMap());
  	},
  	untoggleMap(){
        var {dispatch} = this.props;
        dispatch(
            {
                type: 'SET_TOGGLE_MAP',
                toggleMap: false
            }
        );
    },
    render() {
    	var user = firebase.auth().currentUser;
    	var {toggleMap} = this.props.storage;
    	
    	var navIconActive ='';
    	if (toggleMap){
    		//show Map on Mobile -> set Icon to active
    		navIconActive="active"
    	}

    	function renderLinks(self){
			if (user) {
			 return(
			    <ul className="right hide-on-med-and-down" onClick={self.untoggleMap}>
					<li><a className="waves-effect" href="#/add"><i className="material-icons left">add</i>Add Event</a></li>
			        <li><a className="waves-effect" href="#/" onClick={self.onLogout}><i className="material-icons left">close</i>Logout</a></li>
			        <li><a className="waves-effect" href="https://github.com/xtools-at/MeetUp" target="_blank"><i className="material-icons left">code</i>Fork on Github</a></li>
			    </ul>
			 );
			} else {
				return(
			      <ul className="right hide-on-med-and-down" onClick={self.untoggleMap}>
					<li><a className="waves-effect" href="#/login"><i className="material-icons left">account_circle</i>Login</a></li>
			        <li><a className="waves-effect" href="https://github.com/xtools-at/MeetUp" target="_blank"><i className="material-icons left">code</i>Fork on Github</a></li>
			      </ul>
			    );
			}
    	}

    	function renderMobileNav(self){
				if (user){
					return (
						<ul id="mobile-nav" className="side-nav" onClick={self.untoggleMap}>
						    <li><div className="userView">
						      <img className="background" src="/images/bg_nav.png" />
						      <img className="circle" src="/images/useravatar.png" />
						      <span className="white-text name">{user.displayName}</span>
						      <span className="white-text email">{user.email}</span>
						    </div></li>
						    <li><a className="waves-effect" href="#/add" onClick={self.hideNav}><i className="material-icons">add</i>Add Event</a></li>
						    <li><a className="waves-effect" href="#/" onClick={self.onLogout}><i className="material-icons">close</i>Logout</a></li>
						    <li><div className="divider"></div></li>
						    <li><a className="waves-effect" href="https://github.com/xtools-at/MeetUp" target="_blank"><i className="material-icons">code</i>Fork on Github</a></li>
					    </ul>
					);
				} else {
					return(
						<ul id="mobile-nav" className="side-nav" onClick={self.untoggleMap}>
						    <li><div className="userView">
						    	<img className="background" src="/images/bg_nav.png" />
						      	<a href="#/login"><span className="white-text name">Not logged in</span></a>
						    </div></li>
						    <li><a className="waves-effect" href="#/login" onClick={self.hideNav}><i className="material-icons">account_circle</i>Login</a></li>
				        	<li><div className="divider"></div></li>
						    <li><a className="waves-effect" href="https://github.com/xtools-at/MeetUp" target="_blank"><i className="material-icons">code</i>Fork on Github</a></li>
					    </ul>
					);
				}
    	}

      return (
        <header>
         	<nav>
			    <div className="nav-wrapper">
		      	<a href="#/" className="brand-logo" onClick={this.untoggleMap}><i className="material-icons">event_note</i>MeetUp</a>
		      	<a data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>
						<ul className="right">
				 			<li className={navIconActive}>
				 				<a href="#/" onClick={this.toggleMap}>
					 				<i className="material-icons left">map</i>
					 				<span className="sr-only">Toggle Map</span>
					 			</a>
					 		</li>
				 		</ul>
			  		{renderLinks(this)}
			  		{renderMobileNav(this)}
			    </div>
		  	</nav>
      </header>
    );
  }
});

export default Redux.connect(
    (state) => {
    return state;
  }
)(Header);
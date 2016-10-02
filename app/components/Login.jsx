import React from 'react';
import * as Redux from 'react-redux';
import crypto from 'crypto';
//import {githubProvider, googleProvider} from 'app/firebase/';

import * as actions from 'actions';

export var Login = React.createClass({

  onOauthLogin(provider) {
    /*
    var {dispatch} = this.props;
    dispatch(actions.startOauthLogin(provider));
    //onClick={() => {this.onOauthLogin(githubProvider)}}
    */
  },

  onToggleAdditionalFields(){
    console.log('onToggleAdditionalFields');
    var {dispatch} = this.props;
    dispatch(actions.toggleAdditionalFields());
  },

  onRegister(ev) {
    ev.preventDefault();
    var {dispatch} = this.props;
    var email = this.refs.user_email.value;
    var name = this.refs.user_name.value;
    var encryptedPassword = crypto.createHash('sha256').update(this.refs.user_password.value).digest('hex');
    console.log('onRegister called', email, name, encryptedPassword);
    dispatch(actions.startRegister(email, encryptedPassword, name));
  },

  onLogin(ev) {
    ev.preventDefault();
    var {dispatch} = this.props;
    var email = this.refs.user_email.value;
    var encryptedPassword = crypto.createHash('sha256').update(this.refs.user_password.value).digest('hex');
    console.log('onLogin called', email, encryptedPassword);
    dispatch(actions.startLogin(email, encryptedPassword));
  },

  render() {
    var {login} = this.props.route;
    var heading,subText,usernameInput,button,additionalInfosToggle, additionalFields, autofocusEmail;

    if (this.props.additionalFields){
      additionalFields=(
        <div>
          Add Fields
        </div>
      );
    } else {
      additionalFields='';
    }
    

    if (login) {
      heading = 'Login';
      subText = (
        <p className="center">Do not have an account yet? <a href="#/register">Register here</a>!</p>
      );
      usernameInput = '';
      button = (
          <button className="btn btn-large waves-effect waves-light" type="submit" onClick={this.onLogin} name="action">
            Login
            <i className="material-icons right">send</i>
          </button>
      );
      additionalInfosToggle = '';
      autofocusEmail='true';

    } else {
      heading = 'Register';
      subText = (
        <p className="center">Already have an account? <a href="#/login">Login</a> instead!</p>
      );
      usernameInput = (
        <div className="input-field col s12">
            <input type="text" 
              className="validate" 
              placeholder="Guybrush Threepwood or Frank-the-Tank" 
              id="user_name" 
              ref="user_name" 
              name="name" 
              autoComplete="name"
              autoFocus="true" 
              required/>
            <label htmlFor="user_name" className="active">Your Name or Username</label>
          </div>
      );
      button = (
          <button className="btn btn-large waves-effect waves-light" type="submit" onClick={this.onRegister} name="action">
            Register
            <i className="material-icons right">send</i>
          </button>
      );
      additionalInfosToggle = (
        <div className="switch">
          <label htmlFor="register_infos">
            <input id="register_infos" type="checkbox" onChange={this.onToggleAdditionalFields}></input>
            <span className="lever"></span>
            Tell us more about you! (optional)
          </label>
        </div>
      );
      autofocusEmail='false';
    }




    return (
      <div className="row">
        <div className="col s12">
          <h1 tabIndex="1" className="center">{heading}</h1>
          {subText}
        </div>
        
        <form className="col s12" autoComplete="on">
          {usernameInput}
          <div className="input-field col s12">
            <input type="email" 
              className="validate" 
              placeholder="foo@bar.com" 
              id="user_email" 
              ref="user_email" 
              name="email" 
              autoComplete="email" 
              autoFocus={autofocusEmail} 
              required/>
            <label htmlFor="user_email" className="active">E-Mail</label>
          </div>
          <div className="input-field col s12">
            <input type="password"
              className="validate" 
              pattern="^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$"  
              placeholder="**********" 
              id="user_password" 
              ref="user_password" 
              name="password" 
              autoComplete="password" 
              required/>
            <label htmlFor="user_password" className="active">Password</label>
        	</div>
          {additionalInfosToggle}
          {additionalFields}
          <div className="center">
            {button}
          </div>
        </form>

      </div>
		);
	}
});


export default Redux.connect(
    (state) => {
    return state;
  }
)(Login);

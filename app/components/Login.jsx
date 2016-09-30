import React from 'react';
import * as Redux from 'react-redux';
import crypto from 'crypto';
import {githubProvider, googleProvider} from 'app/firebase/';

import * as actions from 'actions';

export var Login = React.createClass({

  onOauthLogin(provider) {
    var {dispatch} = this.props;
    dispatch(actions.startOauthLogin(provider));
  },

  onRegister(ev) {
    ev.preventDefault();
    var {dispatch} = this.props;
    var email = this.refs.user_email.value;
    var encryptedPassword = crypto.createHash('sha256').update(this.refs.user_password.value).digest('hex');
    console.log('onRegister called', email, encryptedPassword);
    dispatch(actions.startRegister(email, encryptedPassword));
  },

  onLogin(ev) {
    ev.preventDefault();
    var {dispatch} = this.props;
    var email = this.refs.user_email.value;
    var encryptedPassword = crypto.createHash('sha256').update(this.refs.user_password.value).digest('hex');
    console.log('onLogin called', email, encryptedPassword);
    dispatch(actions.startLogin(email, encryptedPassword));
  },

  onLogout(){
    var {dispatch} = this.props;
    dispatch(actions.startLogout());
  },

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <h2>Login or Register</h2>
          <button className="button" onClick={() => {this.onOauthLogin(githubProvider)}}>Login With GitHub</button>
          <button className="button" onClick={() => {this.onOauthLogin(googleProvider)}}>Login With Google</button>
        </div>
        
        <form className="col s12" autoComplete="on">
          <div className="input-field col s12">
            <input type="email" 
              className="validate" 
              placeholder="" 
              id="user_email" 
              ref="user_email" 
              autofocus="true" 
              name="" 
              autoComplete="" 
              required/>
            <label htmlFor="user_email">E-Mail</label>
          </div>
          <div className="input-field col s12">
            <input type="password"
              className="validate" 
              pattern="^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$"  
              placeholder="" 
              id="user_password" 
              ref="user_password" 
              name="" 
              autoComplete="" 
              required/>
            <label htmlFor="user_password">Password</label>
        	</div>

        	<button className="btn waves-effect waves-light" type="submit" onClick={this.onRegister} name="action">
            Register
            <i className="material-icons right">send</i>
          </button>

          <button className="btn waves-effect waves-light" type="submit" onClick={this.onLogin} name="action">
            Login
            <i className="material-icons right">send</i>
          </button>

          <button className="btn waves-effect waves-light" type="submit" onClick={this.onLogout} name="action">
            Logout
            <i className="material-icons right">send</i>
          </button>

        </form>

      </div>
		);
	}
});


export default Redux.connect()(Login);

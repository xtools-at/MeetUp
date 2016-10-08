import React from 'react';
import ReactDOM from 'react-dom'
import * as Redux from 'react-redux';
import crypto from 'crypto';
import moment from 'moment';
//import {githubProvider, googleProvider} from 'app/firebase/';

import * as actions from 'actions';
import Helper from 'Helper';

export var Login = React.createClass({
  /*
  onOauthLogin(provider) {
    
    var {dispatch} = this.props;
    dispatch(actions.startOauthLogin(provider));
    //onClick={() => {this.onOauthLogin(githubProvider)}}
    
  },
  */
  onToggleAdditionalFields(){
    //console.log('onToggleAdditionalFields');
    var {dispatch} = this.props;
    dispatch(actions.toggleAdditionalFields());
  },

  onRegister(ev) {
    ev.preventDefault();
    if (ReactDOM.findDOMNode(this.refs.login_form).checkValidity()){
      //https://jsfiddle.net/scgymqct/
      var {dispatch} = this.props;
      var email = this.refs.user_email.value;
      var name = this.refs.user_name.value;
      var encryptedPassword = crypto.createHash('sha256').update(this.refs.user_password.value).digest('hex');
      //console.log('onRegister called', email, name, encryptedPassword);
      dispatch(actions.startRegister(email, encryptedPassword, name));
    } else {
      this.validateAll();
    }
  },

  onLogin(ev) {
    ev.preventDefault();
    if (ReactDOM.findDOMNode(this.refs.login_form).checkValidity()){
      var {dispatch} = this.props;
      var email = this.refs.user_email.value;
      var encryptedPassword = crypto.createHash('sha256').update(this.refs.user_password.value).digest('hex');
      //console.log('onLogin called', email, encryptedPassword);
      dispatch(actions.startLogin(email, encryptedPassword));
    } else {
      this.validateAll();
    }
  },

  validateAll(){
    $('input').each(function(i, el){
      if (el.checkValidity()){
        $(el).addClass('valid').removeClass('invalid');
      } else {
        $(el).addClass('invalid').removeClass('valid');
      }
    });
    Helper.toast('Something is wrong up there, please check your Input!');
  },

  onValidate(ev) {
    ev.target.checkValidity();
    //console.log('onValidate', ev.target);
  },

  valiDate(ev) {
    var obj = ev.target;
    if (obj.checkValidity()){
      $(obj).addClass('valid').removeClass('invalid');
    } else {
      $(obj).addClass('invalid').removeClass('valid');
    }
    //console.log('valiDate', obj);
  },

  render() {
    var {login} = this.props.route;
    var heading,subText,usernameInput,button,additionalInfosToggle, additionalFields, autofocusEmail, passwordErrorText, passwordSecurityInfo;
    

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
      additionalFields='';
      passwordErrorText = 'Your password is incorrect';
      passwordSecurityInfo = '';

    } else {
      heading = 'Register';
      subText = (
        <p className="center">Already have an account? <a href="#/login">Login</a> instead!</p>
      );
      usernameInput = (
        <div className="input-field col s12">
            <input type="text" 
              className="validate" 
              onBlur={this.onValidate} 
              placeholder="Guybrush Threepwood or Frank-the-Tank" 
              id="user_name" 
              ref="user_name" 
              name="name" 
              autoComplete="name"
              autoFocus="true" 
              pattern="^.{3,}$"
              required/>
            <label htmlFor="user_name" className="active" data-error="Please enter at least 3 Characters">Your Name or Username</label>
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
            <input id="register_infos" type="checkbox" checked={this.props.additionalFields} onChange={this.onToggleAdditionalFields}></input>
            <span className="lever"></span>
            Tell us more about you! (optional)
          </label>
        </div>
      );
      autofocusEmail='false';
      passwordErrorText = 'Your password must meet the following criteria: At least 8 characters long and at least one lowercase, uppercase Letter and one Number';
      passwordSecurityInfo = (
        <p style={{fontSize: '0.8rem'}}>Your password is transmitted and stored military-grade encrypted.</p>
      );

      if (this.props.additionalFields){
        additionalFields=(
          <div>

            <div className="input-field col s12">
              <input type="text" id="add_employer" placeholder="Google" className="validate"/>
              <label htmlFor="add_employer" className="active">Employer</label>
            </div>

            <div className="input-field col s12">
              <input type="text" id="add_jobtitle" placeholder="Senior Web Developer" className="validate"/>
              <label htmlFor="add_jobtitle" className="active">Job Title</label>
            </div>

            <div className="input-field col s12">
              <input type="date" 
                onBlur={this.valiDate} 
                className="validate" 
                max={moment().format('YYYY-MM-DD')} 
                min="1900-01-01"
                id="add_birthday" 
                placeholder="31.01.1980"/>
              <label htmlFor="add_birthday" className="active" data-error="Wait... what? Not really!">When is your Birthday</label>
            </div>

            <div className="input-field col s12">
              <input type="text" list="add_starwars_list" id="add_starwars" placeholder="Return of the Jedi" className="validate"/>
              <datalist id="add_starwars_list">
                <option value="Star Wars" />
                <option value="The Empire Strikes Back" />
                <option value="Return of the Jedi" />
                <option value="The Phantom Menace" />
                <option value="Attack of the Clones" />
                <option value="Revenge of the Sith" />
                <option value="The Force Awakens" />
                <option value="really??" />
              </datalist>
              <label htmlFor="add_starwars" className="active">Favourite Star Wars Movie?</label>
            </div>

            <div className="input-field col s12">
              <input type="text" list="add_tabs_list" id="add_tabs" placeholder="Tabs" className="validate"/>
              <datalist id="add_tabs_list">
                <option value="Tabs" />
                <option value="Tabs!!!" />
                <option value="Oh God Tabs!" />
                <option value="Spaces" />
                <option value="Mixing it wildly" />
                <option value="Semicolons" />
                <option value="Oh come on..." />
              </datalist>
              <label htmlFor="add_tabs" className="active">Tabs or Spaces?</label>
            </div>

            <div className="input-field col s12">
              <input type="text" list="add_framework_list" id="add_framework" placeholder="React" className="validate"/>
              <datalist id="add_framework_list">
                <option value="React" />
                <option value="Angular" />
                <option value="Meteor" />
                <option value="jQuery" />
                <option value="Bootstrap" />
                <option value="Foundation" />
                <option value="Other" />
                <option value="Why did you not include {...}.js?" />
              </datalist>
              <label htmlFor="add_tabs" className="active">Favourite Front-End Framework?</label>
            </div>
            
          </div>
        );
      } else {
        additionalFields='';
      }
    }




    return (
      <div className="row">
        <div className="col s12">
          <h1 tabIndex="1" className="center">{heading}</h1>
          {subText}
        </div>
        
        <form className="col s12" autoComplete="on" id="login_form" ref="login_form">
          {usernameInput}
          <div className="input-field col s12">
            <input type="email" 
              onBlur={this.onValidate} 
              className="validate" 
              placeholder="foo@bar.com" 
              id="user_email" 
              ref="user_email" 
              name="email" 
              autoComplete="email" 
              autoFocus={autofocusEmail} 
              required/>
            <label htmlFor="user_email" className="active" data-error="This does not look like an E-Mail">E-Mail</label>
          </div>
          <div className="input-field col s12">
            <input type="password"
              onBlur={this.onValidate} 
              className="validate" 
              pattern="^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$"  
              placeholder="**********" 
              id="user_password" 
              ref="user_password" 
              name="password" 
              autoComplete="password" 
              required/>
            <label htmlFor="user_password" className="active" data-error={passwordErrorText}>Password</label>
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

import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export var Login = React.createClass({
  onLogin() {
    var {dispatch} = this.props;
    dispatch(actions.startLogin());
  },
  render() {

    
    return (
      <div className="row">
        <div className="col s12">
          <h2>Login or Register</h2>
        </div>
        <button className="button" onClick={this.onLogin}>Login With GitHub</button>
      </div>
});

export default Redux.connect()(Login);

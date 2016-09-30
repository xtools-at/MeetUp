import React from 'react';
import * as Redux from 'react-redux';
import {hashHistory} from 'react-router';

export var ActionButton = React.createClass({

    render() {

        var route;
        var icon;

		if (this.props && this.props.auth && this.props.auth.uid){
            //user is logged in
            route = '/add';
            icon = 'add';
		} else {
            route = '/login';
            icon = 'account_circle';
		}

        return (
            <div className="fixed-action-btn">
                <a onClick={() => {hashHistory.push(route)}} className="btn-floating btn-large orange accent-4 waves-effect waves-light">
                  <i className="large material-icons">{icon}</i>
                </a>
            </div>
        );
    }
});

export default Redux.connect(
    (state) => {
    return state;
  }
)(ActionButton);
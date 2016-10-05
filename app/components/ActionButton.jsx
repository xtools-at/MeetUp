import React from 'react';
import * as Redux from 'react-redux';
import {hashHistory} from 'react-router';

import * as actions from 'actions';

export var ActionButton = React.createClass({

    onFabClick(route){
        hashHistory.push(route);
        var {dispatch} = this.props;
        dispatch(
            {
                type: 'SET_TOGGLE_MAP',
                toggleMap: false
            }
        );
    },

    render() {

        /*
        //hide Fab if on AddEvent Page
        if (???){
            return '';
        }
        */

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
                <a onClick={() => {this.onFabClick(route)}} className="btn-floating btn-large deep-orange waves-effect waves-light">
                  <i className="large material-icons">{icon}</i>
                </a>
            </div>
        );
    }
});

export default Redux.connect(
    (state) => {
        return {
            auth: state.auth
        };
    }
)(ActionButton);
import React from 'react';
import * as Redux from 'react-redux';
import {hashHistory} from 'react-router';

export var ActionButton = React.createClass({
    displayName: 'ActionButton',

    onFabClick(isLoggedIn){
    	if (isLoggedIn){
    		hashHistory.push('/add');
    	} else {
    		hashHistory.push('/login');
    	}
    },

    render() {

    	function renderFAB() {
    		if (this.props.isLoggedIn){
    		    return (
    			 <a onClick={onFabClick(true)} className="btn-floating btn-large waves-effect waves-light red">
	             	<i className="material-icons">add</i>
	             </a>
    			);
    		} else {
    			return (
    			 <a onClick={onFabClick(false)} className="btn-floating btn-large waves-effect waves-light red">
	             	<i className="material-icons">account_circle</i>
	             </a>
    			);
    		}
    	}

        return (
            {renderFAB()}
        );
    }
});

export default Redux.connect()(ActionButton);
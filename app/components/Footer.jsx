import React from 'react';
import * as actions from 'actions';
//import * as Redux from 'react-redux';

export var Footer = React.createClass({
	onLogout(){
		var {dispatch} = this.props;
		//dispatch(actions.startLogout());
	},
    render() {
        return (
            <footer className="col s12 blue" onClick={this.onLogout}>Footer</footer>
        );
    }
});

module.exports = Footer;
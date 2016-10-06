import React from 'react';
import * as actions from 'actions';
import * as Redux from 'react-redux';

export var Footer = React.createClass({
    render() {
        return (
            <footer className="page-footer">
	          <div className="footer-copyright">
	            <div className="container">
	            	<div className="row center">
	            		<div className="col s12 m4">
	            			© 2016 <a className="grey-text text-lighten-4" target="_blank" href="http://www.xtools.at">xTools</a>
	            		</div>
	            		<div className="col s12 m8">
	            			Built with&nbsp;
	            			<a className="grey-text text-lighten-4" target="_blank" href="https://facebook.github.io/react/">React</a>,&nbsp; 
	            			<a className="grey-text text-lighten-4" target="_blank" href="http://redux.js.org">Redux</a>,&nbsp;
	            			<a className="grey-text text-lighten-4" target="_blank" href="https://nodejs.org/en/">Node.js</a> and&nbsp;
	            			<a className="grey-text text-lighten-4" target="_blank" href="http://materializecss.com/">Materialize</a> for&nbsp;
	            			<a className="grey-text text-lighten-4" target="_blank" href="https://www.udacity.com/course/senior-web-developer-nanodegree-by-google--nd802">Udacity</a>.
	            		</div>
	            	</div>
	            </div>
	          </div>
	        </footer>
        );
    }
});

export default Redux.connect()(Footer);
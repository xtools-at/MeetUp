import React from 'react';
import router from 'app/router/';
import * as Redux from 'react-redux';

export var ContentContainer = React.createClass({
    render() {
        return (
             <main className="row">
		      <div className="col s12 m5">
		        <div className="card-panel">
		        	{router}
		        </div>
		      </div>
		    </main>
        );
    }
});

export default Redux.connect()(ContentContainer);
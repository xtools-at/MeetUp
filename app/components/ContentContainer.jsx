import React from 'react';
import * as Redux from 'react-redux';

import router from 'app/router/';

export var ContentContainer = React.createClass({
    render() {
        return (
          <main className="col s12 m8 l5">
	        <div className="card-panel">
	        	{router}
	        </div>
		  </main>
        );
    }
});

export default Redux.connect()(ContentContainer);
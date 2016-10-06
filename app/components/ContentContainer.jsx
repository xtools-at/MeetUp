import React from 'react';
import * as Redux from 'react-redux';

import router from 'app/router/';

export var ContentContainer = React.createClass({

    render() {

        var {toggleMap} = this.props.storage;
    	//var mapActive ='col s12 m8 l5';
        var mapActive = 'col ';

    	if (toggleMap){
    		//show Map on Mobile -> push Container to side
    		mapActive += "push";
    	}

        return (
          <main className={mapActive}>
	        <div className="card-panel">
	        	{router}
	        </div>
		  </main>
        );
    }
});

export default Redux.connect(
	(state) =>{
        return {
            storage: state.storage
        };
	}
)(ContentContainer);
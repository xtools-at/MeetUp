import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export var Event = React.createClass({
  render() {
  	var {title, host, location, timeFrom, timeTo, description, latLng, type} = this.props;
  	var distance = '100';
    return (
	    <div className="card horizontal">
	      <div className="card-image">
	        <i className="material-icons large">event_note</i>
	      </div>
	      <div className="card-stacked">
	        <div className="card-content">
	        	<h3>{title}</h3>
				<span className="chip">{type}</span>
	          	<p>
	          		<i className="material-icons">account_circle</i>
	          		by {host}
	          	</p>
	          	<p>
	          		<i className="material-icons">location_on</i>
	          		{location} - <span>~{distance}km away from you</span>
	          	</p>
	          	<p>
	          		<i className="material-icons">access_time</i>
	          		{timeFrom} to {timeTo}
	          	</p>
	          	<p>{description}</p>
	        </div>
	      </div>
	    </div>
    )
  }
});

export default Redux.connect()(Event);
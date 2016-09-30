import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';

export var Event = React.createClass({
  render() {

  	var {title, description, type, address, latLng, timeStart, host} = this.props;
  	timeStart = moment(timeStart).format('D.MMM.\'YY @ HH:mm');

  	Number.prototype.toRad = function() {
   		return this * Math.PI / 180;
	}

	function calculateDistanceInKm(lat1, lon1, lat2, lon2){
		var R = 6371; //km
		var x1 = lat2-lat1;
		var dLat = x1.toRad();  
		var x2 = lon2-lon1;
		var dLon = x2.toRad();  
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
		                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
		                Math.sin(dLon/2) * Math.sin(dLon/2);  
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; 

		return(d);
	}

	function showLocationElement() {
		if (latLng != ''){
			var latLngArray = latLng.split(',');
			var distance = calculateDistanceInKm(latLngArray[0],latLngArray[1], 37.778519, -122.405640);
			return (
				<span className="chip">~{distance}km away from you</span>
			);
		} else {
			return;
		}
	}

	

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
	          		{address}
	          		{this.showLocationElement}
	          	</p>
	          	<p>
	          		<i className="material-icons">access_time</i>
	          		starting {timeStart}
	          	</p>
	          	<p>{description}</p>
	        </div>
	      </div>
	    </div>
    )
  }
});

export default Redux.connect()(Event);
import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';

export var Event = React.createClass({
	onEventClick(){
		var {dispatch, id, lat, lng} = this.props;
		dispatch(actions.setActiveEvent(id));
		if (typeof lat != 'undefined' && lat != ''){
			dispatch(actions.setMapCenter(lat, lng));
		}
	},

	render() {

	  	var {id, title, description, type, address, lat, lng, timeStart, host, userLat, userLng, index} = this.props;
	  	timeStart = moment(timeStart).format('D.MMM.\'YY @ HH:mm');

		function calculateDistanceInKm(lat1, lon1, lat2, lon2){
			var R = 6371; //km
			var toRad = Math.PI / 180;
			var dLat = (lat2-lat1)*toRad;  
			var dLon = (lon2-lon1)*toRad;  
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
			                Math.cos(lat1*toRad) * Math.cos(lat2*toRad) * 
			                Math.sin(dLon/2) * Math.sin(dLon/2);  
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c; 

			return(parseInt(d));
		}

		function showLocationElement() {
			//console.log("Event LatLng:",lat, lng, userLat, userLng);
			if (typeof lat != 'undefined' && typeof lng != 'undefined' && lat != '' && lng != ''){
				var distance = calculateDistanceInKm(lat, lng, userLat, userLng);
				if (distance !== distance){
					//value is NaN
					return;
				}
				return (
					<span className="chip"><i className="material-icons chip-icon">near_me</i>~{distance} km away from you</span>
				);
			} else {
				return;
			}
		}

		var isEventActive = (id == this.props.activeEvent) ? 'card horizontal teal lighten-4' : 'card horizontal';
		var randomImageSrc = "https://loremflickr.com/200/380/city?random="+index;

		

	    return (
		    <div className={isEventActive} id={id} onClick={this.onEventClick}>
		      <div className="card-image">
		        <img src={randomImageSrc} alt="" />
		      </div>
		      <div className="card-stacked">
		        <div className="card-content">
		        	<h2>
		        		<span className="card-title">{title}</span> <span className="card-title grey-text event-host">by {host}</span>
		        	</h2>
		        	<div>
		        		<span className="chip"><i className="material-icons chip-icon">event_note</i>{type}</span>&nbsp;
		        		{showLocationElement()}
		        	</div>
		        	<ul className="collection">
					    <li className="collection-item"><i className="material-icons">access_time</i>starting {timeStart}</li>
					    <li className="collection-item"><i className="material-icons">location_on</i>{address}</li>
				    </ul>
		          	<div className="event-description grey-text text-darken-2">"{description}"</div>
		        </div>
		      </div>
		    </div>
	    )
	  }
	});

export default Redux.connect()(Event);
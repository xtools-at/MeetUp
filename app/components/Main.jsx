import React from 'react';
import * as Redux from 'react-redux';
import {GoogleApiWrapper, Marker} from 'google-maps-react';
import axios from 'axios';

import actions from 'actions';

import Header from 'Header';
import Footer from 'Footer';
import Map from 'Map';
import ContentContainer from 'ContentContainer';
import ActionButton from 'ActionButton';

export var Main = React.createClass({

	componentDidMount() {
			//fetch user location
			var dispatch = this.props.dispatch;
	    	var coords = axios.get('http://ipinfo.io').then((res) => {
	    		console.log(res.data);
		      if (res.data.loc){
		        try{
		          var latLngArray = res.data.loc.split(',');

		          dispatch(
		          	{
					    type: 'STORE_LOCATION',
					    userLat: latLngArray[0],
					    userLng: latLngArray[1]
					 }
		          );
		        } catch (e){
		          console.log(e);
		        }
		      }
	   		})
	},

	onMarkerClick(eventId){
		var {dispatch} = this.props;
		dispatch(
			{
			   type: 'SET_ACTIVE_EVENT',
			   activeEvent: eventId
			}
		);
		$('main>.card-panel').scrollTop('#'+eventId);
	},
	
    render() {
    
   		function renderMarkers(self) {
   			var {events} = self.props;
			var markers = '';

			if (typeof events != 'undefined'){
		   		markers = events.map((event, i)=>{
		   			var position = {
		   				lat: event.lat,
		   				lng: event.lng
		   			};
		   			return <Marker position={position} name={event.title} key={event.id} onClick={()=>{self.onMarkerClick(event.id)}}/>;
		   		});
	   		}
	   			
	   		return markers;
   		}

   		var {storage, google} = this.props;

        return (
        	var center = (storage.mapCenter && storage.mapCenter.lat) ? {storage.mapCenter} : {lat: storage.userLat, lng: storage.userLng};

           	<div className="row overall-container">
           		<Header />
        		<Map google={google} center={center}>
        			{renderMarkers(this)}
        		</Map>
        		<ContentContainer />
        		<ActionButton />
        		<Footer />
      		</div>
        );
    }
});

export default Redux.connect(
	(state) => {
    	return state;
  	}
)(GoogleApiWrapper({
  apiKey: process.env.MAPS_API_KEY
})(Main));
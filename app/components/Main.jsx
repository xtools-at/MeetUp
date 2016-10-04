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
import Helper from 'Helper';

export var Main = React.createClass({

	componentDidMount() {

			//testing toasts
			Helper.toast('Just checking out');

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

   			/*
   			//Dummy Data
   			var locs = [
				{
					id: 1,
					name: 'loc1',
					position: {lat: 37.778519, lng: -122.405640}
				},
				{
					id: 2,
					name: 'loc2',
					position: {lat: 37.759703, lng: -122.428093}
				},
				{
					id: 3,
					name: 'loc3',
					position: {lat: 37.768519, lng: -122.415640}
				}
			];
			*/
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
           	<div className="row overall-container">
           		<Header />
        		<Map google={google} center={{lat: storage.userLat, lng: storage.userLng}}>
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
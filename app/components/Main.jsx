var React = require('react');
import {GoogleApiWrapper, Marker} from 'google-maps-react';
var axios = require('axios');

var Header = require('Header');
var Footer = require('Footer');
import Map from 'Map';
import ContentContainer from 'ContentContainer';
import ActionButton from 'ActionButton';

export var Main = React.createClass({

	componentDidMount() {
		axios.get('http://ipinfo.io').then(function (res) {
			if (res.data.loc){
				//dispatch res.data.loc as userLocation  //=> "48.2000,16.3667"
			} else {
				//error
			}
	    }, function (res) {
	      //error
	    });
	},

	componentWillReceiveProps(nextProps) {
	    if (this.props.google != nextProps.google){
	    	//dispatch google object
	    }  
	},
	
    render() {

   		function renderMarkers() {
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

	   		var markers = locs.map((object, i)=>{
	   			return <Marker position={object.position} name={object.name} key={i} />;
	   		});
	   			
	   		return markers;
   		}

        return (
           	<div className="row overall-container">
           		<Header />
        		<Map google={this.props.google}>
        			{renderMarkers()}
        		</Map>
        		<ContentContainer />
        		<ActionButton />
        		<Footer />
      		</div>
        );
    }
});

//module.exports = Main;
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBDKoNEeqWSY0MzlUyALFAA2x2hexMrEFs'
})(Main);
import React from 'react';
import ReactDOM from 'react-dom'
import * as Redux from 'react-redux';
import moment from 'moment';
import {GoogleApiWrapper} from 'google-maps-react';

import firebase from 'app/firebase/';
import * as actions from 'actions';

export var AddEvent = React.createClass({

  initAutocomplete(nextProps){
    var google = nextProps.google;
    var autocomplete = new google.maps.places.Autocomplete(ReactDOM.findDOMNode(this.refs.event_address), {types: ['geocode']});
    autocomplete.addListener('place_changed', () => {
      //this happens when autocomplete gets clicked
      const place = autocomplete.getPlace();
      console.log('Place from Autocomplete:', place);
      if (!place.geometry){
        return;
      } else {
        //check if the location is accurate
        if (place.geometry.viewport) {
          //not accurate enough!
          this.setAddressAccurate(false);
        } else {
          this.setAddressAccurate(true);
        }

        //store the coords
        console.log('Coords from Autocomplete:', place.geometry.location.lat(), place.geometry.location.lng());
        //latLng = ''+place.geometry.location.lat()+','+place.geometry.location.lng();
        $('#event_lat').val(''+place.geometry.location.lat());
        $('#event_lng').val(''+place.geometry.location.lng());
      }
    })
  },

  geocodeAddress(){
    var {google} = this.props;
    const geocoder = new google.maps.Geocoder();

    var address = this.refs.events_address.value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        
        this.setAddressAccurate(!results[0].partial_match);
        $('#event_lat').val(''+results[0].geometry.location.lat());
        $('#event_lng').val(''+results[0].geometry.location.lng());

      } else {
        console.log('geocoding failed', status);
        this.setAddressAccurate(false);
      }
    });
  },

  setAddressAccurate(good){
    if (good) {
      $('#event_address').next('label').attr('data-success','');
    } else {
      $('#event_address').next('label').attr('data-success','Please try to be more accurate by adding Street and Housenumber (We\'ll store your Event anyways!)');
    }
  },

  componentWillReceiveProps(nextProps) {
    this.initAutocomplete(nextProps);
  },

  startDateChanged() {
    var startTime = this.refs.event_datetime_start.value;
    var endTime = this.refs.event_datetime_end.value;
    var endTimeNode = ReactDOM.findDOMNode(this.refs.event_datetime_end);
    //set min-Attribute of EndTime to StartTime
    if (startTime && startTime != ''){
      $(endTimeNode).attr('min',startTime);
      //if EndTime < StartTime, reset EndTime to StartTime
      if (moment(endTime).isBefore(startTime)){
        $(endTimeNode).val(startTime);
      }
    }
  },

  endDateChanged() {
    var startTime = this.refs.event_datetime_start.value;
    var endTime = this.refs.event_datetime_end.value;
    var startTimeNode = ReactDOM.findDOMNode(this.refs.event_datetime_start);
    //set max-Attribute of StartTime to EndTime
    $(startTimeNode).attr('max',endTime);
    //if EndTime < StartTime, reset StartTime to EndTime
    //if (!moment(endTime).isBefore(startTime)){
      //$(startTimeNode).val(endTime);
    //}
  },

  onSubmit(ev) {
    ev.preventDefault();
    if (ReactDOM.findDOMNode(this.refs.event_form).checkValidity()){
      var {dispatch} = this.props;
      dispatch(actions.startAddEvent(
        this.refs.event_title.value, 
        this.refs.event_description.value, 
        this.refs.event_type.value, 
        this.refs.event_address.value, 
        this.refs.event_lat.value, 
        this.refs.event_lng.value, 
        this.refs.event_datetime_start.value, 
        this.refs.event_datetime_end.value,
        this.refs.event_host.value, 
        this.refs.event_guests.value
      ))
    }
  },

  onValidate(ev) {
  	ev.target.checkValidity();
    console.log('onValidate', ev.target);
  },

  render() {

    return (
    	<div className="row">
    		<div className="col s12">
    			<h1 tabIndex="1" className="center">Create Event</h1>
    			<p className="center">...by answering 4 simple questions:</p>
    		</div>
    		<form className="col s12" autoComplete="on" id="event_form" ref="event_form">
    			<h2 className="col s12">
    				<i className="material-icons prefix">event_note</i>
    				What?
    			</h2>
    			<div className="input-field col s12">
     				<input onBlur={this.onValidate} type="text" className="validate" placeholder="e.g. Udacity Alumni Party" id="event_title" ref="event_title" name="event" autoFocus="true" autoComplete="event" required/>
      			<label htmlFor="event_title" className="active">Title of your Event</label>
          </div>
          <div className="input-field col s12">
     				<input onBlur={this.onValidate} type="text" className="validate" placeholder="The hottest party on this planet" id="event_description" ref="event_description" autoComplete="description" name="description" required/>
      			<label htmlFor="event_description" className="active">Tell me something about your Event</label>
     			</div>
          <div className="input-field col s12">
	     			<input onBlur={this.onValidate} type="text" list="event_type_list" placeholder="Party" id="event_type" ref="event_type" autoComplete="type" name="type" className="autocomplete validate" autoComplete="type" required/>
	      		<datalist id="event_type_list">
	              <option value="Birthday" />
	              <option value="Party" />
	              <option value="Wedding" />
	              <option value="Concert" />
	              <option value="Meeting" />
	              <option value="Conference" />
	              <option value="Other" />
	            </datalist>
	            <label htmlFor="event_type" className="active">Of what type is your Event?</label>
					</div>

    			<h2 className="col s12">
    				<i className="material-icons prefix">location_on</i>
    				Where?
    			</h2>
    			<div className="input-field col s12">
            <input className="validate" type="text" placeholder="Just start typing, we've got you covered" id="event_address" ref="event_address" name="address" autoComplete="street-address" onBlur={this.geocodeAddress} required/>
            <label htmlFor="event_address" className="active">Location of your event</label>
            <input type="hidden" id="event_lat" ref="event_lat"/>
            <input type="hidden" id="event_lng" ref="event_lng"/>
          </div>

    			<h2 className="col s12">
    				<i className="material-icons prefix">access_time</i>
    				When?
    			</h2>
    			<div className="input-field col s12">
     				<input type="datetime-local" 
              onBlur={this.onValidate} 
              className="validate" 
              defaultValue={moment().format('YYYY-MM-DDTHH:mm')} 
              min={moment().format('YYYY-MM-DDTHH:mm')} 
              id="event_datetime_start" 
              ref="event_datetime_start" 
              placeholder="" 
              name="start" 
              autoComplete="start" 
              onChange={this.startDateChanged}
              required/>
      			<label htmlFor="event_datetime_start" className="active">When does it start?</label>
   				</div>
   				<div className="input-field col s12">
     				<input type="datetime-local" 
              onBlur={this.onValidate}
              className="validate" 
              defaultValue={moment().format('YYYY-MM-DDTHH:mm')} 
              min={moment().format('YYYY-MM-DDTHH:mm')} 
              id="event_datetime_end" 
              ref="event_datetime_end" 
              placeholder="" 
              name="end" 
              autoComplete="end" 
              onChange={this.endDateChanged}/>
      			<label htmlFor="event_datetime_end" className="active">...and when does it end? (optional)</label>
   				</div>

    			<h2 className="col s12">
    				<i className="material-icons prefix">supervisor_account</i>
    				Who?
    			</h2>
    			<div className="input-field col s12">
     				<input onBlur={this.onValidate} type="text" className="validate" defaultValue={firebase.auth().currentUser.displayName} placeholder="Udacity, Google, ... or Peter" id="event_host" ref="event_host" name="name" autoComplete="name" required/>
      			<label htmlFor="event_host" className="active">Who is hosting the event?</label>
     			</div>
   				<div className="input-field col s12">
   					<textarea id="event_guests" ref="event_guests" maxLength="180" className="materialize-textarea validate" placeholder="William Shatner and Richard Dean Anderson ... or Sue and Kate" name="guests" autoComplete="guests"></textarea>
     				<label htmlFor="event_guests" className="active" data-error="Please enter max. 180 Characters">Who is invited? (optional)</label>
   				</div>
          <div className="center">
     				<button className="btn btn-large waves-effect waves-light" type="submit" name="action" onClick={this.onSubmit}>
     					Add Event
              <i className="material-icons right">send</i>
            </button>
          </div>
    		</form>
    	</div>
    )
  }
});

export default Redux.connect()(GoogleApiWrapper({
  apiKey: process.env.MAPS_API_KEY
})(AddEvent));
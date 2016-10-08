import React from 'react';
import ReactDOM from 'react-dom'
import * as Redux from 'react-redux';
import moment from 'moment';
import {GoogleApiWrapper} from 'google-maps-react';

import firebase from 'app/firebase/';
import * as actions from 'actions';
import Helper from 'Helper';

export var AddEvent = React.createClass({

  initAutocomplete(nextProps){
    var google = nextProps.google;
    var autocomplete = new google.maps.places.Autocomplete(ReactDOM.findDOMNode(this.refs.event_address), {types: ['geocode']});
    autocomplete.addListener('place_changed', () => {
      //this happens when autocomplete gets clicked
      const place = autocomplete.getPlace();
      //console.log('Place from Autocomplete:', place);
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
        //console.log('Coords from Autocomplete:', place.geometry.location.lat(), place.geometry.location.lng());
        $('#event_lat').val(''+place.geometry.location.lat());
        $('#event_lng').val(''+place.geometry.location.lng());
      }
    })
  },

  geocodeAddress(){
    var {google} = this.props;
    const geocoder = new google.maps.Geocoder();
    //wait for autocomplete to poulate field
    var self = this;
    setTimeout(function(){
      var address = self.refs.event_address.value;
      //var address = $('#event_address').val();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          
          if (!results[0].partial_match && results[0].geometry.location_type != "APPROXIMATE") {
            //Address accurate!
            self.setAddressAccurate(true);
            //$('#event_address').next('label').attr('data-success','');
          } else {
            self.setAddressAccurate(false);
            //$('#event_address').next('label').attr('data-success','Please try to be more accurate by adding Street and Housenumber (We\'ll store your Event anyways!)');
          }
          
          $('#event_lat').val(''+results[0].geometry.location.lat());
          $('#event_lng').val(''+results[0].geometry.location.lng());
          $('#event_address').val(''+results[0].formatted_address);

          //console.log('geocoding success', results[0]);

        } else {
          //console.log('geocoding failed', status);
          $('#event_address').next('label').attr('data-success','Please try to be more accurate by adding Street and Housenumber (We\'ll store your Event anyways!)');
        }
      });
    },300);
  },

  setAddressAccurate(isGood){
    if (isGood){
      $('#event_address').next('label').attr('data-success','');
    } else {
      $('#event_address').next('label').attr('data-success','Please try to be more accurate by adding Street and Housenumber (We\'ll store your Event anyways!)');
    }
  },

  componentWillReceiveProps(nextProps) {
    this.initAutocomplete(nextProps);
  },

  dateChanged() {
    var startTime = this.refs.event_datetime_start.value;
    var endTime = this.refs.event_datetime_end.value;
    var endTimeNode = ReactDOM.findDOMNode(this.refs.event_datetime_end);
    var startTimeNode = ReactDOM.findDOMNode(this.refs.event_datetime_start);

    //set min-Attribute of EndTime to entered StartTime
    if (startTime && startTime != ''){
      $(endTimeNode).attr('min',startTime);
      //if EndTime < StartTime, reset EndTime to StartTime
      if (moment(endTime).isBefore(startTime)){
        $(endTimeNode).val(startTime);
      }
    }
    /*
    //set max-Attribute of StartTime to entered EndTime
    if (endTime && endTime != ''){
      $(startTimeNode).attr('max',endTime);
    }
    */
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
    } else {
      $('input').each(function(i, el){
        if (el.checkValidity()){
          $(el).addClass('valid').removeClass('invalid');
        } else {
          $(el).addClass('invalid').removeClass('valid');
        }
      });
      Helper.toast('Something is wrong up there, please check your Input!');
    }
  },

  onValidate(ev) {
  	ev.target.checkValidity();
    //console.log('onValidate', ev.target);
  },

  valiDate(ev) {
    var obj = ev.target;
    if (obj.checkValidity()){
      $(obj).addClass('valid').removeClass('invalid');
    } else {
      $(obj).addClass('invalid').removeClass('valid');
    }
    //console.log('valiDate', obj);
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
     				<input onBlur={this.onValidate} type="text" className="validate" placeholder="The hottest party on this planet" id="event_description" ref="event_description" autoComplete="description" name="description"/>
      			<label htmlFor="event_description" className="active">Tell me something about your Event (optional)</label>
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
              onBlur={this.valiDate} 
              className="validate" 
              defaultValue={moment().format('YYYY-MM-DDTHH:mm')} 
              min={moment().format('YYYY-MM-DDTHH:mm')} 
              id="event_datetime_start" 
              ref="event_datetime_start" 
              placeholder="" 
              name="start" 
              autoComplete="start" 
              onChange={this.dateChanged}
              required/>
      			<label htmlFor="event_datetime_start" className="active" data-error="Must be in the future">When does it start?</label>
   				</div>
   				<div className="input-field col s12">
     				<input type="datetime-local" 
              onBlur={this.valiDate} 
              className="validate" 
              defaultValue={moment().format('YYYY-MM-DDTHH:mm')} 
              min={moment().format('YYYY-MM-DDTHH:mm')} 
              id="event_datetime_end" 
              ref="event_datetime_end" 
              placeholder="" 
              name="end" 
              autoComplete="end" 
              onChange={this.dateChanged}/>
      			<label htmlFor="event_datetime_end" className="active" data-error="Can not be before beginning">...and when does it end? (optional)</label>
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
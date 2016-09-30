import React from 'react';
import ReactDOM from 'react-dom'
import * as Redux from 'react-redux';
import moment from 'moment';
import {GoogleApiWrapper} from 'google-maps-react';

import * as actions from 'actions';

export var AddEvent = React.createClass({

  initAutocomplete(nextProps){
    var google = nextProps.google;
    var autocomplete = new google.maps.places.Autocomplete(ReactDOM.findDOMNode(this.refs.event_address), {types: ['geocode']});
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      console.log('Place from Autocomplete:', place);
      if (!place.geometry || place.geometry.viewport) {
        return;
      } else {
        //store the coords
        console.log('Coords from Autocomplete:', place.geometry.location.lat(), place.geometry.location.lng());
        //latLng = ''+place.geometry.location.lat()+','+place.geometry.location.lng();
        $('#event_latLng').val(''+place.geometry.location.lat()+','+place.geometry.location.lng());
      }

      /*
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({
        place: place,
        position: place.geometry.location
      })
      */
    })
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
    var {dispatch} = this.props;
    dispatch(actions.startAddEvent(
      this.refs.event_title.value, 
      this.refs.event_description.value, 
      this.refs.event_type.value, 
      this.refs.event_address.value, 
      this.refs.event_latLng.value, 
      this.refs.event_datetime_start.value, 
      this.refs.event_datetime_end.value,
      this.refs.event_host.value, 
      this.refs.event_guests.value
    ))
  },

  render() {

    return (
    	<div className="row">
    		<div className="col s12">
    			<h2 tabIndex="1">Create Event</h2>
    			<p>...by answering 4 simple questions:</p>
    		</div>
    		<form className="col s12" autoComplete="on">
    			<h3>
    				<i className="material-icons prefix">event_note</i>
    				What?
    			</h3>
    			<div className="input-field col s12">
     				<input type="text" className="validate" placeholder="e.g. Udacity Alumni Party" id="event_title" ref="event_title" autofocus="true" autoComplete="title" required/>
      			<label htmlFor="event_title" className="active">Title of your Event</label>
          </div>
          <div className="input-field col s12">
     				<input type="text" className="validate" placeholder="The hottest party on this planet" id="event_description" ref="event_description" autoComplete="description" required/>
      			<label htmlFor="event_description" className="active">Tell me something about your Event</label>
     			</div>
          <div className="input-field col s12">
     				<input type="text" list="event_type_list" placeholder="Party" id="event_type" ref="event_type" className="autocomplete validate" autoComplete="type" required/>
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

    			<h3>
    				<i className="material-icons prefix">location_on</i>
    				Where?
    			</h3>
    			<div className="input-field col s12">
            <input className="validate" type="text" placeholder="Just start typing, we've got you covered" id="event_adress" ref="event_address" name="address" autoComplete="street-address" required/>
            <label htmlFor="event_address" className="active">Location of your event</label>
            <input type="hidden" id="event_latLng" ref="event_latLng"/>
          </div>

    			<h3>
    				<i className="material-icons prefix">access_time</i>
    				When?
    			</h3>
    			<div className="input-field col s12">
     				<input type="datetime-local" 
              className="validate" 
              defaultValue={moment().format('YYYY-MM-DDTHH:mm')} 
              min={moment().format('YYYY-MM-DDTHH:mm')} 
              id="event_datetime_start" 
              ref="event_datetime_start" 
              placeholder="" 
              onChange={this.startDateChanged}
              required/>
      			<label htmlFor="event_datetime_start" className="active">When does it start?</label>
   				</div>
   				<div className="input-field col s12">
     				<input type="datetime-local" 
              className="validate" 
              defaultValue={moment().format('YYYY-MM-DDTHH:mm')} 
              min={moment().format('YYYY-MM-DDTHH:mm')} 
              id="event_datetime_end" 
              ref="event_datetime_end" 
              placeholder="" 
              onChange={this.endDateChanged}/>
      			<label htmlFor="event_datetime_end" className="active">...and when does it end? (optional)</label>
   				</div>

    			<h3>
    				<i className="material-icons prefix">supervisor_account</i>
    				Who?
    			</h3>
    			<div className="input-field col s12">
     				<input type="text" className="validate" placeholder="Udacity, Google, ... or Peter" id="event_host" ref="event_host" name="name" autoComplete="name" required/>
      			<label htmlFor="event_host" className="active">Who is hosting the event?</label>
     			</div>
   				<div className="input-field col s12">
   					<textarea id="event_guests" ref="event_guests" className="materialize-textarea validate" placeholder=""></textarea>
     				<label htmlFor="event_guests" className="active">Who is invited?</label>
   				</div>

   				<button className="btn btn-large waves-effect waves-light" type="submit" name="action" onClick={this.onSubmit}>
   					Add Event
            <i className="material-icons right">send</i>
          </button>

    		</form>
    	</div>
    )
  }
});

export default Redux.connect()(GoogleApiWrapper({
  apiKey: 'AIzaSyBDKoNEeqWSY0MzlUyALFAA2x2hexMrEFs'
})(AddEvent));
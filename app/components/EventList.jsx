import React from 'react';
import * as Redux from 'react-redux';

import Event from 'Event';

export var EventList = React.createClass({
  render() {
    var {events, storage} = this.props;
    var renderEvents = () => {

      if (events.length === 0) {
        return (
          <div className="preloader-wrapper big active">
	          <div className="spinner-layer spinner-blue">
	            <div className="circle-clipper left">
	              <div className="circle"></div>
	             </div><div className="gap-patch">
	              <div className="circle"></div>
	            </div><div className="circle-clipper right">
	              <div className="circle"></div>
	            </div>
	          </div>
	        </div>
        );
      }

      return events.map((event, index) => {
        return (
          <Event key={index} index={index} userLat={storage.userLat} userLng={storage.userLng} activeEvent={storage.activeEvent} {...event}/>
        );
      });
    };

    return (
      <div id="event-list">
        <h1 className="center">Latest Events</h1>
        <p className="center">You should check these out!</p>
        {renderEvents()}
      </div>
    )
  }
});

export default Redux.connect(
  (state) => {
    return {
      events: state.events,
      storage: state.storage
    };
  }
)(EventList);

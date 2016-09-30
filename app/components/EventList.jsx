import React from 'react';
import * as Redux from 'react-redux';

import Event from 'Event';

export var EventList = React.createClass({
  render() {
    var {events} = this.props;
    var renderEvents = () => {

      if (events.length === 0) {
        return (
          <p className="test">Loading Events</p>
        );
      }

      return events.map((event) => {
        return (
          <Event key={event.id} {...event}/>
        );
      });
    };

    return (
      <div>
        {renderEvents()}
      </div>
    )
  }
});

export default Redux.connect(
  (state) => {
    return state;
  }
)(EventList);

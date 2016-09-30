import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export var EventList = React.createClass({
  render() {
  	var {events} = this.props;
    return (
    	<div>List</div>
    )
  }
});

export default Redux.connect()(EventList);

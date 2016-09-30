import React from 'react';

export var Header = React.createClass({
    render() {
        return (
            <header>
			    <h1>
			      	<a href="/">MeetUp</a>
			    </h1>
            </header>
        );
    }
});

module.exports = Header;
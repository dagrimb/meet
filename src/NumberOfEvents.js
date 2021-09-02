import React, { Component } from 'react';


class NumberOfEvents extends Component {

  state = {
    //numberOfEvents: 16,
  }

  
  handleEventCount = (eventCount) => {
    this.setState({ 
      numberOfEvents: eventCount
    });
    this.props.handleEventCount(eventCount)
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <h4>Number of Events</h4>
        <input
          type="number"
          placeholder="Enter how many results you wish to see"
          className="numberOfEvents"
          value={this.props.numberOfEvents}
          onChange={(event) => this.handleEventCount(event.target.value)} // pass input change function created above--this will see
          // whether text changes have been made on input
        />
      </div>
    );
  }
}



export default NumberOfEvents;
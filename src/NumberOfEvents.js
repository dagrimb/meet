import React, { Component } from 'react';


class NumberOfEvents extends Component {

  state = {
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
        <h6>Choose the number of events per page that you wish to see</h6>
        <input
          type="number"
          placeholder="Enter desired amount"
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
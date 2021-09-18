import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {

  state = {
    infoText: '',
  }

  
  handleEventCount = (eventCount) => { // duplicate function from app.js to set numberOfEvents to the eventCount and enable count to change count
    const eventNumber = this.props.numberOfEvents;
    if (eventNumber.length === 0) {
      this.setState({
        infoText: "To use this application, please enter a number of events greater than zero",
      });
    } else {
    this.setState({ 
      numberOfEvents: eventCount,
      infoText:''
    });
  }
    this.props.handleEventCount(eventCount) // enable count to change with input into Number of Events box
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <h6>Choose the number of events per page that you wish to see</h6>
        <input
          type="number"
          placeholder="Enter desired amount"
          className="numberOfEvents" // set className for styling purposes
          value={this.props.numberOfEvents} // numberOfEvent states as props to input element 
          onChange={(event) => this.handleEventCount(event.target.value)} // pass input change function created above--this will see
          // whether text changes have been made on input
        />
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  }
}



export default NumberOfEvents;
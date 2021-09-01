import React, { Component } from 'react';


class NumberOfEvents extends Component {

  state = {
    numberOfEvents: 32,
  }

  
handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ 
      numberOfEvents: value,
    });
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <h4>Number of Events</h4>
        <input
          type="text"
          className="numberOfEvents"
          value={this.state.numberOfEvents}
          onChange={/*(events) =>*/ this.handleInputChanged} // pass input change function created above--this will see
          // whether text changes have been made on input
        />
      </div>
    );
  }
}



export default NumberOfEvents;
import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    query: 32,
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="text"
          className="numberOfEvents"
          value={this.state.query}
          onChange={this.handleInputChanged} // pass input change function created above--this will see
          // whether text changes have been made on input
        />
      </div>
    );
  }
}



export default NumberOfEvents;
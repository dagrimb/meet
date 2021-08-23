import React, { Component } from 'react';


class NumberOfEvents extends Component {

  state = {
    query: 32,
  }

  
handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ 
      query: value,
    });
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="text"
          className="numberOfEvents"
          value={this.state.query}
          onChange={/*(events) =>*/ this.handleInputChanged} // pass input change function created above--this will see
          // whether text changes have been made on input
        />
      </div>
    );
  }
}



export default NumberOfEvents;
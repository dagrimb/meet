import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color, // set color of component to null by default
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}
  class InfoAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'pink';
    }
  }

  class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'red';
    }
  }

  export { InfoAlert, ErrorAlert };

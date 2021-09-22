import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.backgroundColor = null;
    this.color = null;
    this.fontStyle = null;
    this.fontSize = null;
    this.fontWeight = null;
  };

  getStyle = () => {
    return {
      backgroundColor: this.backgroundColor,
      color: this.color,  
      fontStyle: this.fontStyle,
      fontSize: this.fontStyle,
      fontWeight: this.fontWeight
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
      this.backgroundColor = 'yellow';
      this.color = 'blue';
      this.fontStyle = 'Garamond';
      this.fontSize = '18px';
      this.fontWeight = 'bold';
    }
  }

  class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'red';
      this.fontStyle = 'Garamond';
      this.fontSize = '22px';
      this.fontWeight = 'bold';
    }
  }

  class WarningAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'orange';
      this.fontStyle = 'Garamond';
      this.fontSize = '22px';
      this.fontWeight = 'bold';
    }
  }

  export { InfoAlert, ErrorAlert, WarningAlert };

import React, { Component } from 'react';

class Event extends Component {
  state = {
    times: this.props.times,
    eventnames: this.props.eventnames,
    groups: this.props.groups,
    attendees: this.props.attendees,
    event: this.props.event,
    default: true,
    collapsed: true,
    expanded: false,
    descriptions: this.props.descriptions,
    links: this.props.links
  }

  render() {
    //const { times } = this.props;
    //console.log(times);

    return (
        <div className="expandable">
          <div className="default">
            {this.state.times.map(time => 
              <div 
                className="times"
                key={this.state.eventnames}
              >{time}</div>
            )}
            {this.state.eventnames.map((eventname) => (
              <div 
                className="eventnames"
                key={this.state.eventnames}
              >{eventname}</div>
            ))}
            {this.state.groups.map((group) => (
              <div 
                className="groups"
                key={this.state.eventnames}
              >{group}</div>
            ))}
            {this.state.attendees.map((attendee) => (
              <div 
                className="attendees"
                key={this.state.eventnames}
              >{attendee} people are going</div>
            ))}
            </div>
            <div className="collapsed">
                <button className="show">Show Details</button>  
            </div>
            <div className="expanded">
              {this.state.descriptions.map((description) => (
                <div 
                  className="descriptions"
                  key={this.state.eventnames}
                >{description}</div>
              ))}
              {this.state.links.map((link) => (
                <div 
                  className="links"
                  key={this.state.eventnames}
                >{link}</div>
              ))}
              <button className="hide">Hide Details</button>  
            </div>
          </div>

      )
    }
  }

export default Event;
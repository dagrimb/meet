import React, { Component } from 'react';

class Event extends Component {
  state = {
    expanded: false
  }

  render() {
    const { event } = this.props;
    console.log(event);

    return (
        <div className="expandable">
          <div className="default">
            <h2 className="eventname">{event.summary}</h2>
            <div>
              <span className="times">{event.start.dateTime}</span> 
              <span className="timezone"> ({event.start.timeZone})</span>
            </div> 
            {/*<p className="times">{event.end.dateTime}</p>*/}
            {(event.creator.name)
              ? <span className="group">@{event.creator.name} | </span>
              : null}
              <span className="location">{event.location}</span>
          </div> 
          {this.state.expanded === false
          ? <div className="expandButton">
              <button 
                className="show"
                onClick={() => this.setState( { expanded: true })}  
              >Show Details
              </button>
            </div>
          : null}
          {this.state.expanded
            ? <div className="expanded"> 
                <div className="descriptions">{event.description}</div>           
                <div className="links">{event.htmlLink}</div>
                <div className="attendees">{event.currentAttendees} are currently attending</div>
                <div className="collapseButton">
                  <button 
                    className="hide"
                    onClick={() => this.setState( { expanded: false })}
                    >Hide Details
                  </button>
                </div>   
              </div>
          : null}
        </div>
      )
    }
  }
  
export default Event;
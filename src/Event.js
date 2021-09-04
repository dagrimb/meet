import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


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
              <Button
                variant="success" 
                className="show"
                onClick={() => this.setState( { expanded: true })}  
              >Show Details
              </Button>
            </div>
          : null}
          {this.state.expanded
            ? <div className="expanded"> 
                <div className="descriptions">{event.description}</div>           
                <div className="links"><a href={event.htmlLink}>See details on Google Calendar</a></div>
                <div className="attendees">{event.currentAttendees} are currently attending</div>
                <div className="collapseButton">
                  <Button 
                    variant="success"
                    className="hide"
                    onClick={() => this.setState( { expanded: false })}
                    >Hide Details
                  </Button>
                </div>   
              </div>
          : null}
        </div>
      )
    }
  }
  
export default Event;
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class Event extends Component {
  state = {
    expanded: false,
//    infoText: '',
  }

 /*calcTimeDifference = (timeOne, timeTwo) => {
   let difference = (timeTwo.getTime() - timeOne()) / 1000;
   difference /= 60;
   return Math.abs(Math.round(difference)); 
   return;
 }
*/
 // Add 172800000 milleseconds (i.e. 48 hours) to current time and set to twoDaysOut. If event date is 1) greater than current date, 
 // and 2) less than oneDayOut, trigger warning

/* componentDidMount() {
   this.warnTimeSensitive();
 }*/

  render() {
    const { event } = this.props;
    console.log("START TIME", event.start.dateTime);

    

    return (
      <div className="event">
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
          {!this.state.expanded
            ? null
            : <div className="expanded"> 
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
           }
        </div>
      </div>
      )
    }
  }
  
export default Event;
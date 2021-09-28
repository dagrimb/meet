import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations  } from './api';
import { WarningAlert } from './Alert';
import './nprogress.css';


class App extends Component {
  state = {
   setLocation: "all",
   events: [],
   locations: [],
   numberOfEvents: 32,
   infoText: '',
  }

  componentDidMount() { // call API and save data to state
    this.mounted = true;
    getEvents().then((events) => {
      const upcomingEvents = events.filter(
        (event) => (Date.now() - new Date(event.start.dateTime).getTime()) <= 1000 * 60 * 60 * 24 * 2
      );
      console.log("This is the upcoming events", upcomingEvents);

      this.setState({
        events: events.slice(0, this.state.numberOfEvents), // set events array to include event range 0 to total numberOfEvents
        locations: extractLocations(events),
        infoText: upcomingEvents.length > 0
          ? `You have ${upcomingEvents.length} event${upcomingEvents.length > 1 ? 's' : ''} taking place in the next 48 hours. Time is of the essence.`
          : '',
      });
      // return;
      // //const event = Object.assign({}, events)
      // console.log("EVENT", event);
      // const date2 = event.start.dateTime;
      // console.log(date2, "You have events taking place in the next 48 hours. Time is of the essence.");
      //
      // let date1 = new Date();
      // date1 = date1.toISOString();
      // //console.log("DATE 2", date2);
      //
      // let twoDaysOut = Math.abs(new Date(date1).getTime() + 172800000);
      //
      // let difference = Math.abs(twoDaysOut - new Date(date2));
      //
      // if ((this.mounted) && (date2 > date1 && difference <= 172800000)) {
      //   this.setState({
      //     events: events.slice(0, this.state.numberOfEvents), // set events array to include event range 0 to total numberOfEvents
      //     locations: extractLocations(events),
      //     infoText: "You have events taking place in the next 48 hours. Time is of the essence.",
      //   }); // update the state only if the component is mounted
      // } else {
      //   return this.setState({
      //     events: events.slice(0, this.state.numberOfEvents), // set events array to include event range 0 to total numberOfEvents
      //     locations: extractLocations(events),
      //     infoText: ''
      //   });
      // }
    })
  }

  
 componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      let locationEvents = (location === 'all') ? // check if the value of location is "all"
        events :
        events.filter((event) => event.location === location); // if location != to all cities, assign setLocations to filtered event location
      locationEvents = locationEvents.slice(0, eventCount) // set lcoationEvents var to include a range from zero to eventCount (which reps
      // numberOfEvents)
      this.setState({
        events: locationEvents, // all the events filtered by event location and limited by eventCount are the new events array
        setLocation: location // the set location is === the location determined by whether all (32) or another count are its state
      });
    });
  }

  handleEventCount = (eventCount) => {
    this.setState({ 
      numberOfEvents: eventCount // numberOfEvents set to eventCount
    });
    const { setLocation } = this.state
    this.updateEvents(setLocation, eventCount); // events updated based on location and count
  };


  
  render() {
    const { numberOfEvents, locations, events } = this.state; // create const variables for reuse
    // render EventsList component if length of events array is > zero and numberOfEvent count is > zero
    //console.log(events.start);
    // render EventsList component if length of events array is > zero and numberOfEvent count is > zero
    //if (events.length <= 0 && numberOfEvents <= 0) {
      //return <div className="minimumWarning">To use this application, please enter a number of events greater 
      // than zero.</div>
    //}

   // console.log(events);

 /*  let date2 = events.start.dateTime;
   let date1 = new Date();
   date1 = date1.toISOString();
   console.log("DATE 2", date2);
//   console.log("START TIME", events.start.dateTime);
   let twoDaysOut = Math.abs(new Date(date1).getTime() + 172800000);
   let difference = Math.abs(twoDaysOut - new Date(date2));
   if (date2 > date1 && difference <= 172800000) {
   console.log("You have events taking place in the 48 hours. Time is of the essence.");
  } else {
   console.log("All events have either passed or are more than 48 hours from now.")    
  }*/
  //console.log("START TIME", events.start.dateTime);

    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents}  />
        <NumberOfEvents numberOfEvents={numberOfEvents} handleEventCount={(event) => this.handleEventCount(event)} />
        <WarningAlert text={this.state.infoText} />

        {/*{
          events.length > 0 && numberOfEvents > 0 ?*/}
             <EventList events={events} updateEvents={this.updateEvents} />
          {/*}:
            <div className="minimumWarning"></div>
        }*/}
      </div>
    );
  }
}

export default App;
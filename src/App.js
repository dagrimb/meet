import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations  } from './api';
import './nprogress.css';


class App extends Component {
  state = {
   setLocation: "all",
   events: [],
   locations: [],
   numberOfEvents: 32
  }

  componentDidMount() { // call API and save data to state
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, this.state.numberOfEvents), // set events array to include event range 0 to total numberOfEvents
          locations: extractLocations(events) 
        }); // update the state only if the component is mounted
      }      
    });
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
    //console.log(events);
    // render EventsList component if length of events array is > zero and numberOfEvent count is > zero
    //if (events.length <= 0 && numberOfEvents <= 0) {
      //return <div className="minimumWarning">To use this application, please enter a number of events greater 
      // than zero.</div>
    //}

    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents}  />
        <NumberOfEvents numberOfEvents={numberOfEvents} handleEventCount={(event) => this.handleEventCount(event)} />
        {
          events.length > 0 && numberOfEvents > 0 ?
             <EventList events={events} updateEvents={this.updateEvents} />
          :
            <div className="minimumWarning"></div>
        }
      </div>
    );
  }
}

export default App;
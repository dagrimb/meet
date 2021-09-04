import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations  } from './api';
import './nprogress.css';
import Row from 'react-bootstrap/Row';


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
          events: events.slice(0, this.state.numberOfEvents), 
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
        events.filter((event) => event.location === location);
      locationEvents = locationEvents.slice(0, eventCount)
      this.setState({
        events: locationEvents,
        setLocation: location
      });
    });
  }

  handleEventCount = (eventCount) => {
    this.setState({ 
      numberOfEvents: eventCount
    });
    const { setLocation } = this.state
    this.updateEvents(setLocation, eventCount);
  };

  render() {
    const { numberOfEvents, locations, events } = this.state;
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents}  />
        <NumberOfEvents numberOfEvents={numberOfEvents} handleEventCount={(event) => this.handleEventCount(event)} />
          <EventList events={events} />
      </div>
    );
  }
}

export default App;
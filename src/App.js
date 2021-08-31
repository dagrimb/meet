import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations  } from './api';
import './nprogress.css';

class App extends Component {
  state = {
   events: [],
   locations: []
  }

  componentDidMount() { // call API and save data to state
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events, 
          locations: extractLocations(events) 
        }); // update the state only if the component is mounted
      }      
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? // check if the value of location is "all"
        events 
        :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}  />
        <NumberOfEvents />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
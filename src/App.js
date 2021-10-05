import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken  } from './api';
import { WarningAlert, CacheWarning } from './Alert';
import './nprogress.css';


class App extends Component {
  state = {
   setLocation: "all",
   events: [],
   locations: [],
   numberOfEvents: 32,
   infoText: '',
   cacheWarning: '',
   showWelcomeScreen: undefined
  }

  async componentDidMount() { // call API and save data to state
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token'); // get token from local storage
    const isTokenValid = (await checkToken(accessToken)).error ? false : true; // verify token
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
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
          cacheWarning: navigator.onLine
            ? ''
            : `The list of events below has been loaded from the cache and may not be up-to-date`,
        });
      })
    }
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
    const { numberOfEvents, locations, events } = this.state; 
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents}  />
        <NumberOfEvents numberOfEvents={numberOfEvents} handleEventCount={(event) => this.handleEventCount(event)} />
        <WarningAlert text={this.state.infoText} />
        <CacheWarning text={this.state.cacheWarning} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
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
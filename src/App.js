import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { WarningAlert, CacheWarning } from './Alert';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './nprogress.css';


class App extends Component {
  state = {
   setLocation: "all",
   events: [],
   locations: [],
   numberOfEvents: 32,
   infoText: '',
   cacheWarning: '',
   showWelcomeScreen: undefined,
   errorMessage: ''
  }

  async componentDidMount() { // call API and save data to state
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if (true) /*((code || isTokenValid) && this.mounted)*/ {
      getEvents().then((events) => {
        const upcomingEvents = events.filter(
          (event) => (Date.now() - new Date(event.start.dateTime).getTime()) <= 1000 * 60 * 60 * 24 * 2
        );
        console.log("This is the upcoming events", upcomingEvents);
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents), // set events array to include event range 0 to total numberOfEvents
            locations: extractLocations(events),
            infoText: upcomingEvents.length > 0
              ? `You have ${upcomingEvents.length} event${upcomingEvents.length > 1 ? 's' : ''} taking place in the next 48 hours. Time is of the essence.`
              : '',
            cacheWarning: navigator.onLine
              ? ''
              : `The list of events below has been loaded from the cache and may not be up-to-date`
          });
        }
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

  getData = () => {
    const {locations, events} = this.state;
    let data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift() // split location into city name and get first element in array
      return {city, number};
    })
    data = data.filter((data) => data.number > 0);
    return data;
  }

 /* getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift() // split location into city name and get first element in array
      if (location.number > 0) {
        city.slice(location);
      }
      return {city, number};
    })
    return data;
  }
*/

  /*
  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length

      const city = events.map((event) => {
        const filtered = locations.filter((location) => event.location.number > 0)
        location.split(', ').shift();
        return filtered;
      })
      return {city, number};
    })
    return data;
  }*/


  /*getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = locations.map((location) => {
        let cities = (location.number > 0) ?
          location.split(', ').shift() :
          locations.filter((location => location.number > 0))
          return cities;
        })
      return {city, number};
    })
    return data;
  }*/

  /*getData = () => {
    const {locations, events} = this.state;
    let data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      let cities = location.split(', ').shift() // split location into city name and get first element in array
      return {cities, number};
    })
    data = data.filter((data) => data.number < 0); 

    return data;
  }*/


  /*getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length; // Find the number of events for a city 
      console.log(location, number)
      const city = location.split(', ').shift() // split location into city name and get first element in array
      console.log(city, number);
      return {city, number};
    });
    let filteredData = data.filter((location) => {
      return data.number < 0;
    })
    return filteredData;

  }*/
  

  /* You are creating a constant variable called "data." You are setting it to the mapping over your locations object and inside of your
  map function you are setting two more constants:
    1) the "number" constant: set to filtering the events by each location to geth the length of the resulting array
    2) the "city" constant: shorten the location and remove any unnecessary information so you only have a city name
    maybe map over cities?
  */


    


  /*  getData = () => {
      const {locations, events} = this.state;
      const data = locations.map((location) => {
       // const data = events.filter((event) => event.location  )
        const number = events.filter((event) => event.location === location).length; // Find the number of events for a city 
        const city = locations.map((location) => {
          let location = locations.filter((event) => event.location.length > 0);
          location.split(', ').shift() // split location into city name and get first element in array
        //const filtered = cities.filter((city) => city.number > 0); 
        console.log(city, number);
        return {city, number};
      });
      return data;
  
    }*/


  render() {
    const { numberOfEvents, locations, events } = this.state; 
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        <WarningAlert id="warningAlert" style={{ marginBottom: '5rem' }} text={this.state.infoText} />
        <CacheWarning id="cacheWarning" text={this.state.cacheWarning} />
        <CitySearch locations={locations} updateEvents={this.updateEvents}  />
        <NumberOfEvents numberOfEvents={numberOfEvents} handleEventCount={(event) => this.handleEventCount(event)} />  
        {  
          events.length > 0 && numberOfEvents > 0 ?  
            <>
              <div className="data-vis-wrapper" style={{ padding: '0rem 5rem' }}>
                <EventGenre events={events} />
                <ResponsiveContainer height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="category" dataKey="city" name="city" />
                  <YAxis
                    allowDecimals={false}
                    type="number"
                    dataKey="number"
                    name="number of events" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter data={this.getData()} fill="#AFB9F4" /> 
                </ScatterChart>
              </ResponsiveContainer>
              </div><EventList events={events} updateEvents={this.updateEvents} />
            </>
            :
            <div className="minimumWarning"></div>
          }
        {/*<WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />*/}
      </div>
      
    );
  }
}

export default App;
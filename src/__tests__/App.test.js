import React from 'react';
import { shallow, mount } from 'enzyme'; // import shallow rendering API
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1); // make sure Event component exists
  });
  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1); // make sure CitySearch component exists
  });
  test('render Number of Events', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1); // make sure NumberofEvents component exists
  })
});
describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />); // use full rendering API to render component's children for integration testing
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined); // check whether state of "events" isn't undefined
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState); // compare the state of App's events with EventList events prop
    AppWrapper.unmount(); // clean up DOM after test 
  });
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });
  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations }); // set CitySearch's suggestions state to all cities
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length)); // set selectedIndex to the index of the selected suggestions from 
    // suggestions array
    const selectedCity = suggestions[selectedIndex]; // store suggestion
    await CitySearchWrapper.instance().handleItemClicked(selectedCity); // simulate click
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity); // filter list of all events against selected location
    expect(AppWrapper.state('events')).toEqual(eventsToShow); // compare whether state of events takes appropriate array
    AppWrapper.unmount();
  });
  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click'); // simulate click event on "See all cities" list item
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents); // check to see if the events state of the App component equals the list of all events
    AppWrapper.unmount();
  });
  test('get list of events matching the number of events entered by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations }); // set CitySearch's suggestions state to all cities
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length)); // set selectedIndex to the index of the selected suggestions from 
    // suggestions array
    const selectedCity = suggestions[selectedIndex]; // store suggestion
    await CitySearchWrapper.instance().handleItemClicked(selectedCity); // simulate click
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity); // filter list of all events against selected location
    // same as saying: events now === events.filter(event => event.location === location)

    //expect(AppWrapper.state('events')).toEqual(eventsToShow); // compare whether state of events takes appropriate array
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    //NumberOfEventsWrapper.setState({ suggestions: locations }); // set CitySearch's suggestions state to all cities
    //const suggestions = CitySearchWrapper.state('suggestions');
    const eventCount = NumberOfEventsWrapper.state('numberOfEvents');
    //const selectedIndex = Math.floor(Math.random() * (suggestions.length)); 
    //const selectedCity = suggestions[selectedIndex]; // store suggestion
    //await CitySearchWrapper.instance().handleItemClicked(selectedCity); // simulate click
    //const allEvents = await getEvents();
    //const eventsToShow = allEvents.filter(event => event.location === selectedCity); // filter list of all events against selected location
//    const filteredEvents = eventsToShow.filter(event => event.eventCount === eventCount)
    const filteredEvents = eventsToShow.slice(0, eventCount);
    expect(AppWrapper.state('events')).toEqual(filteredEvents); // compare whether state of events takes appropriate array
    AppWrapper.unmount();
  });
  test('get list of 32 events when Number of Events box is empty', async () => {
    const AppWrapper = mount(<App />);
    //const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    const eventQuantity = AppWrapper.find(NumberOfEvents).find('.numberOfEvents');
    await eventQuantity.at(eventQuantity.length - 1).simulate('change'); // simulate click event on "See all cities" list item
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents); // check to see if the events state of the App component equals the list of all events
    AppWrapper.unmount();
  });
  /*test('get number of events matching the amount of results entered by the user', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapperState = AppWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapperState).not.toEqual(32);
    expect(NumberOfEventsWrapperState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(16);
    AppWrapper.unmount();
  });
  test('get a list of all events when the query state is set to default', async () => {
    const AppWrapper = mount(<App />);
    const eventAmount = AppWrapper.find(NumberOfEvents).find('.numberOfEvents');
    await eventAmount.at(eventAmount.length - 1).simulate('click');
    const defaultEvents = await getEvents();
    expect(AppWrapper.state('query')).toEqual(defaultEvents);
    AppWrapper.unmount();
  });*/
});
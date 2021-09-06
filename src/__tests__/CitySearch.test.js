import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {
  let locations, CitySearchWrapper;
  beforeAll(() => {
    locations = extractLocations(mockData); // pass the superset of all locations to shallow City Search component
    CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} handleEventCount ={() => {}} />);
  });
  test('render text input', () => {
    // of CitySearch
    expect(CitySearchWrapper.find('.city')).toHaveLength(1); // see if element with class name "city" exists
    // inside CitySearchWrapper component
  });
  test('renders a list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1); // see if element with class name
    // "suggestions" exists inside of CitySearchWrapper component
  });
  test('renders text input correctly', () => {
    const query = CitySearchWrapper.state('query'); // define query const and set it to query element from
    // the CitySearch state (the query that the user types into the box)
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query); // compare value prop of each element
    // that has the class "city" found within the CitySearch component and see if value prop is equal to
    // the query state
  });
  test('change state when text input changes', () => {
    //const CitySearchWrapper = shallow(<CitySearch />);
    CitySearchWrapper.setState({
      query: 'Munich' // set query state 
    });
    const eventObject = { target: { value: 'Berlin' }}; // declare const and set to object that changes its
    //value to 'Berlin" once change event is called
    CitySearchWrapper.find('.city').simulate('change', eventObject); // use simulate function on "city"
    // element of CitySearch to simulate a change on the city changing it to the target value
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });
  test('render list of suggestions correctly', () => {
    const locations = extractLocations(mockData); // create var that contains the set of locations from the
    // mockData events list
    CitySearchWrapper.setState({ suggestions: locations }); // set "suggestions" state to full list of mock
    // locations
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
    }
  });
  test('suggestion list match that query when changed', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] }); // empty states
  
    CitySearchWrapper.find(".city").simulate("change", {
      target: { value: "Berlin" },
    });
    const query = CitySearchWrapper.state("query");
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });
    expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations); // use toEqual function to compare arrays
  });
  // does the value of query's state change when user clicks on suggestions
  test('selecting a suggestion should change query state', () => {
    CitySearchWrapper.setState({
      query: 'Berlin' });
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state("query")).toBe(suggestions[0]);
    });
  test('selecting CitySearch input reveals the suggestions list', () => { // test for when suggestions list visible and city input has focus via user selection
    CitySearchWrapper.find('.city').simulate('focus');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(true); // present after click simulation
    expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' }); 
  });
  test('selecting a suggestion should hide the suggestions list', () => {
    CitySearchWrapper.setState({
      query: 'Berlin',
      showSuggestions: undefined
    });
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click'); // hide suggestions list when one of its items is clicked
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false); // check if new state has false value
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' }); // check whether suggestions list is hidden
  });
})
  



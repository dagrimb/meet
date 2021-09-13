import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber'; // import loadFeature() and defineFeature() built-in functions
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => { // for defining the code for the feature
  test('When user hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('that a user hasn\'t searched for a city', () => {
    });
    let AppWrapper; // define AppWrapper to be used in multiple places within Gherkin test
    when('a user launches the application', () => {
      AppWrapper = mount(<App />); // render App component using Enzyme's full rendering API to render both
    });
    then('the user should be able to see all of the events relevent to them', () => {
      AppWrapper.update();
      //expect(AppWrapper.find('.event').hostNodes()).toHaveLength(mockData.length);
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
  });
  test('User should see a list of suggestions when they search for a city', ({ given, when, then  }) => {
    let locations, CitySearchWrapper;
    locations = extractLocations(mockData); // create locations data
    given('that the application is launched and the homepage is open', () => {    
      CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} locations={locations} />)
    });
    when('the user types the name of their desired city in the appropriate field', () => { 
      CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } }); // simulate the change event on the city element,
      // giving it a value of "Berlin"
    });
    then('they should see the page for the city that they typed the name of and the events taking place in that city.', () => { 
      expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    });
  }); 
  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    let AppWrapper;
    given('that the user typed the name of a city in the appropriate field', async () => { // load events and locations
      AppWrapper = await mount(<App />); // use mount to be able to access child (CitySearch) component through full rendering API
      AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } }); // simulate change event on city element, changing its
      // value
    });
    and('list of relevant cities is displayed', () => {
      AppWrapper.update(); // make sure App component is update after receiving the list of suggestions
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2); // check whether two suggestions displayed in list of suggestions
    });
    when('they select the desired city from the list of suggestions', () => {
      AppWrapper.find('.suggestions li').at(0).simulate('click'); // simulate a click event on the first suggestion
    });
    then('they should be taken to the page for the desired city where they can see the list of events in said city.', () => {
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
  });
});




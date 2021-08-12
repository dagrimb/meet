import React from 'react';
import { shallow } from 'enzyme'; // import shallow rendering API
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

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



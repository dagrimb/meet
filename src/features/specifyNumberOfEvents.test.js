import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {
    given('the user has not specified the number of events that they want to see', () => {
    });
    let AppWrapper;
    when('the user is on the page where suggested events are listed', () => {
      AppWrapper = mount(<App />);
    });
    then(/^there will be (\d+) events listed \(as this is the default\)$/, (arg0) => { //there will be 32 events listed (as this is the default)
      AppWrapper.update();
      const EventWrapper = AppWrapper.find(Event);
      expect(AppWrapper.state('numberOfEvents')).toBe(32);
      expect(EventWrapper.find('.event')).toHaveLength(32);
    });
});
test('User can change the number of events they want to see.', ({ given, when, then }) => {
  let AppWrapper/*, NumberOfEventsWrapper*/;
  given('that the user has not specified the number of events that they want to see', async () => {
    AppWrapper = await mount(<App />);
    //NumberOfEventsWrapper = shallow(<NumberOfEvents handleEventCount={() => {}} />);
    expect(AppWrapper.state('numberOfEvents')).toBe(32);
  });
  when('the user selects how many events they want to view and is on the page where suggested events are listed is on the page where suggested events are listed', () => {
    AppWrapper.find('.numberOfEvents').simulate('change', { target: { value: 16 } });
  });
  then('there will be however many events they selected listed on that page', () => {
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(16);
    expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
  });
  });
});
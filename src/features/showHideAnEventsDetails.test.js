import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('that the user is on the homepage', () => {
    });
    let EventWrapper;
    when('the user has not selected a particular event', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
    });
    then('the corresponding event element should be collapsed by default', () => {
      EventWrapper.update();
      expect(EventWrapper.state('expanded')).toBe(false);
    });
  });
  test('User can expand an event to see its details', ({ given, and, when, then }) => {
    given('that the user is on the homepage', () => {
    });
    let EventWrapper;
    and('that a particular event is not selected/expanded', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.update();
      expect(EventWrapper.state('expanded')).toBe(false);
    });
    when('the user clicks on the show event details element', () => {
      EventWrapper.find('.show').at(0).simulate('click'); // simulate a click event on the first suggestion
    });
    then('the event element should expand to reveal the event details', () => {
      expect(EventWrapper.state('expanded')).toBe(true);
      expect(EventWrapper.find('.descriptions')).toHaveLength(1);
      expect(EventWrapper.find('.links')).toHaveLength(1);
      expect(EventWrapper.find('.attendees')).toHaveLength(1);
      expect(EventWrapper.find('.hide').text()).toBe('Hide Details');
    });
  });
  test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
    given('that the user is on the homepage', () => {
    });
    let EventWrapper;
    and('a particular event is selected/expanded', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.update();
      EventWrapper.find('.show').at(0).simulate('click'); // simulate a click event on the first suggestion
      expect(EventWrapper.state('expanded')).toBe(true);
    });
    when('the user clicks on the hide event details element', () => {
      EventWrapper.find('.hide').at(0).simulate('click'); // simulate a click event on the first suggestion
    });
    then('the event element should collapse to hide the event details', () => {
      expect(EventWrapper.state('expanded')).toBe(false);
      expect(EventWrapper.find('.descriptions')).toHaveLength(0);
      expect(EventWrapper.find('.links')).toHaveLength(0);
      expect(EventWrapper.find('.attendees')).toHaveLength(0);
      expect(EventWrapper.find('.show').text()).toBe('Show Details');
    });
  });
});
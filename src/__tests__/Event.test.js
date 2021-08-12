import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';
import { extractTimes, extractEvents, extractGroups, extractAttendeeCount, extractLinks, extractDescriptions} from '../api';


describe('<Event /> component', () => {
  let times, eventnames, groups, attendees, descriptions, links, EventWrapper;
  beforeAll(() => {
    times = extractTimes(mockData); // pass the superset of all times to shallow Event component
    eventnames = extractEvents(mockData); // pass the superset of all event names to shallow Event component
    groups = extractGroups(mockData); // pass the superset of all groups to shallow Event component
    attendees = extractAttendeeCount(mockData); // pass the superset of all attendees to shallow Event component
    descriptions = extractDescriptions(mockData); // pass the superset of all descriptions to shallow Event component
    links = extractLinks(mockData); // pass the superset of all links to shallow Event component
    EventWrapper = shallow(<Event times={times} eventnames={eventnames} groups={groups} attendees={attendees} descriptions={descriptions} links={links}/>); 
  });
  test('render event times by default', () => {
    expect(EventWrapper.find('.times')).toHaveLength(1);
  });
  test('render event name by default', () => {
    expect(EventWrapper.find('.eventnames')).toHaveLength(2);
  });
  test('render group name by default', () => {
    expect(EventWrapper.find('.groups')).toHaveLength(1);
  });
  test('render number of attendees by default', () => {
    expect(EventWrapper.find('.attendees')).toHaveLength(1);
  });
  test('render details button by default', () => {
    expect(EventWrapper.find('.show').text()).toBe('Show Details');
  });
  test('expand to show more details when show details button is clicked', () => {
    let expand = EventWrapper.setState({expanded: true, collapsed: false});
    EventWrapper.find('.expanded').simulate('click', expand);
    expect(EventWrapper.state('expanded')).toBe(true);
    expect(EventWrapper.state('collapsed')).toBe(false);
  });
  test('render event descriptions when expanded is true', () => {
    expect(EventWrapper.find('.descriptions')).toHaveLength(2);
  })
  test('render event link when expanded is true', () => {
    expect(EventWrapper.find('.links')).toHaveLength(2);
  });
  test('render hide details button', () => {
    expect(EventWrapper.find('.hide').text()).toBe('Hide Details');
  });
  test('collapse to show less details when hide details button is clicked', () => {
    let collapse = EventWrapper.setState({expanded: false, collapsed: true});
    EventWrapper.find('.collapsed').simulate('click', collapse);
    expect(EventWrapper.state('expanded')).toBe(false);
    expect(EventWrapper.state('collapsed')).toBe(true);
  });
});

  
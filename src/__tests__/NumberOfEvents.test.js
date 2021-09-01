import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let /*sample, */ NumberOfEventsWrapper;
  beforeAll(() => {
    /*sample = extractSample(mockData); // pass the superset of all samples to shallow NumberOfEvents component*/
    NumberOfEventsWrapper = shallow(<NumberOfEvents /*sample={sample}*/ />);
  });
  test('render number input', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });
  test('ensure that 32 is the default state of query', () => {
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  });
  test('ensure that value prop of numberOfEvents is query', () => {
    const query = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('value')).toBe(query);
  })
  test('change state of number of events when text input changes to 16', () => {
    NumberOfEventsWrapper.setState({
      query: 16
    });
    const eventObject = { target: { value: 16 }};
    NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('query')).toBe(16);
  });
})
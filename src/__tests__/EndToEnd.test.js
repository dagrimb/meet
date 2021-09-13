import React from 'react';
import { shallow, mount } from 'enzyme';
import Event from '../Event';
import EventList from '../EventList';
import { mockData } from '../mock-data';
import puppeteer from 'puppeteer';


describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  })
  test('An event element is collapsed by default', async () => {
    const browser = await puppeteer.launch(); // launch browser using Puppeteer

    const page = await browser.newPage(); // create new page with Puppeteer API
    await page.goto('http://localhost:3000/'); // location of hosting application

    await page.waitForSelector('.event'); // ensure event list is loaded

    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull(); // verify that the event details do not exist
    browser.close();
  });
  test('User can expand an event to see its details', async () => {
    const browser = await puppeteer.launch(); 
    const page = await browser.newPage(); 
    await page.goto('http://localhost:3000/');

    await page.waitForSelector('.event'); // wait for event component to render
    await page.click('.event .show'); // simulate user clicking on details button

    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeDefined(); // verify that the event details exist
    browser.close();
  });
  test('User can collapse an event to hide its details', async () => {
    let EventWrapper;
    EventWrapper = mount(<Event event={mockData} />);
    EventWrapper.setState({
      event: mockData,
      expanded: true
    });
    await page.click('.event .hide');
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull();
  });
});
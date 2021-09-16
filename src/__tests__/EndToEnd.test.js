import puppeteer from 'puppeteer';


describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    /*const*/ browser = await puppeteer.launch(/*{
      headless: false,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    }*/);
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
   // await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  })
  test('An event element is collapsed by default', async () => {
    //const browser = await puppeteer.launch(); // launch browser using Puppeteer
    await page.reload({ waitUntil: ["domcontentloaded"] });
    //await page.waitForSelect('.event');
//    const page = await browser.newPage(); // create new page with Puppeteer API
  //  await page.goto('http://localhost:3000/'); // location of hosting application

    await page.waitForSelector('.event'); // ensure event list is loaded

    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull(); // verify that the event details do not exist
    ///browser.close();
  });
  test('User can expand an event to see its details', async () => {
    //const browser = await puppeteer.launch(); 
    await page.reload({ waitUntil: ["domcontentloaded"] });
    await page.waitForSelector('.event'); // wait for event component to render
    await page.click('.event .show'); // simulate user clicking on details button

    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeDefined(); // verify that the event details exist
   // browser.close();
  });
  test('User can collapse an event to hide its details', async () => {
    await page.reload({ waitUntil: ["domcontentloaded"] });
    await page.waitForSelector('.event'); // wait for event component to render
    await page.click('.event .show');
    await page.click('.event .hide');
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull();
  });
});

describe('filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
     /*const*/ browser = await puppeteer.launch(/*{
      headless: false,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    }*/);
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
   // await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });
  test('When user hasn\'t searched for a city, show upcoming events from all cities.', async () => {
    //const browser = await puppeteer.launch(); // launch browser using Puppeteer
    await page.reload({ waitUntil: ["domcontentloaded"] });
    //await page.waitForSelect('.event');
//    const page = await browser.newPage(); // create new page with Puppeteer API
  //  await page.goto('http://localhost:3000/'); // location of hosting application

    await page.waitForSelector('.city'); // ensure city list is loaded

    const cityDetails = await page.$('.city');
    expect(cityDetails).toBeDefined(); // verify that the location details exist
    ///browser.close();
  });
  test('User should see a list of suggestions when they search for a city', async () => {
    //const browser = await puppeteer.launch(); 
    await page.reload({ waitUntil: ["domcontentloaded"] });
    await page.waitForSelector('.city'); // wait for event component to render
    const cityDetails = await page.$('.city');
    await cityDetails.type('London, UK'); // simulate user typing name of city
    const suggestedLocations = await page.$('.suggestions li');
    expect(suggestedLocations).toBeDefined(); // verify that the location details exist
    
   // browser.close();
  });

  test('User can select a city from the suggested list', async () => {
    const locationGroup = await page.$('.suggestions');
    await page.click('.suggestedCities');
    expect(locationGroup).toBeDefined();
  });
});
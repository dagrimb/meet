# meet

Meet App is a serverless, Progressive Web Application (PWA) built with React using Behavior- and Test-Driven Development, AWS Lambda serverless functions, OAuth2 authentication flow, and the Google Calendar API. It provides users with a lists of events in different cities, as well as useful details about those events. Users are able to filter events by location (along with Recharts data visualization showing number of events in relevant cities), determine the number of events that they with to see on their page, and add a shortcut to their phone for mobile, offline use.

<img src="https://user-images.githubusercontent.com/74441727/155817129-8027580c-71d2-444b-8ff3-8a196b883d93.png" width=1000>

**USER STORIES & SCENARIOS**

**_User Stories_**
1) "As a user, I should be able to filter events by city so I can see events in the cities that I care about and not see events in cities that I do not care about."
2) "As a user, I should be able to show/hide an event's details by clicking on an element so that I can read about events that I may be interested in and close the descriptions of events that I may not be interested in."
3) "As a user, I should be able to see the number of events taking place so I am aware of the magnitude of options available to me."
4) "As a user, I should be able to use the application while offline so that I will not lose connectivity in areas where my Wi-Fi or data may be unavailable."
5) "As a user, I should be able to click a button at any time to get to my user homescreen so that I can access my general profile information at any time."
6) "As a user, I should be able to review charts that compare the amounts of events in the city to see where cities rank when it comes to volume of events."

**_Scenarios_**
1a) "GIVEN that a user hasn't searched for a city, WHEN a user launches the application, THEN the user should be able to see all of the events relevent to them"
1b) "GIVEN that the application is launched and the homepage is open, WHEN the user types the name of their desired city in the appropriate field THEN they should see the page for the city that they typed the name of and the events taking place in that city."
1c) "GIVEN that the user typed the name of a city in the appropriate field and a list of relevant cities is displayed, WHEN they select the desired city from the list of suggestions THEN they should be taken to the page for the desired city where they can see the list of events in said city."
2a) "GIVEN that the user is on the homepage, WHEN the user has not selected a particular event THEN corresponding event element should be collapsed by default."
2b) "GIVEN that the user is on the homepage and that a particular event is not selected/expanded, WHEN the user clicks on the show event details element THEN the event element should expand to reveal the event details."
2c) "GIVEN that the user is on the homepage and a particular events is selected/expanded, WHEN the user clicks on the hide event details element THEN the event element should collapse to hide the event details."
3a) "GIVEN the user has not specified the number of event sthat they want to see, WHEN the user is on the page where suggested events are listed THEN there will be 32 events listed (as this is the default)."
3b) "GIVEN that the user has not specified the number of events that they want to see, WHEN the user selects how many events they want to view and is on the page where suggested events are listed THEN there will be however many events they selected listed on that page."
4a) "GIVEN that the user has visited the applicaiton before and has cached data from that application on their device, WHEN  is not in a lcoation with a sufficient internet connection THEN the cached data will allow them to use the application in a way they are accustomed to."
4b) "GIVEN that cached data is most likely to pertain to specific settings for the place that the user is currently in and the time range of events, WHENis not in a location with sufficient internet connection THEN an error message that the user has limited use of the application while offline should be displayed."
5a) "GIVEN that a user has been given the ability to navigate to different sections of the application, WHEN they are anywhere in the application, including a page not related to their profile, THEN they can click on an element that will take them to their profile page.
6a) "GIVEN that data for events in each city has been stored, WHEN the user navigates to a section where they can view the cumulative volume of events in their area THEN a chart with the number of events in each city will be displayed."

TECHNOLOGIES USED
* React.js: a popular component-based, declarative, user-friendly, easy-to-maintain JavaScript UI library used to work with well with data via server-side endpoints with MVC (Model-View-Controller) architecture by housing its data and "State" and "Props" (please start with https://reactjs.org/ for more information on this library). The structure for this applicated was generated with the Create-React-App command.
* Google Calendar API: for retrieving upcoming event data. The user will search for a city and the API will return results based on the data it is connected it.
* AWS Lambda: the hosting provider who provides a serverless function as an authorization server.
* OAuth2 authentication (also known as "Open Authorization"): the industry-standard framework for authorization flow that designed to allow users to obtain limited access credentials from the Google API Console. 
* Jest: a JavaScript an assertion and testing library that is used to verify code correctness in relation to desired functionality. 
* Cucumber: the world's leading tool for Behavior-Driven Development (BDD), a type of development that contains scenario's pertaining to the user's interaction with the application (see the scenarios section above)
* Puppeteer: a Node library that provides a high-level API to carry out automated testing, allowing developers to request any kind of interaction from the a Chrome (or Chromium) browser that they want or need.
* Lighthouse: for testing the application in an incognito browser with the localStorage emptied of its session credentials to simulate offline or slow-network use.
* Atatus: a powerful application observability and performance management tool use to track application and detect/report their performance errors
* Recharts: for creating and displaying a scatterplot of event data with reusable React components
* Axios: an HTTP client that can perform AJAX operations with HTTP requests to the API endpoints, connecting the external with the app's client-side.

SETTING UP THE DEVELOPMENT ENVIRONMENT: What you will need
* A computer with a web browser (ideally Google Chrome so, as someone how may like to look under the hood of the application, one can take advantage of the React Developer tools Google has made available).
* Wifi or a LAN connection
* A terminal (MacOS) or Command Line Interface (CLI, for PC users).
* Code Editor (if you are to engage and experiment with the code on your own)
  * Recommended: Visual Studio Code (one of the best to use with React)

DEPENDENCIES/LIBRARIES NEEDED (Note: This is not an exhaustive list of dependencies. Please refer to the **package.lock.json"** for a detailed list of dependencies in order to re-build the app)
* React
* Recharts
* Axios

WHAT YOUR **package.json** SHOULD LOOK LIKE

{
  "name": "meet",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://dagrimb.github.io/meet",
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "atatus-spa": "^4.3.2",
    "axios": "^0.21.1",
    "immer": "^9.0.6",
    "nprogress": "^0.2.0",
    "react": "^17.0.2",
    "react-bootstrap": "^1.6.1",
    "react-dom": "^17.0.2",
    "react-scripts": "^3.4.4",
    "recharts": "^2.1.5",
    "web-vitals": "^0.2.4",
    "workbox-background-sync": "^5.1.3",
    "workbox-broadcast-update": "^5.1.3",
    "workbox-cacheable-response": "^5.1.3",
    "workbox-core": "^5.1.3",
    "workbox-expiration": "^5.1.3",
    "workbox-google-analytics": "^5.1.3",
    "workbox-navigation-preload": "^5.1.3",
    "workbox-precaching": "^5.1.3",
    "workbox-range-requests": "^5.1.3",
    "workbox-routing": "^5.1.3",
    "workbox-strategies": "^5.1.3",
    "workbox-streams": "^5.1.3",
    "yarn": "^1.22.17"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@wojtekmaj/enzyme-adapter-react-17": "^0.6.3",
    "enzyme": "^3.11.0",
    "gh-pages": "^3.2.3",
    "puppeteer": "^10.2.0"
  }
}

DOWNLOADS/INSTALATIONS
* As previously mentioned above, the existence and initial structure of this application was created use the Create-React-App command. Most of the dependencies for this project have been installed with that command.
* Node Package Manager: **npm install**
* Recharts: **npm i --save recharts**

TO RUN THE PROJECT
* Download the most recent commit from the main branch. Once downloaded, navigate to the main project (i.e. **meet**) folder in your terminal or CLI
* Type the command **npm start** or **npm run start**

Built By: David Grimberg








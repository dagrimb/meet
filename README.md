# meet

**ABOUT**

Meet is an application that provides users with both general and personalized lists of events in different cities, as well as useful details
about those events. (more to come on this...)

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

**LAST

TECHNICAL DETAILS

To get this project running on your device, download the most recent commit from the main branch. Once downloaded, navigate to the project
in your terminal and type the command "npm start" in your project terminal.

Project dependencies: none listed at this time

API that is used: Google Calendar API (for retrieving events)

Other technical details:
  -primary technologies: React.js
  -serverless...to the degree that a traditional one is not custom-made and included by the properieters of this project. Instead, the    authorization server is a serverless function and the hosting provider is AWS Lambda.
  -progressive- it allows users the ability to work offline
  -authentication: employs OAuth2 authentication

Feature: Filter events by city

Scenario: When user hasn't searched for a city, show upcoming events from all cities.
Given that a user hasn't searched for a city
When a user launches the application
Then the user should be able to see all of the events relevent to them 

Scenario: User should see a list of suggestions when they search for a city
Given that the application is launched and the homepage is open
When the user types the name of their desired city in the appropriate field
Then they should see the page for the city that they typed the name of and the events taking place in that city.

Scenario: User can select a city from the suggested list
Given that the user typed the name of a city in the appropriate field 
And list of relevant cities is displayed
When they select the desired city from the list of suggestions 
Then they should be taken to the page for the desired city where they can see the list of events in said city.

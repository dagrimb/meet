Feature: Show/Hide an Event's Details

Scenario: An event element is collapsed by default
Given that the user is on the homepage
When the user has not selected a particular event
Then the corresponding event element should be collapsed by default

Scenario: User can expand an event to see its details
Given that the user is on the homepage 
And that a particular event is not selected/expanded
When the user clicks on the show event details element
Then the event element should expand to reveal the event details

Scenario: User can collapse an event to hide its details
Given that the user is on the homepage 
And a particular event is selected/expanded
When the user clicks on the hide event details element
Then the event element should collapse to hide the event details
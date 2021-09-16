Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number.
Given the user has not specified the number of events that they want to see
When the user is on the page where suggested events are listed
Then there will be 32 events listed (as this is the default)

Scenario: User can change the number of events they want to see.
Given that the user has not specified the number of events that they want to see
When the user selects how many events they want to view and is on the page where suggested events are listed is on the page where suggested events are listed
Then there will be however many events they selected listed on that page


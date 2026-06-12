Feature: User Registration

@ui @regression
Scenario: UI-004 Register new user with dynamic data
Given user is on signup page
When user enters name and email on the signup details
And user clicks on the signup button
And on the "Account information" page user fills account information
And user clicks on the "Create Account" button
Then account should be created successfully
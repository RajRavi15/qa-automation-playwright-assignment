Feature: End-to-End User Flow

@e2e
Scenario: Register and login with same user

  Given user is on signup page
  When user enters name and email on the signup details
  And user clicks on the signup button
  And on the "Account information" page user fills account information
  And user clicks on the "Create Account" button
  Then account should be created successfully

  And user clicks Continue button

  When user clicks logout button
  And user navigates to login page
  And user enters valid credentials
  Then user name should be visible in header
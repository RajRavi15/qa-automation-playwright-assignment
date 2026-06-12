Feature: Login Functionality

@ui @regression
Scenario: UI-003 Navigate to login/signup page
Given user is on home page
When user clicks on Signup/Login
Then user should be navigated to login page

@ui @smoke
Scenario: UI-005 Login with valid credentials
Given user is on login page
When user enters valid credentials
Then user name should be visible in header
And logout button should be visible

@ui @regression
Scenario: UI-006 Invalid login validation
Given user is on login page
When user enters invalid credentials
Then error message should be displayed

@ui @regression
Scenario: UI-007 Logout functionality
Given user is logged in
When user clicks logout button
Then user should be redirected to login page
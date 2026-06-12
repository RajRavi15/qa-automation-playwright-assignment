Feature: Header Navigation

@ui @regression
Scenario: UI-002 Validate header navigation
Given user is on home page
When user clicks on "Products" menu
Then user should be navigated to products page
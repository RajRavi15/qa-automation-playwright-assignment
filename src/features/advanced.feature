Feature: Advanced UI Scenarios

@ui @smoke
Scenario: UI-016 Network interception and resiliency
Given user blocks heavy banner requests
When user opens home page after blocking banners
Then page should load successfully without banner

@ui @smoke
Scenario: UI-017 Multi-context session sharing
Given user logs in
When session cookies are copied to new browser
Then user should remain logged in
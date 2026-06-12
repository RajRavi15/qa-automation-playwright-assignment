Feature: API Automation Suite

@api @smoke @regression
Scenario: API-001 Get all products and validate structure
  Given user sends GET request to "api/productsList"
  Then response status should be 200
  And response code should be 200
  And products list should be an array
  And each product should contain id, name, price and brand

@api @negative @regression
Scenario: API-002 Invalid POST request to products list
  Given user sends POST request to "api/productsList"
  Then response status should be 200
  And response code should be 405
  And error message should be present

@api @regression
Scenario: API-003 Get all brands
  Given user sends GET request to "api/brandsList"
  Then response status should be 200
  And response code should be 200
  And brands list should be an array
  And each brand should contain brand name

@api @negative @regression
Scenario: API-004 Invalid PUT request to brands list
  Given user sends PUT request to "api/brandsList"
  Then response status should be 200
  And response code should be 405
  And error message should be present

@api @regression
Scenario: API-005 Search product with valid input
  Given user sends POST request to "api/searchProduct" with search term "top"
  Then response status should be 200
  And response code should be 200
  And products list should be returned
  And matching products should be present

@api @negative @regression
Scenario: API-006 Search product without required parameter
  Given user sends POST request to "api/searchProduct" without body
  Then response status should be 200
  And response code should be 400
  And validation error message should be returned

@api @regression
Scenario: API-007 User lifecycle validation
  Given user creates a new account
  Then create account response code should be 201

  When user updates the account
  Then update account response code should be 200

  When user fetches user details by email
  Then get user response code should be 200

  When user deletes the account
  Then delete account response code should be 200

@api @negative @regression
Scenario: API-008 Invalid login validation
  Given user sends POST request to "api/verifyLogin" with invalid credentials
  Then response status should be 200
  And response code should be 404
  And error message should contain "User not found!"
# test/e2e/home/sample.feature

Feature: BDD testing

Scenario: I want to see the home page
    Given I am on the "login"
    When I fill "email" field with "Atelier@example.org"
    And I fill "password" field with "pass"
    And I click on the button "login"
    Then I should be redirected on "home"
Feature: Example smoke test

  Smoke test to verify Playwright, TypeScript, and Cucumber are wired correctly.

  Scenario: Example domain loads
    Given I open the example domain page
    Then I see the heading "Example Domain"

describe('Dashboard Tests', function() {
  beforeEach(function() {
          cy.loginTestUser(Cypress.env('testuser1').username, Cypress.env('testuser1').password)
  });

  it('should logout, and redirect to welcome page', function() {
      cy.get('.tl-logout-button').click();
      cy.get('button.try-button').should('be.visible');
  });
  it('should not have access to dashboard (logged out user)', function() {
    cy.get('.tl-logout-button').click();
    //When attempting to visit /dashboard as unauthorized user, we end up in /welcome
    cy.visit(`${Cypress.env('trylinks-domain')}/dashboard`)
    cy.origin(`${Cypress.env('auth0-redirect')}`, () => {
      cy.url().should('match', /^https:\/\/dev-z05qagcuczzy4gdp\.us\.auth0\.com\/.*/);
    });  });
  it('should not have access to interactive (logged out user)', function() {
    cy.get('.tl-logout-button').click();
    //When attempting to visit /dashboard as unauthorized user, we end up in /welcome
    cy.visit(`${Cypress.env('trylinks-domain')}/interactive`);
    cy.origin(`${Cypress.env('auth0-redirect')}`, () => {
      cy.url().should('match', /^https:\/\/dev-z05qagcuczzy4gdp\.us\.auth0\.com\/.*/);
    });
  });
  it('should not have access to tutorial (logged out user)', function() {
    cy.get('.tl-logout-button').click();
     //When attempting to visit /tutorial/1 as unauthorized user, we end up in /welcome
    cy.visit(`${Cypress.env('trylinks-domain')}/tutorial/1`)
    cy.origin(`${Cypress.env('auth0-redirect')}`, () => {
      cy.url().should('match', /^https:\/\/dev-z05qagcuczzy4gdp\.us\.auth0\.com\/.*/);
    });  });
  it('should have access to dashboard (logged in user)', function() {
     //When attempting to visit /dashboard as an authorized user, it succeeds.
     cy.url().should('eq', `${Cypress.env('trylinks-domain')}/dashboard`);
  });
  it('should have access to interactive (logged in user)', function() {
     //When attempting to visit /interactive as an authorized user, it succeeds.
     cy.get('button:contains("Launch Links Interactive Mode")').click();
     cy.url().should('eq', `${Cypress.env('trylinks-domain')}/interactive`);;
  });
  it('should have access to tutorial (/interactive)', function() {
     //When attempting to visit /tutorial/1 as an authorized user, it succeeds.
     cy.get('button:contains("Launch Links Tutorials Mode")').click();
     cy.url().should('match', /https:\/\/dev.trylinks\.net\/tutorial\/.*/);
    });
});

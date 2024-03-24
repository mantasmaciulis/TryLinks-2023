describe('Dashboard Tests', function() {
  beforeEach(function() {
      // Log in before each test in this suite
      cy.loginTestUser()
  });

  it('should logout, and redirect to welcome page', function() {
      cy.get('.tl-logout-button').click();
      cy.get('button.try-button').should('be.visible');
  });
  it('should not have access to dashboard (logged out user)', function() {
    cy.get('.tl-logout-button').click();
    //When attempting to visit /dashboard as unauthorized user, we end up in /welcome
    cy.visit('http://dev.trylinks.net/dashboard')
    cy.origin('https://dev-z05qagcuczzy4gdp.us.auth0.com', () => {
      cy.url().should('match', /^https:\/\/dev-z05qagcuczzy4gdp\.us\.auth0\.com\/.*/);
    });  });
  it('should not have access to interactive (logged out user)', function() {
    cy.get('.tl-logout-button').click();
    //When attempting to visit /dashboard as unauthorized user, we end up in /welcome
    cy.visit('https://dev.trylinks.net/interactive')
    cy.origin('https://dev-z05qagcuczzy4gdp.us.auth0.com', () => {
      cy.url().should('match', /^https:\/\/dev-z05qagcuczzy4gdp\.us\.auth0\.com\/.*/);
    });
  });
  it('should not have access to tutorial (logged out user)', function() {
    cy.get('.tl-logout-button').click();
     //When attempting to visit /tutorial/1 as unauthorized user, we end up in /welcome
    cy.visit('https://dev.trylinks.net/tutorial/1')
    cy.origin('https://dev-z05qagcuczzy4gdp.us.auth0.com', () => {
      cy.url().should('match', /^https:\/\/dev-z05qagcuczzy4gdp\.us\.auth0\.com\/.*/);
    });  });
  it('should have access to dashboard (logged in user)', function() {
     //When attempting to visit /dashboard as an authorized user, it succeeds.
     cy.url().should('eq', 'https://dev.trylinks.net/dashboard');
  });
  it('should have access to interactive (logged in user)', function() {
     //When attempting to visit /interactive as an authorized user, it succeeds.
     cy.get('button:contains("Launch Links Interactive Mode")').click();
     cy.url().should('eq', 'https://dev.trylinks.net/interactive');
  });
  it('should have access to tutorial (/interactive)', function() {
     //When attempting to visit /tutorial/1 as an authorized user, it succeeds.
     cy.get('button:contains("Launch Links Tutorials Mode")').click();
     cy.url().should('match', /https:\/\/dev.trylinks\.net\/tutorial\/.*/);
    });


});

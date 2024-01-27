describe('Dashboard Tests', function() {
  beforeEach(function() {
      // Log in before each test in this suite
      cy.loginTestUser()
  });

  it('should logout, and redirect to welcome page', function() {
      cy.get('.tl-logout-button').click();
      cy.get('button:contains("Sign up / Sign in")').should('be.visible');
  });
  it('should not have access to dashboard (logged out user)', function() {
    cy.get('.tl-logout-button').click();
    //When attempting to visit /dashboard as unauthorized user, we end up in /welcome
    cy.visit('http://trylinks.net/dashboard')
    cy.url().should('eq', 'http://trylinks.net/welcome');
  });
  it('should not have access to interactive (logged out user)', function() {
    cy.get('.tl-logout-button').click();
    //When attempting to visit /dashboard as unauthorized user, we end up in /welcome
    cy.visit('http://trylinks.net/interactive')
    cy.url().should('eq', 'http://trylinks.net/welcome');
  });
  it('should not have access to tutorial (logged out user)', function() {
    cy.get('.tl-logout-button').click();
     //When attempting to visit /tutorial/1 as unauthorized user, we end up in /welcome
    cy.visit('http://trylinks.net/tutorial/1')
    cy.url().should('eq', 'http://trylinks.net/welcome');
  });
  it('should have access to dashboard (logged in user)', function() {
     //When attempting to visit /dashboard as an authorized user, it succeeds.
     cy.visit('http://trylinks.net/dashboard')
     cy.url().should('eq', 'http://trylinks.net/dashboard');
  });
  it('should have access to interactive (logged in user)', function() {
     //When attempting to visit /interactive as an authorized user, it succeeds.
     cy.get('button:contains("Launch Links Interactive Mode")').click();
     cy.url().should('eq', 'http://trylinks.net/interactive');
  });
  it('should have access to tutorial (/interactive)', function() {
     //When attempting to visit /tutorial/1 as an authorized user, it succeeds.
     cy.get('button:contains("Launch Links Tutorials Mode")').click();
     cy.url().should('match', /http:\/\/trylinks\.net\/tutorial\/.*/);
    });


});

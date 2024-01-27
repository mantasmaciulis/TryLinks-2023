describe('template spec', () => {
  it('visits trylinks', () => {
    cy.visit('http://trylinks.net')
    cy.title().should('include', 'TrylinksV2');
  })
})

describe('template spec', () => {
  it('visits trylinks login page', () => {
    cy.visit('http://trylinks.net/start')
  })
})

describe('Login Performance', function() {
  it('should log in within 3 seconds', function() {
      // Visit the login page
      cy.visit('http://trylinks.net/start');

      //Fill in login info from .env file
      cy.get('#mat-input-0').type(Cypress.env('username'));
      cy.get('#mat-input-1').type(Cypress.env('password'));

      const startTime = new Date().getTime();
      cy.get('.sign-in-button').click();

      //A basic performance test
      cy.get('.tl-logout-button', { timeout: 3000 }).should('be.visible');

      const endTime = new Date().getTime();
      const timeTaken = endTime - startTime;
      expect(timeTaken).to.be.lessThan(3000);
  });
});

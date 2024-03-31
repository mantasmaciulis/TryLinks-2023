describe('template spec', () => {
  it('visits trylinks', () => {
    cy.visit(`${Cypress.env('trylinks-domain')}`);
    cy.title().should('include', 'TrylinksV2');
  })
})

describe('template spec', () => {
  it('visits trylinks login page', () => {
    cy.visit(`${Cypress.env('trylinks-domain')}/start`);
  })
})

describe('Login Performance', function() {
  it('should log in within 3 seconds', function() {
      // Visit the login page
      cy.visit(`${Cypress.env('trylinks-domain')}/start`);
      cy.get('button.try-button').click();

      cy.origin(`${Cypress.env('auth0-redirect')}`, () => {
        cy.get('#username').type(Cypress.env('testuser1').username);
        cy.get('#password').type(Cypress.env('testuser1').password);
      
      cy.get('button[data-action-button-primary="true"]').click();
    });
      //A basic performance test
      cy.get('.tl-logout-button', { timeout: 3000 }).should('be.visible');
      const startTime = new Date().getTime();
      const endTime = new Date().getTime();
      const timeTaken = endTime - startTime;
      expect(timeTaken).to.be.lessThan(3000);
  });
});

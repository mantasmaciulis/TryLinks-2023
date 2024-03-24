describe('template spec', () => {
  it('visits trylinks', () => {
    cy.visit('http://dev.trylinks.net')
    cy.title().should('include', 'TrylinksV2');
  })
})

describe('template spec', () => {
  it('visits trylinks login page', () => {
    cy.visit('http://dev.trylinks.net/start')
  })
})

describe('Login Performance', function() {
  it('should log in within 3 seconds', function() {
      // Visit the login page
      cy.visit('http://dev.trylinks.net/start');
      cy.get('button.try-button').click();

      cy.origin('https://dev-z05qagcuczzy4gdp.us.auth0.com', () => {
        cy.get('#username').type('test@test.com');
        cy.get('#password').type('test123TEST');
      
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

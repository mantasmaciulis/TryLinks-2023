Cypress.Commands.add('loginTestUser', () => {
    cy.visit('http://dev.trylinks.net/start');
      cy.get('button.try-button').click();

      cy.origin('https://dev-z05qagcuczzy4gdp.us.auth0.com', () => {
        cy.get('#username').type('test@test.com');
        cy.get('#password').type('test123TEST');      
      cy.get('button[data-action-button-primary="true"]').click();
});
});

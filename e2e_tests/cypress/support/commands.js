Cypress.Commands.add('loginTestUser', () => {
    cy.visit('http://trylinks.net/start');
    cy.get('#mat-input-0').type(Cypress.env('username'));
    cy.get('#mat-input-1').type(Cypress.env('password'));
    cy.get('.sign-in-button').click();
    cy.get('.tl-logout-button', { timeout: 3000 }).should('be.visible');
});

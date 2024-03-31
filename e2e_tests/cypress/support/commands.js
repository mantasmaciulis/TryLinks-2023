Cypress.Commands.add('loginTestUser', (username, password) => {
  cy.visit('http://dev.trylinks.net/start');
  cy.get('button.try-button').click();

  cy.origin('https://dev-z05qagcuczzy4gdp.us.auth0.com', { args: { username, password } }, (originArgs) => {
    cy.get('#username').type(originArgs.username);
    cy.get('#password').type(originArgs.password);
    cy.get('button[data-action-button-primary="true"]').click();
  });
});



Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  cy.get(iframeSelector).then($iframe => {
      const doc = $iframe.contents();
      return cy.wrap(doc.find('body'));
  });
});

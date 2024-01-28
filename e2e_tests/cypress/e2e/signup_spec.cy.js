describe('Signup Test', function() {
  it('should show error for non-matching passwords', function() {
      cy.visit('http://trylinks.net/start');

      cy.get('#mat-tab-label-0-1').click();

      cy.get('#mat-input-4').type('password123'); 
      cy.get('#mat-input-5').type('differentPassword123'); 

      cy.get('mat-error').should('contain', 'Passwords do not match!');
  });
});

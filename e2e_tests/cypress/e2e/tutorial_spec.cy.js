describe('Tutorial Tests', function() {
    beforeEach(function() {
        cy.loginTestUser();
    });

    it('should have access to tutorial (/interactive) and check for Hello in iframe', function() {
        // Visit tutorial 1:
        cy.wait(1000);
        cy.visit('https://dev.trylinks.net/tutorial/1');
        cy.wait(1000);
        cy.contains('span', 'Save and Compile').click();
        cy.wait(5000);
        cy.getIframeBody('.ng-star-inserted').then(($body) => {
            const textPresent = $body.text().includes('Hello World!');
            expect(textPresent).to.be.true;
        });
    });
});

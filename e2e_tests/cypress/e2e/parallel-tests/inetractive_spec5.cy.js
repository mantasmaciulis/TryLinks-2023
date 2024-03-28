describe('Dashboard Tests', function() {
    beforeEach(function() {
        // Log in before each test in this suite
          cy.visit('http://dev.trylinks.net/start');
            cy.get('button.try-button').click();
      
            cy.origin('https://dev-z05qagcuczzy4gdp.us.auth0.com', () => {
              cy.get('#username').type('mantest3@tas.co');
              cy.get('#password').type('TEST123test.');      
            cy.get('button[data-action-button-primary="true"]').click();
      });
      
      });
  
    it('should pass interactive mode introduction', function() {
      //Visit interactive mode
      cy.get('button:contains("Launch Links Interactive Mode")').click();
      cy.url().should('eq', 'https://dev.trylinks.net/interactive');
      // Wait for 2 seconds for links shell to load.
      cy.wait(2000);
  
      //First Introduction  test
      cy.get('.mat-input-element').should('be.visible').type('52;{enter}');
      cy.contains('pre', '52 : Int').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[1 / 12] Now let\'s try something a bit more interesting! type 1 + 2 * 4; or any integer arithmetic expression and see its result.').should('exist');
  
      //Second Introduction  test
      cy.get('.mat-input-element').should('be.visible').type('1 + 2 * 4;{enter}');
      cy.contains('pre', '9 : Int').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[2 / 12] Instead of playing with numbers individually, try type [1, 4, 9, 16]; and see what comes out. List!').should('exist');
  
      //Third Introduction  test
      cy.get('.mat-input-element').should('be.visible').type('[1, 4, 9, 16];{enter}');
      cy.contains('pre', '[1, 4, 9, 16] : [Int]').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[3 / 12] You can concatenate 2 lists by using ++. Try [1, 2] ++ [3, 4, 5];.').should('exist');
  
      //Fourth Introduction  test
      cy.get('.mat-input-element').should('be.visible').type('[1, 2] ++ [3, 4, 5];{enter}');
      cy.contains('pre', '[1, 2, 3, 4, 5] : [Int]').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[4 / 12] You can also push a new element into the head of the list like 1::[2,3,4,5];.').should('exist');
  
      //Fifth Introduction  test
      cy.get('.mat-input-element').should('be.visible').type('1::[2,3,4,5];{enter}');
      cy.contains('pre', '[1, 2, 3, 4, 5] : [Int]').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[5 / 12] You can define variables in the shell as well! Try var s = [2, 4, 5];.').should('exist');
  
      //Sixth Introduction  test
      cy.get('.mat-input-element').should('be.visible').type('var s = [2, 4, 5];{enter}');
      cy.contains('pre', 's = [2, 4, 5] : [Int]').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      const expectedText = `switch (s) { 
        case [] -> print("s is empty")
        case x::xs -> print("s is not empty")
      };`;
      cy.get('.tl-repl-code-snippet').invoke('text').then((actualText) => {
      const cleanedActualText = actualText.replace(/\s+/g, ' ').trim();
      const cleanedExpectedText = expectedText.replace(/\s+/g, ' ').trim();
      expect(cleanedActualText).to.include(cleanedExpectedText);
  
      //Seventh Introduction  test
      cy.get('.mat-input-element')
      .should('be.visible')
      .type('switch (s) {')
      .type('{enter}')
      .type(' case [] -> print("s is empty")')
      .type('{enter}')
      .type('case x::xs -> print("s is not empty")')
      .type('{enter}')
      .type('};')
      .type('{enter}');
      cy.contains('pre', 's is not empty').should('exist');
      cy.contains('pre', '() : ()').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[7 / 12] You can conbime values into a "Tuple" too! Try var t = (1, "OK");.').should('exist');
   });
  
  
      //Eigth Introduction  test
      cy.get('.mat-input-element').should('be.visible').type('var t = (1, "OK");{enter}');
      cy.contains('pre', 't = (1, "OK") : (Int, String)').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[8 / 12] Conditions can be leveraged to control the flow of you program, such as:').should('exist');
  
      //Ninth Introduction  test
      cy.get('.mat-input-element').should('be.visible').type('var x = 2;{enter}var y = 4;{enter}if (x == y){enter}  print("x and y are equal"){enter}else{enter}  print("x and y are not equal");{enter}');
      cy.contains('pre', 'x and y are not equal').should('exist');
      cy.contains('pre', '() : ()').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[9 / 12] Links is a functional programming language, which means functions are "first class citizens"').should('exist');
  
      //Tenth Introduction  test
      cy.get('.mat-input-element')
      .should('be.visible')
      .type('var inc = fun (x) {{x + 1}};', { parseSpecialCharSequences: false });
      cy.get('.mat-input-element')
      .should('be.visible')
      .type('{enter}');
      cy.contains('pre', 'inc = fun : (Int) -> Int').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[10 / 12] Once you have the function defined, you can simply call it, like inc(7);.').should('exist');
  
      //Eleventh Introduction  test
      cy.get('.mat-input-element').should('be.visible').type('inc(7);{enter}');
      cy.contains('pre', '8 : Int').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[11 / 12] Lastly, loops are used in Links as well, mostly in list comprehension. Take a look at the following example:').should('exist');
  
      //Twelth Introduction  test
      cy.get('.mat-input-element').should('be.visible').type('var source_list = [2, 3, 7, 8, 9, 55];{enter}for (n <- source_list){enter}  if (odd(n)){enter}    [n, n+1]{enter}  else{enter}    [n];{enter}');
      cy.contains('pre', '[2, 3, 4, 7, 8, 8, 9, 10, 55, 56] : [Int]').should('exist');
      cy.get('.mat-input-element').should('be.visible').type('next tip;{enter}');
      cy.contains('pre', '[12 / 12] That\'s it! You have learned the basic syntax of Links!').should('exist');
    });
  
  
  });
  
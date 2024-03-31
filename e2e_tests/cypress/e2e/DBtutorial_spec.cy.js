  const tutorial6Program = `var db = database "links";
  var items = table "todo" with (name : String) from db;
  
  mutual {
    fun showList() server {
     page
      <html>
       <body>
        <form l:action="{add(item)}" method="POST">
          <input l:name="item"/>
          <button type="submit">Add item</button>
        </form>
        <table>
         {for (item <- query {for (item <-- items) [item]})
            <tr><td>{stringToXml(item.name)}</td>
                <td><form l:action="{remove(item.name)}" method="POST">
                     <button type="submit">Done</button>
                    </form>
                </td>
            </tr>}
         </table>
        </body>
      </html>
    }
  
    fun add(name) server {
     insert items values [(name=name)];
     showList()
    }
  
    fun remove(name) server {
     delete (r <-- items) where ((name=r.name).name == name);
     showList()
    }
  
  }
  
  fun mainPage (_) {
    showList()
  }
  
  fun main() {
    addRoute("",mainPage);
    servePages()
  }
  
  main()`;


// function to erase, replace content in code mirror, and then click the compile button.
function setCodeMirrorContentAndCompile(newContent) {
    //1. Erase
    cy.get('.codemirrorhost .cm-content')
    .first()
    .click({ force: true })
    .type('{meta}a')
    .type('{backspace}');
    //2. Replace
    cy.get('.codemirrorhost .cm-content')
      .first()
      .invoke('text', newContent)
      .trigger('change', { force: true });
    //3. Compile
    cy.contains('span', 'Save and Compile').click();
    cy.wait(5000);
}

describe('Tutorial Tests', function() {
    beforeEach(function() {
      cy.loginTestUser(Cypress.env('testuser1').username, Cypress.env('testuser1').password)
        //This wait is necesarry as auth0 can take up to a second to redirect with token.
        cy.wait(1000);
    });

    it('should compile tutorial 6', function() {
      cy.visit(`${Cypress.env('trylinks-domain')}/tutorial/6`);
      cy.wait(1000);
      
      setCodeMirrorContentAndCompile(tutorial6Program);
    
      function clickDoneButtons() {
        cy.getIframeBody('.ng-star-inserted').then(($body) => {
          const $doneButtons = $body.find('button').filter((index, element) => {
            return Cypress.$(element).text().trim() === "Done";
          });
          if ($doneButtons.length) {
            cy.wrap($doneButtons.first()).click({ force: true }).then(() => {
              cy.wait(500);
              clickDoneButtons();
            });
          }
        });
      }
    
      cy.getIframeBody('.ng-star-inserted').then(($body) => {
        const $input = $body.find('input[name="lname__g147"]');
        cy.wrap($input).type('cypress was here');
        cy.wait(500);
    
        const $addButtons = $body.find('button[type="submit"]').filter((index, element) => {
          return Cypress.$(element).text() === "Add item";
        });
    
        if ($addButtons.length) {
          cy.wrap($addButtons).click({ force: true });
          cy.wait(1000);
  
          cy.getIframeBody('.ng-star-inserted').then(($bodyAgain) => {
            cy.wrap($bodyAgain).find('td').contains('cypress was here').should('exist').then(() => {
              //We click every done button to remove it from the database,
             //so that we prevent buildup of items as more cypress tests run.
              clickDoneButtons();
            });
          });
        } else {
          throw new Error('Add item button not found');
        }
      });
    });

});

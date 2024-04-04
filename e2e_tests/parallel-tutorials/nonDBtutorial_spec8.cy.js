// Constants for tutorial programs: see linkslang github examples
const tutorial1Program = `fun mainPage (_) {
    # This will show a page.
    # Exercise: add a <h1> tag into the page that says
    # "Hello World!"
        page 
        <html>
        <body>
            Hello World!
        </body>
        </html>
    }
    
    fun main () {
        addRoute("",mainPage);
        servePages()
    }
    
    main()`;

const tutorial2Program = `fun handleForm(s,i) {
    page 
      <html>
        <body>
        <p>The string was: {stringToXml(s)}</p>
        <p>The integer was: {intToXml(i)}</p>
        </body>
      </html>
  }
  
  fun mainPage (_) {
    page 
      <html>
      <body>
        <h1>Example form</h1>
        <form l:action="{handleForm(s,stringToInt(i))}">
          A string: <input l:name="s" value="foo"/>
          An integer: <input l:name="i" value="42"/>
          <button type="submit">Submit!</button>
        </form>
        </body>
      </html>
  }
  
  
  fun main () {
    addRoute("",mainPage);
    servePages()
  }
  
  main()`;

const tutorial3Program = `fun handleForm(s,i) {
    replaceNode(<div id="result">
        <p>The string was: {stringToXml(s)}</p>
        <p>The integer was: {intToXml(i)}</p>
        </div>,
        getNodeById("result"))
  }
  
  fun mainPage (_) {
    page 
      <html>
      <body>
        <h1>Example form, take 2</h1>
        <form l:onsubmit="{handleForm(s,stringToInt(i))}">
          A string: <input l:name="s" value="foo"/>
          An integer: <input l:name="i" value="42"/>
          <button type="submit">Submit!</button>
        </form>
        <div id="result" />
        </body>
      </html>
  }
  
  
  fun main () {
    addRoute("",mainPage);
    servePages()
  }
  
  main()`;

const tutorial4Program = `fun remove(item, items) {
    switch (items) {
       case []    -> []
       case x::xs -> if (item == x) xs
                     else x::remove(item, xs)
    }
  }
  
  
  fun todo(items) {
     <html>
      <body>
       <form l:onsubmit="{replaceDocument(todo(item::items))}">
         <input l:name="item"/>
         <button type="submit">Add item</button>
       </form>
       <table>
        {for (item <- items)
          <tr><td>{stringToXml(item)}</td>
              <td><form l:onsubmit="{replaceDocument(todo(remove(item,items)))}">
                   <button type="submit">Completed</button>
                  </form>
              </td>
          </tr>}
        </table>
       </body>
     </html>
  }
  
  fun mainPage(_) {
    page
     <#>{todo(["add items to todo list"])}</#>
  }
  
  fun main () {
   addRoute("",mainPage);
   servePages()
  }
  
  main()`


  const tutorial5Program = `mutual {
    fun request(s) {
      <html>
       <body>
        <h1>Please type a number</h1>
         <form l:onsubmit="{response(t)}" l:onkeyup="{replaceDocument(request(t))}">
          <input type="text" value="{s}" l:name="t"/>
          {
          if (s =~ /^[0-9]+/)
           <input type="submit"/>
          else
           <input type="submit" disabled="disabled"/>
          }
         </form>
        </body>
      </html>
    }
  
    fun response(s) client {
     var n = stringToInt(s);
  
     replaceDocument(
      <html>
       <body>
        <h1>Factorials up to {intToXml(n)}</h1>
        <table><tbody>{
         for ((i=i,f=f) <- lookupFactorials(n))
          <tr>
           <td>{intToXml(i)}</td>
           <td>{stringToXml(f)}</td>
          </tr>
        }</tbody></table>
       </body>
      </html>
     )
    }
  
    fun lookupFactorials(n) server {
     var db = database "links";
     var factorials = table "factorials" with (i : Int, f : String) from db;
  
     query {
       for (row <-- factorials)
        where (row.i <= n)
        orderby (row.i)
         [(i=row.i, f=row.f)]
      }
    }
  }
  
  fun main() {
    addRoute("", fun (_) { 
      page
        <#>{request("")}</#>
    });
    servePages()
  }
  
  main()`;

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


// Utility function to set content in CodeMirror
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
        cy.loginTestUser(Cypress.env('testuser8').username, Cypress.env('testuser8').password)
        //This wait is necesarry as auth0 can take up to a second to redirect with token.
        cy.wait(1000);
    });

    it('should compile tutorial 1', function() {
      cy.visit(`${Cypress.env('trylinks-domain')}/tutorial/1`);
        cy.wait(1000);
        
        setCodeMirrorContentAndCompile(tutorial1Program);

        cy.getIframeBody('.ng-star-inserted').then(($body) => {
            const textPresent = $body.text().includes('Hello World!');
            expect(textPresent).to.be.true;
        });
    });

    it('should compile tutorial 2', function() {
      cy.visit(`${Cypress.env('trylinks-domain')}/tutorial/2`);
        cy.wait(1000);
        
        setCodeMirrorContentAndCompile(tutorial2Program);

        cy.getIframeBody('.ng-star-inserted').then(($body) => {
            const textPresent = $body.text().includes('Example form');
            expect(textPresent).to.be.true;
            const $submitBtn = $body.find('button[type="submit"]');
            if ($submitBtn.length) {
                $submitBtn.click();
                cy.wait(1000)
                cy.getIframeBody('.ng-star-inserted').find('p').contains('The string was: foo').should('exist');
            } else {
                throw new Error('Submit button not found');
            }
        });
    });

    it('should compile tutorial 3', function() {
      cy.visit(`${Cypress.env('trylinks-domain')}/tutorial/3`);
        cy.wait(1000);
        
        setCodeMirrorContentAndCompile(tutorial3Program);

        cy.getIframeBody('.ng-star-inserted').then(($body) => {
            const textPresent = $body.text().includes('Example form');
            expect(textPresent).to.be.true;
            const $submitBtn = $body.find('button[type="submit"]');
            if ($submitBtn.length) {
                $submitBtn.click();
                cy.wait(1000)
                cy.getIframeBody('.ng-star-inserted').find('p').contains('The string was: foo').should('exist');
            } else {
                throw new Error('Submit button not found');
            }
        });
    });

    it('should compile tutorial 4', function() {
      cy.visit(`${Cypress.env('trylinks-domain')}/tutorial/4`);
        cy.wait(1000);
        
        setCodeMirrorContentAndCompile(tutorial4Program);

        cy.getIframeBody('.ng-star-inserted').then(($body) => {
            const textPresent = $body.text().includes('add items to todo list');
            expect(textPresent).to.be.true;
            const $submitBtn = $body.find('button[type="submit"]').filter((index, element) => {
                return Cypress.$(element).text().trim() === 'Completed';
            });
            cy.wait(500)
            if ($submitBtn.length) {
                $submitBtn.click();
                cy.wait(1000)
                cy.getIframeBody('.ng-star-inserted').should('not.contain', 'add items to todo list');
            } else {
                throw new Error('Submit button not found');
            }
        });
    });

      it('should compile tutorial 5', function() {
        cy.visit(`${Cypress.env('trylinks-domain')}/tutorial/5`);
        setCodeMirrorContentAndCompile(tutorial5Program);
    

        cy.getIframeBody('.ng-star-inserted').should('contain.text', 'Please type a number');
    

        cy.getIframeBody('.ng-star-inserted').find('input[type="text"]').type('2');
    

        cy.getIframeBody('.ng-star-inserted').find('input[type="submit"]:not([disabled])')
          .should('exist') 
          .click({ force: true }); 

        cy.getIframeBody('.ng-star-inserted').find('td').contains('2').should('exist');
      });

});

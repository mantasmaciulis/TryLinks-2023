module.exports.startingLinksSources = [
  `fun mainPage (_) {
    # This will show a page.
    # Exercise: add a <h1> tag into the page that says
    # "Hello World!"
      page 
        <html>
        <body>
        </body>
        </html>
    }
    
    fun main () {
      addRoute("",mainPage);
      servePages()
    }
    
    main()`,
  `fun handleForm(s,i) {
    # We want to display the values inputted.
    # Exercise: use the appropriate convertion functions to display the values.
      page 
        <html>
          <body>
          <p>The string was: {}</p>
          <p>The integer was: {}</p>
          </body>
        </html>
    }
    
    fun mainPage (_) {
      # l:action triggers when the submit button is clicked.
    # Exercise: now it is not doing anything. Try wiring it to call the handleFrom function, with the right parameters.
    # You may see some weird error messages, just read the description about it.
      page 
        <html>
        <body>
          <h1>Example form</h1>
          <form l:action="">
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
    
    main()`,
  `fun handleForm(s,i) {
    # replaceNode finds a node on the current page, and replace it with some custom content.
    # Exercise: modify the code to replace the correct code.
      replaceNode(<div id="result">
          <p>The string was: {stringToXml(s)}</p>
          <p>The integer was: {intToXml(i)}</p>
          </div>,
          getNodeById("nonexistentnode"))
    }
    
    fun mainPage (_) {
      # l:onsubmit triggers when the submit button is clicked.
      # Exercise: wire it to call the handleForm function as before.
      page 
        <html>
        <body>
          <h1>Example form, take 2</h1>
          <form l:onsubmit="">
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
    
    main()`,
  `fun remove(item, items) {
  # This should look very familiar if you know Haskell.
  # Exercie: fill out the cases to remove the correct item.
    switch (items) {
       case []    -> # Fill out base case
       case x::xs -> # Fill out recursion case
    }
  }
  
  
  fun todo(items) {
    # We are going to use "replaceDocument", which overrides the current DOM with a new page.
    # Exercise: complete the parameters for both "replaceDocument" function. Think about what they do respoectively, and what the new items should be like.
  
     <html>
      <body>
       <form l:onsubmit="{replaceDocument()}">
         <input l:name="item"/>
         <button type="submit">Add item</button>
       </form>
       <table>
        {for (item <- items)
          <tr><td>{stringToXml(item)}</td>
              <td><form l:onsubmit="{replaceDocument()}">
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
  
  main()`,
  `fun request(s) {
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

# Pay attention to the client keyword here.
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
  
# Pay attention to the server keyword here.
fun lookupFactorials(n) server {
   # Sets up the reference to the database and corresponding table.
   var db = database "links";
   var factorials = table "factorials" with (i : Int, f : String) from db;
  
   # This filters out the rows with i less than the inputted value.
    
   query {
     for (row <-- factorials)
      where (row.i <= n)
      orderby (row.i)
      # Exercise: complete the qurey function to return the appropriate rows. 
       []
   }
  }
  
fun main() {
    addRoute("", fun (_) { 
      page
        <#>{request("")}</#>
    });
    servePages()
  }
  
main()`, `
var db = database "links";
  var items = table "todo" with (name : String) from db;
  
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
   delete (r <-- items) where (r.name == name);
   showList()
  }
  
  fun mainPage (_) {
    showList()
  }
  
  fun main() {
    addRoute("",mainPage);
    servePages()
  }
  
  main()`, `
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

# Pay attention to the client keyword here.
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
  
# Pay attention to the server keyword here.
fun lookupFactorials(n) server {
  # Sets up the reference to the database and corresponding table.
  var db = database "links";
  var factorials = table "factorials" with (i : Int, f : String) from db;
  
  # This filters out the rows with i less than the inputted value.
    
  query {
    for (row <-- factorials)
      where (row.i <= n)
      orderby (row.i)
      # Exercise: complete the qurey function to return the appropriate rows. 
       []
   }
  }
  
  fun main() {
    addRoute("", fun (_) { 
      page
        <#>{request("")}</#>
    });
    servePages()
  }
  
  main()`, `
  var db = database "links";
  var items = table "todo" with (name : String) from db;
  
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
   # Exercise: add a new item into the table.
   showList()
  }
  
  fun remove(name) server {
   # Exercise: delete the item with the right name.
   showList()
  }
  
  fun mainPage (_) {
    showList()
  }
  
  fun main() {
    addRoute("",mainPage);
    servePages()
  }
  main()`
]

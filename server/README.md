# TryLinks Server

This is the TryLinks server repository, powered by [Express](https://expressjs.com/), [Socket.IO](https://socket.io/), and more.

## Usage

First clone this repository using `git clone`.

Then build the relevant node modules

~~~bash
npm install
~~~

We use [dotenv](https://github.com/motdotla/dotenv) to provide various configurations to the server, such as database connection, session encryption secret, and so on. To run TryLinks server, you will need to create a '.env' file yourself. A template of this file looks like this:

~~~
DB_CONNECTION_STRING=...
SECRET=...
TRYLINKS_CONFIG=...
PROD_DOMAIN=[...]
COMPILE_WAIT_TIME=...
~~~

After that, the server can be started by using

~~~bash
npm start
~~~
    
## Notes to Contributors

### Fork TryLinks server

If you'd like to contribute back to the core, you can [fork this repository](https://help.github.com/articles/fork-a-repo) and send us a pull request, when it is ready.

If you are new to Git or GitHub, please read [this guide](https://help.github.com/) first.

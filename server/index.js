// require deployd
var deployd = require('deployd');

// configure database etc.

// TODO: ES6 update -> watch deployd dependency on es5!
// let [type, username, login, port_dbname] = process.env.MONGODB_URI.split(':');
// let [port, db_name] = port_dbname.split('/');
// let [password, host] = login.split('@');
var uri = process.env.MONGODB_URI.split(':');
var username = uri[1];
var login = uri[2];
var port_dbname = uri[3].split('/');
var password_host = login.split('@');

var server = deployd({
  port: process.env.PORT || 5000,
  env: 'production',
  db: {
    host: password_host[1],
    port: +port_dbname[0],
    name: port_db_name[1],
    credentials: {
      username,
      password: password_host[0]
    }
  }
});

// heroku requires these settings for sockets to work
server.sockets.manager.settings.transports = ["xhr-polling"];

// start the server
server.listen();

// debug
server.on('listening', function() {
  console.log("Server is listening on port: " + process.env.PORT);
});

// Deployd requires this
server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});
// require deployd
var deployd = require('deployd');

// configure database etc. 
var [type, username, login, port_dbname] = process.env.MONGODB_URI;
var [port, db_name] = port_dbname.split('/');
var [password, host] = login.split('@');

var server = deployd({
  port: process.env.PORT || 5000,
  env: 'production',
  db: {
    host,
    port: +port,
    name: db_name,
    credentials: {
      username,
      password
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
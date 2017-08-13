// require deployd
let deployd = require('deployd');

// configure database etc. 
let [type, username, login, port_dbname] = process.env.MONGODB_URI;
let [port, db_name] = port_dbname.split('/');
let [password, host] = login.split('@');

let server = deployd({
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
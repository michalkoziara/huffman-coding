/*
  This script launches the ExpressJS server.
  It is used for serving static files contained in the 'static' folder.
 */
const express = require('express');
const path = require('path');

// Run the server
const server = express();

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  };
};

// Point to 'static' folder containing the production-ready application scripts
server.use(express.static(__dirname + '/static'));
server.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});

server.use(forceSSL());
// Start the server by listening on the defined port or pick the default one
server.listen(process.env.PORT || 8080);

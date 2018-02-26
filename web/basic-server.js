var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var httpHelpers = require('./http-helpers');
var path = require('url');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';

let routes = {
  '/': httpHelpers.handleHTML,
  '/styles.css': httpHelpers.handleCss,
  '/archives': handler.handlePost
};


var server = http.createServer(function(req, res) {
  var url = path.parse(req.url).pathname;
  console.log(req.url, req.method, url);
  var route = routes[url.pathname];


  var url = req.url;
  routes[url] ? routes[url](req, res) : console.log('Error doesn\'t exist');
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}


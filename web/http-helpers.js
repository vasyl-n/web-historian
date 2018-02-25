var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var read = require('read-file-relative').read

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.

};

exports.statusCode = 200;

exports.serveAssets = function(res, asset, callback) {
  read(asset, 'utf8', function(err, data) {
    if (err) {
      res.writeHead(404, headers)
      console.log('There was an error ', err)
    } else {
      // res.writeHead(200, headers)
      callback(data);
    }
  })
};


// As you progress, keep thinking about what helper functions you can put here!

var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var read = require('read-file-relative').read

var asset = './public/index.html';
var loading = './public/loading.html';
var cssAsset = './public/styles.css';

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.

};

exports.statusCode = 200;

 var serveAssets = function(res, asset, callback) {
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

var sendResponse = function(res, data, statusCode) {
  console.log(data, '<<< ++++++++++ is sendResponse data')
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(data)
};

exports.handleCss = function(req, res) {
  if (req.method === 'GET') {
    serveAssets(res, asset, (data) => {
      sendResponse(res, data, 200);
    });
  }
};

exports.handleHTML = function (req, res) {
  if (req.method === 'GET') {
    serveAssets(res, asset, (data) => {
      sendResponse(res, data, 200);
    });
  }
};


exports.sendResponse = sendResponse;
exports.serveAssets = serveAssets;
// As you progress, keep thinking about what helper functions you can put here!

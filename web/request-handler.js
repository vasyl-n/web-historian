var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var read = require('read-file-relative').read;
// require more modules/folders here!
var asset = './public/index.html';
var loading = './public/loading.html';
var cssAsset = './public/styles.css';

exports.handleHTML = function (req, res) {
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, asset, (data) => {
      res['Content-Type'] = 'text/html';
      res.writeHead(httpHelpers.statusCode, httpHelpers.headers);
      res.end(data);
    });
  }
  // res.end(archive.paths.list);
};

var readSitesTxt = function(req, res) {
  var newAsset = '../archives/sites.txt';
  read(newAsset, 'utf8', function(err, data) {
    console.log(data);
    httpHelpers.serveAssets(res, newAsset, (data) => {
      res['Content-Type'] = 'text/html';
      res.writeHead(httpHelpers.statusCode, httpHelpers.headers);
      res.end(data);
    });
  });
};

exports.handlePost = function (req, res) {
  req.on('data', function(data) {
    var newStr = data.toString().split('=')[1];
    readSitesTxt(req, res);
  });
};

exports.handleCss = function(req, res) {
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, asset, (data) => {
      res['Content-Type'] = 'text/css';
      res.writeHead(httpHelpers.statusCode, httpHelpers.headers);
      res.end(data);
    });
  }
};



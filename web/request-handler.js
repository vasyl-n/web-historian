var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var read = require('read-file-relative').read;
// require more modules/folders here!

var loading = './public/loading.html';

var readSitesTxt = function(req, res, newStr) {
  var newAsset = '../archives/sites.txt';
  read(newAsset, 'utf8', function(err, data) {
    console.log(data);
    console.log(data.indexOf(newStr))
    handleInputExist(res, data, newStr)
  });
};

exports.handlePost = function (req, res) {
  req.on('data', function(data) {
    var newStr = data.toString().split('=')[1];
    console.log(newStr)
    readSitesTxt(req, res, newStr)

    // if string is not in a file - serve loading html
    // if string is is a file, but archive is not loaded yet - serve loading html
    // if string is in a file and archive is loaded - serve archive
  });
};

var handleInputExist = function(res, sites, input) {
  if (sites.indexOf(input) < 0) {
    httpHelpers.serveAssets(res, loading, (data) => {
      httpHelpers.sendResponse(res, data, 200);
    })
  }
};

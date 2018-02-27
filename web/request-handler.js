var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var read = require('read-file-relative').read;
// require more modules/folders here!

var loading = './public/loading.html';
var newAsset = '../archives/sites.txt';

var readSitesTxt = function(req, res, newStr) {
  read(newAsset, 'utf8', function(err, data) {
    handleInputExist(res, data, newStr);
  });
};

exports.handlePost = function (req, res) {
  req.on('data', function(data) {
    var newStr = data.toString().split('=')[1];
    readSitesTxt(req, res, newStr);
  });
};

var handleInputExist = function(res, sites, input) {
  var newFilePath = `../archives/sites/${input}`;
  // Checks if sites.txt contains input string
  if (sites.indexOf(input) < 0) {
    httpHelpers.serveAssets(res, loading, (data) => {
      httpHelpers.sendResponse(res, data, 200);
    });
    writeSitesTxt(input)
  }

  // Checks if html files exist
  read(newFilePath, 'utf8', (err, data) => {
    // Serve loading HTML
    if (err) {
      httpHelpers.serveAssets(res, loading, (data) => {
        httpHelpers.sendResponse(res, data, 404);
      });
    } else {
      httpHelpers.serveAssets(res, newFilePath, (data) => {
        httpHelpers.sendResponse(res, data, 200);
      });
    }
  })
};

var writeSitesTxt = function(newSiteName) {
  var newPath = path.resolve(__dirname, `../archives/sites.txt`)
  read(newAsset, 'utf8', function(err, data) {
    data += '\n' + newSiteName;
    fs.writeFile(newPath, data, (err) => {
      if (err) {
        console.log(' There was an error ', err)
      }
    })
  });
};



var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var read = require('read-file-relative').read;
var htmlFetcher = require('../workers/htmlfetcher')
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
var newPath = path.resolve(__dirname, `../archives/sites.txt`)

var readListOfUrls = function(callback) {
  fs.readFile(paths.list, 'utf8', (err, data) => {
    if(err) console.log(err);
    // console.log(data, "<<<<<<< HERE in archive helpers")
    callback(data)
  })
};

var isUrlInList = function(url, callback) {
  readListOfUrls( (data, url) => {
    if ( data.indexOf(url) > -1 ) {
      callback(true);
    }
    callback(false);
  })
};

var addUrlToList = function(url, callback) {
  isUrlInList(url, (isInList) => {
    if ( !isInList ) {
      readListOfUrls( (data) => {
        fs.writeFile( paths.list, data, (err) => {
          if ( err ) console.log(err);
        });
      });
    }
  });
};

var isUrlArchived = function(url, callback) {
  fs.readFile(`${paths.archivedSites}${url}`, 'utf8', (err, data) => {
    if ( err ) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

var downloadUrls = function(urls) {
  readListOfUrls( (data) => {
    var arrayOfSites = data.split('\n');
    arrayOfSites.forEach((site) => {
      htmlFetcher(site);
    });
  });
};


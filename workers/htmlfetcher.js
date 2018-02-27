// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
// var http = require('http')
var http = require('follow-redirects').http;
var schedule = require('node-schedule');
var fs = require('fs');
var Promise = require('bluebird')
var archive = require('../helpers/archive-helpers');


setInterval(() => {
  archive.helpers.readListOfUrls((data) => {
    data = data.split('\n');
    data.forEach((el) => {
      if (el !== '') {
        archive.helpers.isUrlArchived(el, (isArchived) => {
          if (!isArchived) {
            http.get(`http://${el}`, (res) => {
              res.setEncoding('utf8');
              var body = '';
              res.on('data', function (chunk) {
                body += chunk;
              });
              res.on('end', function () {
                archive.helpers.writeContent(el, body)
              });
            })
          }
        })
      }
    })
  })
}, 3000)

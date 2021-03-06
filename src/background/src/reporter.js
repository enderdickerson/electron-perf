let mongoose = require('mongoose');
const Result = require('../../app/models/resultmodel');
// const log = require('electron-log');
// console.log = log.info;

let os = require('os');
let URL = require('url').URL;

module.exports.log = function(time, url) {
  let Report = mongoose.model('Report');

  const parsedUrl = new URL(url);

  let name = parsedUrl.pathname.substr(1);

  let query = Report.findOne({'name': name});

  return query.exec(function(err, report) {
    if (err) {
      console.error('error: ', err);
      return;
    }

    if (report === null) {
      report = new Report();
      report.name = name;
    }

    let result = new Result();

    result.elapsed = time;
    result.executedBy = os.hostname();
    result.queryString = parsedUrl.search && parsedUrl.search.length > 1 ? parsedUrl.search.substr(1) : '';
    result.version = '';
    result.host = parsedUrl.hostname;

    report.results.push(result);

    report.save(function(err) {
      if (err) {
        console.error('error: ', err);
      }
    });
  });
};

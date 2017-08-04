import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

import * as q from 'Q';

@Injectable()

export class ResultStore {
  constructor(private db: ConnectionService) {}

  get() {
    const deferred = q.defer();

    const Report = this.db.mongoose.model('Report');

    const query = Report.find({}).sort('name');

    query.exec((err, results) => {
      // return results;
      deferred.resolve(results);
    });

    return deferred.promise;
  }

  getId(id: string) {
    const deferred = q.defer();

    const Report = this.db.mongoose.model('Report');

    const query = Report.findOne({_id: id});

    query.exec((err, results) => {
      deferred.resolve(results);
    });

    return deferred.promise;
  }

  // Does not work with embedded document array see issue: https://github.com/Automattic/mongoose/issues/5480
  toggleIgnoreEntry(originalReport, run) {
    const deferred = q.defer();

    const Report = this.db.mongoose.model('Report');

    Report.findOne({_id: originalReport.id}, (err, report) => {
      if (err) {
        deferred.reject(err);
        return;
      }

      const previousResults = report.results.map((item) => {
        if (item.id === run) {
          item.ignore = !item.ignore;
        }
        return item;
      });

      report.results = [];

      report.save((err2) => {
        if (err2) {
          console.log('error: ', err2);
          deferred.reject(err2);
          return;
        }

        report.results = previousResults;

        report.save((err3) => {
          if (err3) {
            deferred.reject(err3);
            return;
          }

          deferred.resolve();
        });
      });
    });

    return deferred.promise;
  }
}

import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

import * as q from 'Q';

@Injectable()

export class ResultStore {
  constructor(private db: ConnectionService) {}

  get() {
    const Report = this.db.mongoose.model('Report');

    const query = Report.find({});

    return query.exec((err, results) => {
      return results;
    });
  }

  // Does not work see issue: https://github.com/Automattic/mongoose/issues/5480
  ignoreEntry(originalReport, run) {
    // const deferred = q.defer();

    // const Report = this.db.mongoose.model('Report');
    //
    // Report.findOne({_id: originalReport.id}, (err, report) => {
    //   if (err) {
    //     deferred.reject(err);
    //     return;
    //   }
    //
    //   const result = report.results.id(run);
    //
    //   result.ignore = true;
    //
    //   result.save((err2) => {
    //     if (err2) {
    //       console.log('error: ', err2);
    //       deferred.reject(err2);
    //       return;
    //     }
    //
    //     deferred.resolve();
    //   });
    // });

    // return deferred.promise;

    return q.when();
  }
}

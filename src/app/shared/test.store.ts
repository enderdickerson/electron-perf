import { Injectable } from '@angular/core';

declare global {
  interface Window {
    require: any;
    config: any;
  }
}

// const mongoose = window.require('mongoose');
// const remote = window.require('electron').remote;

import * as q from 'Q';

import { ConnectionService } from './connection.service';

@Injectable()

export class TestStore {
  constructor(private db: ConnectionService) {}

  get() {
    const Test = this.db.mongoose.model('Test');

    const query = Test.find({});

    return query.exec((err, tests) => {
      console.log('tests retrieved: ', tests);
      return tests;
    });
  }

  save(testData) {
    const Test = this.db.mongoose.model('Test');

    const query = Test.findOne({'url': testData.url});

    const deferred = q.defer();

    query.exec((err, test) => {
      if (err) {
        console.log('error: ', err);
        return;
      }

      if (test === null) {
        test = new Test();
      }

      test.url = testData.url;
      test.isAngular = testData.isAngular;
      test.runs = testData.runs;

      test.save((err2) => {
        if (err2) {
          console.log('error: ', err2);
        }

        deferred.resolve();
      });
    });

    return deferred.promise;
  }
}

import { Injectable } from '@angular/core';

declare global {
  interface Window {
    require: any;
    config: any;
  }
}

const mongoose = window.require('mongoose');
const remote = window.require('electron').remote;

import * as q from 'Q';

@Injectable()

export class TestStore {
  constructor() {
  }

  get() {
    const deferred = q.defer();

    const path = window.require('path');

    const appPath = remote.app.getAppPath();

    const config = remote.require(path.join(appPath, 'config'));

    window.require(path.join(appPath, 'src/app/models/testmodel'));

    mongoose.connect(config.connectionString, config.options);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', () => {
      const Test = mongoose.model('Test');

      console.log('Connected to MongoDb');
      return Test.find({}, (err, results) => {
        db.close();
        console.log('Tests: ', results);
        deferred.resolve(results);
      });
    });

    return deferred.promise;
    //
    // return Report.find({}).then((err, results) => {
    //   return results;
    // }).then(function() {
    //   connection.close();
    // });
    // return q.when();
  }
}

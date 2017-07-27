import { Injectable } from '@angular/core';
import { WindowService } from '../../shared/window.service';

declare global {
  interface Window {
    require: any;
    config: any;
  }
}

// let electron = window.require('electron');


const mongoose = window.require('mongoose');
const remote = window.require('electron').remote;

// const ReportSchema = require('../../models/reportmodel');
// const ResultSchema = require('../../models/reportmodel');

// let mongoose = require('electron').remote.require('mongoose');

// import Report from '../../../models/reportmodel';
// let config = require('../../../config');
// import { connectionString, options } from '../../../../config';

// const config = require('../../../../config');

import * as q from 'Q';

@Injectable()

export class ResultService {
  constructor() {
  }

  get() {
    // let mongoose = this.winService.nativeWindow.mongoose;

    // let connection: any = mongoose.createConnection(connectionString, options)
    const deferred = q.defer();

    const path = window.require('path');

    const appPath = remote.app.getAppPath();

    const config = remote.require(path.join(appPath, 'config'));

    window.require(path.join(appPath, 'src/app/models/reportmodel'));

    mongoose.connect(config.connectionString(), config.options());

    mongoose.model('Report');

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', () => {
      const Report = mongoose.model('Report');

      console.log('Connected to MongoDb');
      return Report.find({}, (err, results) => {
        db.close();
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

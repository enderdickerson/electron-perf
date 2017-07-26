import { Injectable } from '@angular/core';
import { WindowService } from '../../shared/window.service';
// import * as mongoose from 'mongoose';

declare global {
  interface Window {
    require: any;
  }
}

let electron = window.require('electron');

let mongoose = electron.remote.require('mongoose');
let Report = electron.remote.Report;

// let mongoose = require('electron').remote.require('mongoose');

// import Report from '../../../models/reportmodel';
// let config = require('../../../config');
import { connectionString, options } from '../../../../config';

import * as q from 'Q';

@Injectable()

export class ResultService {
  constructor(private winService: WindowService) {
  }

  get() {
    // let mongoose = this.winService.nativeWindow.mongoose;

    // let connection: any = mongoose.createConnection(connectionString, options)
    var deferred = q.defer();

    mongoose.connect('mongodb://localhost:27017/test');

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection erro:'));

    db.once('open', () => {
      console.log('Connected to MongoDb')
      return Report.find({}).then((err, results) => {
        return results;
      }).then(function() {
        db.close();
        deferred.resolve();
      });
    })

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

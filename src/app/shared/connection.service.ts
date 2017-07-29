import { Injectable } from '@angular/core';

declare global {
  interface Window {
    require: any;
    config: any;
  }
}

const mongoose = window.require('mongoose');
const remote = window.require('electron').remote;
const q = window.require('Q');

@Injectable()

export class ConnectionService {
  db;
  mongoose;

  private static installModels() {
    const path = window.require('path');
    const appPath = remote.app.getAppPath();

    window.require(path.join(appPath, 'src/app/models/testmodel'));
    window.require(path.join(appPath, 'src/app/models/reportmodel'));
  }

  constructor() {
    this.mongoose = mongoose;
    this.mongoose.Promise = q.Promise;
    this.connect();
    ConnectionService.installModels();
  }

  private closeConnection() {
    this.db.close();
    this.db = null;
  }

  private connect() {
    const path = window.require('path');
    const appPath = remote.app.getAppPath();
    const config = remote.require(path.join(appPath, 'config'));

    this.mongoose.connect(config.connectionString, config.options);

    this.db = this.mongoose.connection;

    this.db.on('error', console.error.bind(console, 'connection error:'));

    this.db.once('open', () => {
      console.log('Database connected');
    });
  }
}

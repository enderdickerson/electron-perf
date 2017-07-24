import { Injectable } from '@angular/core';
import * as path from 'path';
import * as url from 'url';
import * as childProcess from 'child_process';

@Injectable()

export class TestService {
  constructor() {
  }

  runTest(url) {
    if (!url) {
      throw new Error('No url specified for testing.');
    }

    let fork = childProcess.fork(__dirname);
    fork.on('message', () => {
      
    })
  }
}
